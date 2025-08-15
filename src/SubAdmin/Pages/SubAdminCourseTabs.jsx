import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import SubAdminPeopleTab from "../Components/SubAdminPeopleTab";
import SubAdminResultsTab from "../Components/SubAdminResultsTab";
import SubAdminBooksTab from "../Components/SubAdminBooksTab";
import SubAdminHeader from "../Components/SubAdminHeader";
import SubAdminJoiningRequestsTab from "../Components/SubAdminJoiningRequestsTab";
import { Paper, useMediaQuery, useTheme, Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const SubAdminCourseTabs = () => {
  const location = useLocation();
  const [key, setKey] = useState("SubjectsTab");
  const courseTitle = location.state.courseTitle || null;
  const courseLevel = location.state.level || null;
  const courseId = location.state.courseId;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [showedLevel, setShowedLevel] = useState("");

  useEffect(() => {
    console.log("from tabs ", courseLevel);
    if (courseLevel) {
      switch (courseLevel) {
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
          {courseLevel && (
            <Typography
              variant="h5"
              sx={{
                fontSize: isSmallScreen ? "1.2rem" : "1.5rem",
                color: "#7b3f00",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
            >
              {showedLevel}
            </Typography>
          )}
          <Typography
            variant="h3"
            sx={{
              fontSize: isSmallScreen ? "1.8rem" : "2.4rem",
              color: "#5a3e1b",
              fontWeight: "bold",
            }}
          >
            {courseTitle}
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
            backdropFilter: "blur(2px)",
          }}
        >
          <Tabs
            id="courseTab"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 items-center"
            justify
          >
            <Tab eventKey="SubjectsTab" title="الحضور">
              <div style={{ flex: 1, overflow: "auto" }}>
                <SubAdminJoiningRequestsTab
                  courseId={courseId}
                  level={courseLevel}
                />
              </div>
            </Tab>
            <Tab eventKey="PeopleTab" title="الكتب">
              <div style={{ flex: 1, overflow: "auto" }}>
                <SubAdminBooksTab courseId={courseId} level={courseLevel} />
              </div>
            </Tab>
            <Tab eventKey="ResultsTab" title="الطلاب">
              <div style={{ flex: 1, overflow: "auto" }}>
                <SubAdminPeopleTab />
              </div>
            </Tab>
            <Tab eventKey="JoiningRequestsTab" title="النتائج">
              <div style={{ flex: 1, overflow: "auto" }}>
                <SubAdminResultsTab courseId={courseId} level={courseLevel} />
              </div>
            </Tab>
          </Tabs>
        </Paper>
      </div>
    </>
  );
};

export default SubAdminCourseTabs;
