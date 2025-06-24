import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TeacherClassesPlanTab from "../Components/TeacherClassesPlanTab";
import TeacherPeopleTab from "../Components/TeacherPeopleTab";
import TeacherResultsTab from "../Components/TeacherResultsTab";
import TeacherSubjectsTab from "../Components/TeacherSubjectsTab";
import TeacherHeader from "../Components/TeacherHeader";
import { Paper, useMediaQuery, useTheme, Box } from "@mui/material";

const TeacherCourseTabs = () => {
  const [key, setKey] = useState("ClassesPlanTab");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

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
        <h2
          style={{
            marginBottom: "30px",
            fontSize: isSmallScreen ? "1.5rem" : "2rem",
            textAlign: "center",
            color: "#7b3f00",
          }}
        >
          course name
        </h2>
        <Paper
          // key={Course.id}
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
