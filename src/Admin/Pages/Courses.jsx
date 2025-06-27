import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import AddCourse from "../Components/AddCourse";
import CourseOptionsModal from "../Components/CourseOptionsModal";
import backgroundTabs from "/backgroundTabs.jpg";

const CARD_WIDTH = 260;

const Courses = () => {
  const navigate = useNavigate();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    { id: 1, title: "دورة الفقه للمبتدئين", image: "/course.png", status: "الجديدة" },
    { id: 3, title: "دورة التفسير الموضوعي", image: "/course.png", status: "الحالية" },
    { id: 5, title: "دورة العقيدة الإسلامية", image: "/course.png", status: "السابقة" },
    { id: 6, title: "دورة أحكام الأسرة", image: "/course.png", status: "السابقة" },
  ];

  const sliderCfg = {
    dots: true,
    infinite: false,
    rtl: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 900,  settings: { slidesToShow: 2 } },
      { breakpoint: 600,  settings: { slidesToShow: 1 } },
    ],
  };

  const handleCourseClick = (course) => {
    if (course.status === "السابقة") {
      navigate(
        `/CourseTabs?courseId=${course.id}&courseName=${encodeURIComponent(course.title)}`
      );
    } else {
      setSelectedCourse(course);
      setIsOptionsOpen(true);
    }
  };

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
      {statuses.map((st) => {
        const list = courses.filter((c) => c.status === st);

        const CardBox = ({ course }) => (
          <Box sx={{ width: CARD_WIDTH }}>
            <Card
              sx={{
                mx: 1,
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

        return (
          <Paper
            key={st}
            elevation={3}
            sx={{
              m: 4,
              p: 3,
              direction: "rtl",
              backgroundColor: "#fffaf5",
              width: list.length < 4 ? "50vw" : "100%",
              maxWidth: "100%",
              transition: "width 0.3s ease",
            }}
          >
            <Typography variant="h5" sx={{ mb: 4, fontWeight: "bold" }}>
              {st}
            </Typography>

            {list.length <= 4 ? (
              <Box sx={{ display: "flex", gap: 2 }}>
                {list.map((course) => (
                  <CardBox key={course.id} course={course} />
                ))}
              </Box>
            ) : (
              <Slider {...sliderCfg}>
                {list.map((course) => (
                  <CardBox key={course.id} course={course} />
                ))}
              </Slider>
            )}
          </Paper>
        );
      })}

      {}
      {selectedCourse && (
        <CourseOptionsModal
          open={isOptionsOpen}
          onClose={() => setIsOptionsOpen(false)}
          course={selectedCourse}
        />
      )}
    </>
  );
};

export default Courses;
