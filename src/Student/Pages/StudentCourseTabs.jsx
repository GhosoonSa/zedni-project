import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import StudentHeader from "../Components/StudentHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import StudentClassesPlanTab from "../Components/StudentClassesPlanTab";
import StudentResultsTab from "../Components/StudentResultsTab";
import StudentSubjectsTab from "../Components/StudentSubjectsTab";
import { Paper, useMediaQuery, useTheme, Box } from "@mui/material";

const StudentCourseTabs = () => {
  const [key, setKey] = useState("ClassesPlanTab");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const { id } = useParams();
  const location = useLocation();

  const course = location.state?.course;
  const level = course.levelName;
  const courseId = course.id;
  const [showedLevel, setShowedLevel] = useState("");

  useEffect(() => {
    if (level) {
      switch (level) {
        case "level1":
          setShowedLevel("المستوى 1");
          break;
        case "level2":
          setShowedLevel("المستوى 2");
          break;
        case "level3":
          setShowedLevel("المستوى 3");
          break;
        case "level4":
          setShowedLevel("المستوى 4");
          break;
        case "level5":
          setShowedLevel("المستوى 5");
          break;
        case "level6":
          setShowedLevel("المستوى 6");
          break;
        case "level7":
          setShowedLevel("المستوى 7");
          break;
      }
    }
  }, []);

  return (
    <>
      <StudentHeader />
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
              "linear-gradient(135deg, rgba(255, 253, 248, 0.5) 0%, rgba(252, 250, 245, 0.5) 100%)",
            backdropFilter: "blur(1px)",
          },
        }}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "visible",
          height: "500px",
          width: isSmallScreen ? "95%" : isMediumScreen ? "80%" : "1200px",
          margin: isSmallScreen ? "20px auto" : "100px auto",
          padding: isSmallScreen ? "0 10px" : "0",
        }}
      >
        <h2
          style={{
            marginBottom: "30px",
            fontSize: isSmallScreen ? "1.5rem" : "2rem",
            textAlign: isSmallScreen ? "center" : "right",
            color: "#7b3f00",
          }}
        >
          {course?.courseName}
          {level && ` –  ${showedLevel}`}
        </h2>
        <Paper
          key={course?.id}
          elevation={3}
          sx={{
            marginTop: isSmallScreen ? 2 : 4,
            marginBottom: isSmallScreen ? 2 : 4,
            marginLeft: isSmallScreen ? 0 : 4,
            padding: isSmallScreen ? 2 : 3,
            backgroundColor: "#fffaf5",
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
                <StudentClassesPlanTab courseId={id} level={level} />
              </div>
            </Tab>
            <Tab eventKey="SubjectsTab" title="المواد">
              <div style={{ flex: 1, overflow: "auto" }}>
                <StudentSubjectsTab courseId={id} />
              </div>
            </Tab>
            <Tab eventKey="ResultsTab" title="النتائج">
              <div style={{ flex: 1, overflow: "auto" }}>
                <StudentResultsTab courseId={courseId} level={level} />
              </div>
            </Tab>
          </Tabs>
        </Paper>
      </div>
    </>
  );
};

export default StudentCourseTabs;
