import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import SubAdminJoiningRequestsTab from "../Components/SubAdminJoiningRequestsTab";
import SubAdminPeopleTab from "../Components/SubAdminPeopleTab";
import SubAdminResultsTab from "../Components/SubAdminResultsTab";
import SubAdminBooksTab from "../Components/SubAdminBooksTab";
import SubAdminHeader from "../Components/SubAdminHeader";
import SubAdminPosterTab from "../Components/SubAdminPosterTab";
import { Paper, useMediaQuery, useTheme } from "@mui/material";

const SubAdminCourseTabs = () => {
  const [key, setKey] = useState("ClassesPlanTab");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <>
      <SubAdminHeader />
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
            <Tab eventKey="ClassesPlanTab" title="الإعلانات ">
              <div style={{ flex: 1, overflow: "auto" }}>
                <SubAdminPosterTab />
              </div>
            </Tab>
            <Tab eventKey="SubjectsTab" title="طلبات الانضمام">
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
            <Tab eventKey="JoiningRequestsTab" title="النتائج ">
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
