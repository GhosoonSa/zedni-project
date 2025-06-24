import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ClassesPlanTab from "../Components/ClassesPlanTab";
import JoiningRequestsTab from "../Components/JoiningRequestsTab";
import PeopleTab from "../Components/PeopleTab";
import ResultsTab from "../Components/ResultsTab";
import SubjectsTab from "../Components/SubjectsTab";
import AdminHeader from "../Components/AdminHeader";
import backgroundTabs from "/backgroundTabs.jpg";
import { Paper, useMediaQuery, useTheme } from "@mui/material";

const CourseTabs = () => {
  const [key, setKey] = useState("ClassesPlanTab");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <>
      <AdminHeader />
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
        // className="bg-cover h-screen "
      >
        <h2
          style={{
            marginBottom: "30px",
            fontSize: isSmallScreen ? "1.5rem" : "2rem",
            textAlign: isSmallScreen ? "center" : "right",
          }}
        >
          اسم الدورة
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
                <ClassesPlanTab />
              </div>
            </Tab>
            <Tab eventKey="SubjectsTab" title="المواد">
              <div style={{ flex: 1, overflow: "auto" }}>
                <SubjectsTab />
              </div>
            </Tab>
            <Tab eventKey="PeopleTab" title="الطلاب">
              <div style={{ flex: 1, overflow: "auto" }}>
                <PeopleTab />
              </div>
            </Tab>
            <Tab eventKey="ResultsTab" title="النتائج">
              <div style={{ flex: 1, overflow: "auto" }}>
                <ResultsTab />
              </div>
            </Tab>
            <Tab eventKey="JoiningRequestsTab" title="طلبات الانضمام">
              <div style={{ flex: 1, overflow: "auto" }}>
                <JoiningRequestsTab />
              </div>
            </Tab>
          </Tabs>
        </Paper>
      </div>
    </>
  );
};

export default CourseTabs;
