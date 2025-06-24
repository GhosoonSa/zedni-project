import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Card, CardMedia, CardContent, Typography, Zoom } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/student/course/${course.id}`, { state: { course } });
  };

  return (
    <Zoom in timeout={500}>
      <Card
        sx={{
          backgroundColor: "#fff8f0",
          boxShadow: 4,
          borderRadius: "18px",
          overflow: "hidden",
          transition: "all 0.3s ease",
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          },
        }}
        onClick={handleClick}
      >
        <CardMedia
          component="img"
          height="180"
          image={course.image}
          alt={course.title}
          sx={{
            objectFit: "cover",
            borderBottom: "2px solid #d2a679",
          }}
        />
        <CardContent sx={{ textAlign: "center", background: "#fff8f0" }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              color: "#5a3e1b",
              fontSize: "1.1rem",
            }}
          >
            {course.title}
          </Typography>
        </CardContent>
      </Card>
    </Zoom>
  );
};

export default CourseCard;
