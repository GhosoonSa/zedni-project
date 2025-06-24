import React, { useState } from "react";
import StudentHeader from "../Components/StudentHeader";
import CourseCard from "../Components/CourseCard";
import {
  Box,
  Typography,
  Grid,
  Fade,
  Tabs,
  Tab,
  CssBaseline,
  Stack,
  Paper
} from "@mui/material";

const CoursesS = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const enrolledCourses = [
    { id: 1, title: "دورة الفقه للمبتدئين", image: "/course.png", delay: "100ms" },
  ];

  const newCourses = [
    { id: 5, title: "دورة التفسير الموضوعي", image: "/course.png", delay: "200ms" },
    { id: 6, title: "دورة التفسير الموضوعي", image: "/course.png", delay: "300ms" },
  ];

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const renderCourses = (courses) => {
    return (
      <Box sx={{ width: '100%', direction: 'rtl' }}>
        <Grid container spacing={3} sx={{ width: '100%', margin: 0 }}>
          {courses.map((course, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3} 
              sx={{ 
                display: 'flex',
                justifyContent: 'flex-end',
                paddingRight: '0 !important',
                paddingLeft: { xs: '0 !important', sm: '24px !important' },
              }}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <>
      <CssBaseline />
      <StudentHeader />
      
      <Stack 
        direction="column" 
        sx={{ 
          minHeight: '100vh',
          position: 'relative',
          direction: 'rtl'
        }}
      >
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: "url('/backgroundTabs.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: -1,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: "linear-gradient(135deg, rgba(255, 253, 248, 0.92) 0%, rgba(252, 250, 245, 0.92) 100%)",
            backdropFilter: "blur(2px)",
          },
        }} />
        
        <Paper 
          elevation={4}
          sx={{
            flexGrow: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 4,
            m: { xs: 2, sm: 3, md: 4 },
            p: { xs: 2, sm: 3, md: 4 },
            width: { xs: 'calc(100% - 32px)', sm: 'calc(100% - 48px)', md: 'calc(100% - 64px)' },
            maxWidth: 'xl',
            alignSelf: 'center',
            mt: { xs: '80px', md: '100px' },
            mb: 4,
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 8px 32px rgba(122, 81, 22, 0.2)',
            }
          }}
        >
          <Fade in timeout={1000}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Tabs
                value={tabIndex}
                onChange={handleChange}
                variant="fullWidth"
                textColor="primary"
                indicatorColor="primary"
                sx={{
                  mb: 3,
                  borderBottom: "1px solid #e0a96d",
                  "& .MuiTab-root": {
                    fontWeight: "bold",
                    color: "#5a3e1b",
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#7b3f00',
                    }
                  },
                  direction: 'rtl'
                }}
              >
                <Tab label="دوراتي الحالية" />
                <Tab label="الدورات الجديدة" />
              </Tabs>

              {tabIndex === 0 && (
                <Fade in timeout={800}>
                  <div>
                    <Typography variant="h6" sx={{
                      mb: 3,
                      color: "#7b3f00",
                      fontWeight: "bold",
                      textAlign: "right",
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(-5px)'
                      }
                    }}>
                      دوراتي الحالية
                    </Typography>
                    {renderCourses(enrolledCourses)}
                  </div>
                </Fade>
              )}

              {tabIndex === 1 && (
                <Fade in timeout={800}>
                  <div>
                    <Typography variant="h6" sx={{
                      mb: 3,
                      color: "#7b3f00",
                      fontWeight: "bold",
                      textAlign: "right",
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(-5px)'
                      }
                    }}>
                      الدورات الجديدة
                    </Typography>
                    {renderCourses(newCourses)}
                  </div>
                </Fade>
              )}
            </Box>
          </Fade>
        </Paper>
      </Stack>
    </>
  );
};

export default CoursesS;