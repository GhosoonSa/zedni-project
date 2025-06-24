import React, { useState } from "react";
import StudentHeader from "../Components/StudentHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import StudentClassesPlanTab from "../Components/StudentClassesPlanTab";
import StudentResultsTab from "../Components/StudentResultsTab";
import StudentSubjectsTab from "../Components/StudentSubjectsTab";
import { Paper, useMediaQuery, useTheme } from "@mui/material";

const StudentCourseTabs = () => {
  const [key, setKey] = useState("ClassesPlanTab");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <>
      <StudentHeader />
      <div
        style={{
          // backgroundImage: `url(${backgroundTabs})`,
          // backgroundSize: "cover",
          // backgroundPosition: "center",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          height: isSmallScreen ? "auto" : "500px",
          width: isSmallScreen ? "95%" : isMediumScreen ? "90%" : "1300px",
          margin: isSmallScreen ? "20px auto" : "100px auto",
          padding: isSmallScreen ? "0 10px" : "0",
        }}
      >
        <h2
          style={{
            marginBottom: "30px",
            fontSize: isSmallScreen ? "1.5rem" : "2rem",
            textAlign: isSmallScreen ? "center" : "right",
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
                <StudentClassesPlanTab />
              </div>
            </Tab>
            <Tab eventKey="SubjectsTab" title="المواد">
              <div style={{ flex: 1, overflow: "auto" }}>
                <StudentSubjectsTab />
              </div>
            </Tab>

            <Tab eventKey="ResultsTab" title="النتائج">
              <div style={{ flex: 1, overflow: "auto" }}>
                <StudentResultsTab />
              </div>
            </Tab>
          </Tabs>
        </Paper>
      </div>
    </>
  );
};

export default StudentCourseTabs;
