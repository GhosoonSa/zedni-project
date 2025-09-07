import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Zoom,
  Box,
  Button,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import axios from "axios";

const ANIMATION_DURATION = 400;
const HOVER_SCALE = 1.05;
const CLICK_SCALE = 1.07;
const IMG_HOVER_SCALE = 1.1;
const IMG_CLICK_SCALE = 1.15;

const CourseCard = ({ course, isNew = false }) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackOpenError, setSnackOpenError] = useState(false);
  const [snackPosition, setSnackPosition] = useState({ top: 0 });
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  const handleCardClick = () => {
    if (clicked || isNew) return;
    setClicked(true);
    setTimeout(() => {
      navigate(`/student/course/${course.id}`, { state: { course } });
    }, ANIMATION_DURATION);
  };

  const handleJoinClick = async (e, courseID) => {
    e.stopPropagation();
    try {
      console.log("token: " + authToken);
      const response = await axios.get(
        `http://localhost:8000/api/student/createJoiningRequest/${courseID}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ` + authToken,
            ContentType: "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        if (cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect();
          setSnackPosition({
            top: rect.height + 32,
          });
        }
        setSnackOpen(true);
      }
    } catch (error) {
      console.error("Error sending user id:", error);

      if (error.response && error.response.status === 409) {
        if (cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect();
          setSnackPosition({
            top: rect.height + 32,
          });
        }
        setSnackOpenError(true);
      } else {
        console.error("Other error occurred:", error);
      }
    }
  };

  const handleSnackClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackOpen(false);
  };

  const handleSnackCloseError = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackOpenError(false);
  };
  const cardScale = clicked ? CLICK_SCALE : hovered ? HOVER_SCALE : 1;
  const imgScale = clicked ? IMG_CLICK_SCALE : hovered ? IMG_HOVER_SCALE : 1;

  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      <Zoom in timeout={500} style={{ transitionDelay: course.delay || "0ms" }}>
        <Card
          ref={cardRef}
          onClick={handleCardClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          sx={{
            backgroundColor: "#fdf9f2",
            boxShadow: 4,
            borderRadius: 3,
            overflow: "hidden",
            cursor: isNew ? "default" : "pointer",
            border: "2px solid transparent",
            transform: `scale(${cardScale})`,
            transition: `transform ${ANIMATION_DURATION}ms ease`,
            "&:hover": {
              boxShadow: "0 12px 26px rgba(0,0,0,0.10)",
              borderColor: "#e8d4b8",
            },
          }}
        >
          <Box sx={{ position: "relative", overflow: "hidden", height: 180 }}>
            <CardMedia
              component="img"
              height="180"
              image={course.courseImage}
              alt={course.couresName}
              sx={{
                objectFit: "cover",
                borderBottom: "2px solid #e8d4b8",
                transform: `scale(${imgScale})`,
                transition: `transform ${ANIMATION_DURATION}ms ease`,
              }}
            />
          </Box>

          <CardContent
            sx={{
              textAlign: "center",
              position: "relative",
              zIndex: 2,
              backgroundColor: "rgba(253, 249, 242, 0.92)",
            }}
          >
            <Stack spacing={1} alignItems="center">
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "#6a4a2f", fontSize: "1.05rem" }}
              >
                {course.courseName}
              </Typography>

              {isNew && (
                <Button
                  size="small"
                  variant="contained"
                  onClick={(e) => handleJoinClick(e, course.id)}
                  sx={{
                    px: 2.5,
                    backgroundColor: "#f9e6cd",
                    color: "#6b4e21",
                    fontWeight: "bold",
                    borderRadius: 2,
                    textTransform: "none",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.06)",
                    "&:hover": { backgroundColor: "#f1dcb2" },
                  }}
                >
                  طلب الانضمام
                </Button>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Zoom>

      <Snackbar
        open={snackOpen}
        onClose={handleSnackClose}
        autoHideDuration={2500}
        sx={{
          position: "absolute",
          top: `${snackPosition.top}px`,
          right: "16px",
          transform: "none",
          zIndex: 1300,
        }}
      >
        <Alert
          icon={<CheckCircleIcon fontSize="small" />}
          severity="success"
          variant="filled"
          sx={{
            backgroundColor: "#f9e8d7",
            color: "#5e4627",
            fontWeight: "bold",
            borderRadius: 3,
            boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
            px: 3,
            py: 1.5,
          }}
        >
          تم إرسال طلب الانضمام إلى «{course.courseName}»
        </Alert>
      </Snackbar>

      <Snackbar
        open={snackOpenError}
        onClose={handleSnackCloseError}
        autoHideDuration={2500}
        sx={{
          position: "absolute",
          top: `${snackPosition.top}px`,
          right: "16px",
          transform: "none",
          zIndex: 1300,
        }}
      >
        <Alert
          icon={<WarningRoundedIcon fontSize="small" />}
          severity="warning"
          variant="filled"
          sx={{
            backgroundColor: "#f9e8d7",
            color: "#5e4627",
            fontWeight: "bold",
            borderRadius: 3,
            boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
            px: 3,
            py: 1.5,
          }}
        >
          تم إرسال طلب الانضمام إلى «{course.courseName}»مسبقاً
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CourseCard;
