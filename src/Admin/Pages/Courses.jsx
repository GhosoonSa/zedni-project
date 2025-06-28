import React, { useState } from "react";
import AdminHeader from "../Components/AdminHeader";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Box,
} from "@mui/material";
import AddCourse from "../Components/AddCourse";
import CourseOptionsModal from "../Components/CourseOptionsModal";
import backgroundTabs from "/backgroundTabs.jpg";

const CARD_WIDTH = 260;

const Courses = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showOnlyLevels, setShowOnlyLevels] = useState(false);

  const courses = [
    { id: 1, title: "دورة الفقه", image: "/course.png", status: "الجديدة" },
    { id: 2, title: "دورة التفسير الموضوعي", image: "/course.png", status: "الحالية" },
    { id: 3, title: "دورة التجويد", image: "/course.png", status: "السابقة" },
    { id: 4, title: "دورة أحكام الأسرة", image: "/course.png", status: "السابقة" },
    { id: 5, title: "دورة الفقه للمبتدئين", image: "/course.png", status: "السابقة" },
    { id: 6, title: "دورة العقيدة الإسلامية", image: "/course.png", status: "السابقة" },
    { id: 7, title: "دورة العقيدة الإسلامية", image: "/course.png", status: "السابقة" },
    { id: 8, title: "دورة العقيدة الإسلامية", image: "/course.png", status: "السابقة" },

  ];

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setShowOnlyLevels(course.status === "السابقة");
    setIsOptionsOpen(true);
  };

  const closeModal = () => {
    setIsOptionsOpen(false);
    setShowOnlyLevels(false);
  };

  const CardBox = ({ course }) => (
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
        onClick={() => handleCourseClick(course)}
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

  const statuses = ["الجديدة", "الحالية", "السابقة"];

  return (
    <>
      <AdminHeader />

      {}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: `url('${backgroundTabs}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          zIndex: -1,
        }}
      />

      {}
      <Box sx={{ mt: 12, textAlign: "right", pr: 6 }}>
        <Button
          variant="outlined"
          onClick={() => setIsAddOpen(true)}
          sx={{
            backgroundColor: "#E7BC91",
            color: "black",
            border: "#DAE2ED",
            "&:hover": { borderColor: "#8B5E34" },
          }}
          size="large"
        >
          إضافة دورة
        </Button>
        <AddCourse isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
      </Box>

      {}
      {statuses.map((status) => {
        const list = courses.filter((c) => c.status === status);

        return (
          <Paper
            key={status}
            elevation={3}
            sx={{
              my: 4,
              py: 3,
              px: 4,
              direction: "rtl",
              backgroundColor: "#fffaf5",
              width: list.length <= 2 ? "75%" : "auto",
              mr: 4,                               
              ml: list.length <= 2 ? "auto" : 4,   
              boxSizing: "border-box",
            }}
          >
            <Typography variant="h5" sx={{ mb: 4, fontWeight: "bold" }}>
              {status}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "flex-start",
              }}
            >
              {list.map((course) => (
                <CardBox key={course.id} course={course} />
              ))}
            </Box>
          </Paper>
        );
      })}

      {}
      {selectedCourse && (
        <CourseOptionsModal
          open={isOptionsOpen}
          onClose={closeModal}
          course={selectedCourse}
          showOnlyLevels={showOnlyLevels}
        />
      )}
    </>
  );
};

export default Courses;
