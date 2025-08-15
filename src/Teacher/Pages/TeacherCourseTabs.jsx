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
import backgroundTabs from "/backgroundTabs.jpg";

const TeacherCourseTabs = () => {
  const [key, setKey] = useState("ClassesPlanTab");
  const [showedLevel, setShowedLevel] = useState("");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const location = useLocation();
  const courseID = location.state?.courseId || null;
  const level = location.state?.level || null;
  const courseName = location.state?.courseName || "اسم الدورة";

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
      <TeacherHeader />
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
          height: isSmallScreen ? "auto" : "500px",
          width: isSmallScreen ? "95%" : isMediumScreen ? "90%" : "1200px",
          margin: isSmallScreen ? "20px auto" : "100px auto",
          padding: isSmallScreen ? "0 10px" : "0",
        }}
      >
        <Box
          sx={{
            textAlign: "right",
            mb: 4,
            px: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: "row-reverse",
            gap: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: isSmallScreen ? "1.2rem" : "1.5rem",
              color: "#7b3f00",
              fontWeight: "bold",
              marginLeft: "10px",
            }}
          >
            {level ? ` ${showedLevel}` : ""}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontSize: isSmallScreen ? "1.8rem" : "2.4rem",
              color: "#5a3e1b",
              fontWeight: "bold",
            }}
          >
            {courseName}
          </Typography>
        </Box>

        <Paper
          elevation={3}
          sx={{
            margin: isSmallScreen ? 2 : 4,
            padding: isSmallScreen ? 2 : 3,
            backgroundColor: "rgba(255, 253, 250, 0.95)",
            border: "1px solid #e0d6c2",
            borderRadius: "12px",
            marginBottom: "30px",
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
                <TeacherSubjectsTab level={level} courseId={courseID} />
              </div>
            </Tab>
            <Tab eventKey="PeopleTab" title="الطلاب">
              <div style={{ flex: 1, overflow: "auto" }}>
                <TeacherPeopleTab />
              </div>
            </Tab>
            <Tab eventKey="ResultsTab" title="النتائج">
              <div style={{ flex: 1, overflow: "auto" }}>
                <TeacherResultsTab courseID={courseID} level={level} />
              </div>
            </Tab>
          </Tabs>
        </Paper>
      </div>
    </>
  );
};

export default TeacherCourseTabs;
