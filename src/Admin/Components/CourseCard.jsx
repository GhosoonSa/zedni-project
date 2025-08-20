import React, { useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Box,
} from "@mui/material";
const CARD_WIDTH = 260;

const CourseCard = ({ course, onClick }) => {
  // const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  // const [selectedCourse, setSelectedCourse] = useState(null);
  // const [showOnlyLevels, setShowOnlyLevels] = useState(false);
  // const [anchorEl, setAnchorEl] = useState(null);

  // const handleCourseClick = (course, event) => {
  //   console.log("clicked");
  //   setSelectedCourse(course);
  //   setShowOnlyLevels(course.status === "السابقة");
  //   setAnchorEl(event.currentTarget);
  //   setIsOptionsOpen(true);
  // };
  return (
    <Box sx={{ width: CARD_WIDTH, flex: "0 0 auto" }}>
      <Card
        sx={{
          mx: 1,
          my: 1,
          backgroundColor: "#fffaf5",
          borderRadius: 2,
          boxShadow: 3,
          overflow: "hidden",
          transition: "transform .3s",
          "&:hover": { transform: "translateY(-6px)" },
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <CardMedia
          component="img"
          height="140"
          image={course.image}
          alt={course.title}
          sx={{
            objectFit: "cover",
            transition: "transform .5s",
            "&:hover": { transform: "scale(1.05)" },
          }}
        />
        <CardContent sx={{ textAlign: "center", pb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {course.title}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseCard;
