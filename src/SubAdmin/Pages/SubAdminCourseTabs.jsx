import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import SubAdminJoiningRequestsTab from "../Components/SubAdminJoiningRequestsTab";
import SubAdminPeopleTab from "../Components/SubAdminPeopleTab";
import SubAdminResultsTab from "../Components/SubAdminResultsTab";
import SubAdminBooksTab from "../Components/SubAdminBooksTab";
import SubAdminHeader from "../Components/SubAdminHeader";
import SubAdminPosterTab from "../Components/SubAdminPosterTab";
import { Paper, useMediaQuery, useTheme, Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const SubAdminCourseTabs = () => {
  const [key, setKey] = useState("ClassesPlanTab");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseLevel, setCourseLevel] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setCourseTitle(location.state.courseTitle || "الدورة");
      setCourseLevel(location.state.level || null);
    }
  }, [location.state]);

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
            background: "linear-gradient(to bottom, rgba(255, 253, 250, 0.8), rgba(248, 244, 233, 0.9))"
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
        <Box sx={{
          textAlign: "right",
          mb: 4,
          px: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          flexDirection: "row-reverse",
          gap: 2
        }}>
          {courseLevel && (
            <Typography
              variant="h5"
              sx={{
                fontSize: isSmallScreen ? "1.2rem" : "1.5rem",
                color: "#7b3f00",
                fontWeight: "bold",
                marginLeft: "10px"
              }}
            >
              {`المستوى ${courseLevel}`}
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
            backdropFilter: "blur(2px)"
          }}
        >
          <Tabs
            id="courseTab"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 items-center"
            justify
          >
            <Tab eventKey="ClassesPlanTab" title="الإعلانات">
              <div style={{ flex: 1, overflow: "auto" }}>
                <SubAdminPosterTab />
              </div>
            </Tab>
            <Tab eventKey="SubjectsTab" title="الحضور">
              <div style={{ flex: 1, overflow: "auto" }}>
                <SubAdminJoiningRequestsTab />
              </div>
            </Tab>
            <Tab eventKey="PeopleTab" title="الكتب">
              <div style={{ flex: 1, overflow: "auto" }}>
                <SubAdminBooksTab />
              </div>
            </Tab>
            <Tab eventKey="ResultsTab" title="الطلاب">
              <div style={{ flex: 1, overflow: "auto" }}>
                <SubAdminPeopleTab />
              </div>
            </Tab>
            <Tab eventKey="JoiningRequestsTab" title="النتائج">
              <div style={{ flex: 1, overflow: "auto" }}>
                <SubAdminResultsTab />
              </div>
            </Tab>
          </Tabs>
        </Paper>
      </div>
    </>
  );
};

export default SubAdminCourseTabs;