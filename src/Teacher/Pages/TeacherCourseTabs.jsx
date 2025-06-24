import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TeacherClassesPlanTab from "../Components/TeacherClassesPlanTab";
import TeacherPeopleTab from "../Components/TeacherPeopleTab";
import TeacherResultsTab from "../Components/TeacherResultsTab";
import TeacherSubjectsTab from "../Components/TeacherSubjectsTab";
import TeacherHeader from "../Components/TeacherHeader";
import { Paper, useMediaQuery, useTheme, Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const TeacherCourseTabs = () => {
  const [key, setKey] = useState("ClassesPlanTab");
  const [courseTitle, setCourseTitle] = useState("");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const location = useLocation();

  useEffect(() => {
    if (location.state?.course) {
      setCourseTitle(location.state.course.title);
    }
  }, [location.state]);

  return (
    <>
      <TeacherHeader />
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
            backgroundColor: "rgba(248, 240, 227, 0.85)", 
            background: "linear-gradient(135deg, rgba(248, 240, 227, 0.9) 0%, rgba(232, 221, 203, 0.9) 100%)",
          },
        }}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          height: isSmallScreen ? "auto" : "500px",
          width: isSmallScreen ? "95%" : isMediumScreen ? "90%" : "1200px",
          margin: isSmallScreen ? "20px auto" : "100px auto",
          padding: isSmallScreen ? "0 10px" : "0",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            mb: 4,
            fontSize: isSmallScreen ? "1.8rem" : "2.4rem",
            textAlign: "center",
            color: "#5a3e1b",
            fontWeight: "bold",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
            animation: "fadeIn 1s ease-in-out",
            "@keyframes fadeIn": {
              "0%": { opacity: 0, transform: "translateY(-20px)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          {courseTitle || "الدورة التعليمية"}
        </Typography>
        <Paper
          elevation={3}
          sx={{
            margin: isSmallScreen ? 2 : 4,
            padding: isSmallScreen ? 2 : 3,
            backgroundColor: "rgba(255, 253, 250, 0.95)",
            border: "1px solid #e0d6c2",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(122, 81, 22, 0.15)",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 10px 25px rgba(122, 81, 22, 0.2)",
            },
          }}
        >
          <Tabs
            id="courseTab"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 items-center"
            justify
          >
            <Tab eventKey="ClassesPlanTab" title="الخطة الدرسية">
              <div style={{ flex: 1, overflow: "auto" }}>
                <TeacherClassesPlanTab />
              </div>
            </Tab>
            <Tab eventKey="SubjectsTab" title="المواد">
              <div style={{ flex: 1, overflow: "auto" }}>
                <TeacherSubjectsTab />
              </div>
            </Tab>
            <Tab eventKey="PeopleTab" title="الطلاب">
              <div style={{ flex: 1, overflow: "auto" }}>
                <TeacherPeopleTab />
              </div>
            </Tab>
            <Tab eventKey="ResultsTab" title="النتائج">
              <div style={{ flex: 1, overflow: "auto" }}>
                <TeacherResultsTab />
              </div>
            </Tab>
          </Tabs>
        </Paper>
      </div>
    </>
  );
};

export default TeacherCourseTabs;