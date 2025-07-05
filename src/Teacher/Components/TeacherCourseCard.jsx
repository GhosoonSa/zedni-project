import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Zoom,
  Box,
} from "@mui/material";

const ANIMATION_DURATION = 400;     
const HOVER_SCALE = 1.05;    
const CLICK_SCALE = 1.07;    
const IMG_HOVER_SCALE = 1.10;    
const IMG_CLICK_SCALE = 1.15;    

const TeacherCourseCard = ({ course, onClick }) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (clicked) return;                    
    setClicked(true);
    setTimeout(() => {
      onClick();
      setClicked(false);
    }, ANIMATION_DURATION);
  };

  const cardScale = clicked
    ? CLICK_SCALE
    : hovered
    ? HOVER_SCALE
    : 1;

  const imgScale = clicked
    ? IMG_CLICK_SCALE
    : hovered
    ? IMG_HOVER_SCALE
    : 1;

  return (
    <Zoom in timeout={500} style={{ transitionDelay: course.delay || "0ms" }}>
      <Card
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          backgroundColor: "#f8f4e9",
          boxShadow: 4,
          borderRadius: "18px",
          overflow: "hidden",
          cursor: "pointer",
          border: "2px solid transparent",
          position: "relative",
          transform: `scale(${cardScale})`,
          transition: `transform ${ANIMATION_DURATION}ms ease`,
          "&:hover": {
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            borderColor: "#d2a679",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.2))",
            zIndex: 1,
            pointerEvents: "none",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            height: "180px",
          }}
        >
          <CardMedia
            component="img"
            height="180"
            image={course.image || "/course.png"}
            alt={course.title}
            sx={{
              objectFit: "cover",
              borderBottom: "2px solid #d2a679",
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
            backgroundColor: "rgba(248, 244, 233, 0.8)",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              color: "#5a3e1b",
              fontSize: "1.1rem",
              mb: 1,
              transition: "all 0.3s ease",
              "&:hover": { color: "#7b3f00" },
            }}
          >
            {course.title}
          </Typography>
        </CardContent>
      </Card>
    </Zoom>
  );
};

export default TeacherCourseCard;