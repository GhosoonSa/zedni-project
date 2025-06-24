import React from "react";
import { Card, CardMedia, CardContent, Typography, Zoom, Chip, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TeacherCourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/teacher/course/${course.id}`, { state: { course } });
  };

  return (
    <Zoom in timeout={500} style={{ transitionDelay: course.delay || "0ms" }}>
      <Card
        sx={{
          backgroundColor: "#f8f4e9",
          boxShadow: 4,
          borderRadius: "18px",
          overflow: "hidden",
          transition: "all 0.3s ease",
          cursor: "pointer",
          border: "2px solid transparent",
          position: "relative",
          "&:hover": {
            transform: "scale(1.03)",
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
            background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.2))",
            zIndex: 1,
          },
        }}
        onClick={handleClick}
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
              transition: "transform 0.5s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
        </Box>
        <CardContent sx={{ 
          textAlign: "center", 
          position: "relative",
          zIndex: 2,
          backgroundColor: "rgba(248, 244, 233, 0.8)",
        }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              color: "#5a3e1b",
              fontSize: "1.1rem",
              mb: 1,
              transition: "all 0.3s ease",
              "&:hover": {
                color: "#7b3f00",
              },
            }}
          >
            {course.title}
          </Typography>
          
          {}
        </CardContent>
      </Card>
    </Zoom>
  );
};

export default TeacherCourseCard;