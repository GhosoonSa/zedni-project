import React, { useState, useEffect } from "react";
import StudentHeader from "../Components/StudentHeader";
import CourseCard from "../Components/CourseCard";
import AdsSection from "../Components/AdsSection";
import {
  Box,
  Typography,
  Grid,
  Fade,
  Tabs,
  Tab,
  CssBaseline,
  Stack,
  Paper,
} from "@mui/material";
import axios from "axios";

const CoursesS = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const authToken = localStorage.getItem("authToken");
  const [ads, setAds] = useState([]);
  const [newCourses, setNewCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

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

  useEffect(() => {
    const fetchNewCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/student/getStudentNewCourses",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ` + authToken,
              ContentType: "application/json",
            },
          }
        );
        setNewCourses(response.data.courses);
        console.log(response.data);
      } catch (error) {
        console.error("Error posting Ad info:", error);
      }
    };
    fetchNewCourses();
  }, [authToken]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/student/getStudentEnrolledCourses",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ` + authToken,
              ContentType: "application/json",
            },
          }
        );
        setEnrolledCourses(response.data.courses);
        console.log(response.data);
      } catch (error) {
        console.error("Error posting Ad info:", error);
      }
    };
    fetchEnrolledCourses();
  }, [authToken]);

  const handleChange = (_, newValue) => setTabIndex(newValue);

  const renderCourses = (courses, isNew = false) => (
    <Box sx={{ width: "100%", direction: "rtl", mt: 4 }}>
      <Grid container spacing={3} sx={{ width: "100%", m: 0 }}>
        {courses.map((course, idx) => (
          <Grid
            item
            key={idx}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              pr: "0 !important",
              pl: { xs: "0 !important", sm: "24px !important" },
            }}
          >
            <CourseCard course={course} isNew={isNew} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <>
      <CssBaseline />
      <StudentHeader />

      <Stack
        direction="column"
        sx={{ minHeight: "100vh", position: "relative", direction: "rtl" }}
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
            p: { xs: 3, sm: 4, md: 5 },
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
            "&:hover": { boxShadow: "0 8px 32px rgba(122, 81, 22, 0.2)" },
          }}
        >
          <Fade in timeout={1000}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ mb: 6 }}>
                <AdsSection ads={ads} />
              </Box>

              <Box
                sx={{
                  backgroundColor: "rgba(255, 248, 235, 0.5)",
                  borderRadius: 3,
                  p: 3,
                  border: "1px solid #f0e6d2",
                }}
              >
                <Tabs
                  value={tabIndex}
                  onChange={handleChange}
                  variant="fullWidth"
                  textColor="primary"
                  indicatorColor="primary"
                  sx={{
                    mb: 4,
                    borderBottom: "1px solid #e0a96d",
                    "& .MuiTab-root": {
                      fontWeight: "bold",
                      color: "#5a3e1b",
                      transition: "all 0.3s ease",
                      "&:hover": { color: "#7b3f00" },
                    },
                    direction: "rtl",
                  }}
                >
                  <Tab label="دوراتي الحالية" />
                  <Tab label="الدورات الجديدة" />
                </Tabs>

                {tabIndex === 0 && (
                  <Fade in timeout={800}>
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 4,
                          color: "#7b3f00",
                          fontWeight: "bold",
                          textAlign: "right",
                        }}
                      >
                        دوراتي الحالية
                      </Typography>
                      {renderCourses(enrolledCourses)}
                      {console.log(
                        "courses s " + renderCourses(enrolledCourses)
                      )}
                    </Box>
                  </Fade>
                )}

                {tabIndex === 1 && (
                  <Fade in timeout={800}>
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 4,
                          color: "#7b3f00",
                          fontWeight: "bold",
                          textAlign: "right",
                        }}
                      >
                        الدورات الجديدة
                      </Typography>
                      {renderCourses(newCourses, true)}
                    </Box>
                  </Fade>
                )}
              </Box>
            </Box>
          </Fade>
        </Paper>
      </Stack>
    </>
  );
};

export default CoursesS;
