import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import SubAdminHeader from "../Components/SubAdminHeader";
import SubAdminLevelsModal from "../Components/SubAdminLevelsModal";
import AdsSection from "../Components/AdsSection";

const CoursesSA = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openLevelsModal, setOpenLevelsModal] = useState(false);

  const currentCourses = [
    { id: 1, title: "دورة الفقه للمبتدئين", image: "/course.png" },
  ];

  const newCourses = [
    { id: 3, title: "دورة التفسير الموضوعي", image: "/course.png" },
  ];

  const handleCourseClick = (course, isCurrent) => {
    if (isCurrent) {
      setSelectedCourse(course);
      setOpenLevelsModal(true);
    } else {
      navigate("/SubAdminCourseTabs", {
        state: {
          courseTitle: course.title,
          level: null,
        },
      });
    }
  };

  const handleLevelSelect = (level) => {
    setOpenLevelsModal(false);
    navigate("/SubAdminCourseTabs", {
      state: {
        courseTitle: selectedCourse.title,
        level: level,
      },
    });
  };

  return (
    <>
      <SubAdminHeader />

      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: "url('/backgroundTabs.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          zIndex: -1,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, rgba(255, 253, 250, 0.8), rgba(248, 244, 233, 0.9))",
          },
        }}
      />

      <Box
        sx={{
          mt: 12,
          px: { xs: 2, sm: 4, md: 6, lg: 10 },
          direction: "rtl",
          position: "relative",
          zIndex: 1,
        }}
      >
        <AdsSection />

        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 6,
            backgroundColor: "rgba(255, 250, 245, 0.95)",
            border: "1px solid #e0d6c2",
            backdropFilter: "blur(2px)",
            width: "75%",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              color: "#7b3f00",
              fontWeight: "bold",
            }}
          >
            الدورات الحالية
          </Typography>
          <Grid container spacing={3}>
            {currentCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Card
                  onClick={() => handleCourseClick(course, true)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 5,
                    },
                    transition: "all 0.3s ease",
                    boxShadow: 3,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={course.image}
                    alt={course.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="h6" align="center">
                      {course.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            p: 3,
            backgroundColor: "rgba(255, 250, 245, 0.95)",
            border: "1px solid #e0d6c2",
            backdropFilter: "blur(2px)",
            marginBottom: "30px",
            width: "75%",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              color: "#7b3f00",
              fontWeight: "bold",
            }}
          >
            الدورات الجديدة
          </Typography>
          <Grid container spacing={3}>
            {newCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Card
                  onClick={() => handleCourseClick(course, false)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 5,
                    },
                    transition: "all 0.3s ease",
                    boxShadow: 3,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={course.image}
                    alt={course.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="h6" align="center">
                      {course.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>

      <SubAdminLevelsModal
        open={openLevelsModal}
        onClose={() => setOpenLevelsModal(false)}
        course={selectedCourse}
        onLevelSelect={handleLevelSelect}
      />
    </>
  );
};

export default CoursesSA;
