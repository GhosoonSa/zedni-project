import React, { useState, useEffect } from "react";
import TeacherHeader from "../Components/TeacherHeader";
import TeacherCourseCard from "../Components/TeacherCourseCard";
import TeacherLevelsModal from "../Components/TeacherLevelsModal";
import {
  Box,
  Typography,
  Grid,
  Fade,
  CssBaseline,
  Stack,
  Paper,
  CardMedia,
} from "@mui/material";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CoursesT = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openLevelsModal, setOpenLevelsModal] = useState(false);
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    console.log("Received token: ", authToken);
  }, []);

  const currentCourses = [
    {
      id: 1,
      title: "دورة الفقه للمبتدئين",
      image: "/course.png",
      delay: "100ms",
    },
    {
      id: 2,
      title: "دورة التجويد المتقدم",
      image: "/course.png",
      delay: "200ms",
    },
    {
      id: 3,
      title: "أصول الفقه",
      image: "/course.png",
      delay: "300ms",
    },
  ];

  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/getAllAnnouncements",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ` + authToken,
              ContentType: "application/json",
            },
          }
        );
        setAds(response.data.announcements);
        console.log(response.data.announcements);
      } catch (error) {
        console.error("Error posting Ad info:", error);
      }
    };
    fetchAds();
  }, [authToken]);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setOpenLevelsModal(true);
  };

  const handleLevelSelect = (level) => {
    setOpenLevelsModal(false);
    navigate(`/teacher/course/${selectedCourse.id}`, {
      state: {
        course: selectedCourse,
        level: level,
      },
    });
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const renderCourses = (courses) => {
    return (
      <Box sx={{ width: "100%", direction: "rtl" }}>
        {courses.length > 3 ? (
          <Slider {...sliderSettings}>
            {courses.map((course, index) => (
              <Box key={index} sx={{ px: 2 }}>
                <TeacherCourseCard
                  course={course}
                  onClick={() => handleCourseClick(course)}
                />
              </Box>
            ))}
          </Slider>
        ) : (
          <Grid container spacing={3} sx={{ width: "100%", margin: 0 }}>
            {courses.map((course, index) => (
              <Grid
                item
                key={index}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingRight: "0 !important",
                  paddingLeft: { xs: "0 !important", sm: "24px !important" },
                }}
              >
                <TeacherCourseCard
                  course={course}
                  onClick={() => handleCourseClick(course)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    );
  };

  return (
    <>
      <CssBaseline />
      <TeacherHeader />

      <Stack
        direction="column"
        sx={{
          minHeight: "100vh",
          position: "relative",
          direction: "rtl",
        }}
      >
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
                "linear-gradient(135deg, rgba(255, 253, 248, 0.92) 0%, rgba(252, 250, 245, 0.92) 100%)",
              backdropFilter: "blur(2px)",
            },
          }}
        />

        <Paper
          elevation={4}
          sx={{
            flexGrow: 1,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: 4,
            m: { xs: 2, sm: 3, md: 4 },
            p: { xs: 2, sm: 3, md: 4 },
            width: {
              xs: "calc(100% - 32px)",
              sm: "calc(100% - 48px)",
              md: "calc(100% - 64px)",
            },
            maxWidth: "xl",
            alignSelf: "center",
            mt: { xs: "80px", md: "100px" },
            mb: 4,
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 8px 32px rgba(122, 81, 22, 0.2)",
            },
          }}
        >
          <Fade in timeout={1000}>
            <Box
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <Box
                sx={{
                  mb: 6,
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: "#f9f5f0",
                  border: "1px solid #E7BC91",
                  boxShadow: "0 4px 12px rgba(122, 81, 22, 0.1)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    color: "#7b3f00",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  الإعلانات
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    overflowX: "auto",
                    gap: 3,
                    py: 2,
                    "&::-webkit-scrollbar": {
                      height: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#E7BC91",
                      borderRadius: "4px",
                    },
                  }}
                >
                  {ads.map((ad) => (
                    <Box
                      key={ad.id}
                      sx={{
                        minWidth: 360,
                        borderRadius: 3,
                        overflow: "hidden",
                        boxShadow: 3,
                        border: "2px solid #E7BC91",
                        backgroundColor: "#fffaf5",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 6px 16px rgba(122, 81, 22, 0.2)",
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="160"
                        image={ad.image}
                        alt="إعلان"
                        sx={{
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                      {ad.description && (
                        <Box sx={{ p: 3, textAlign: "center" }}>
                          <Typography variant="body1" sx={{ color: "#555" }}>
                            {ad.description}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>

              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  color: "#7b3f00",
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                الدورات الحالية
              </Typography>
              {renderCourses(currentCourses)}
            </Box>
          </Fade>
        </Paper>

        {selectedCourse && (
          <TeacherLevelsModal
            open={openLevelsModal}
            onClose={() => setOpenLevelsModal(false)}
            course={selectedCourse}
            onLevelSelect={handleLevelSelect}
          />
        )}
      </Stack>
    </>
  );
};

export default CoursesT;
