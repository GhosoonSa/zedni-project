import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import {
  Paper,
  useMediaQuery,
  useTheme,
  Box,
  Typography,
} from "@mui/material";

const CourseTabs = () => {
  const location = useLocation();

  const level = location.state?.level || null;
  const courseName = location.state?.courseName || "اسم الدورة";

  const [key, setKey] = useState("ClassesPlanTab");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    if (tabParam === "joining") {
      setKey("JoiningRequestsTab");
    }
  }, []);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <>
      <AdminHeader />

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
        <Typography
          variant={isSmallScreen ? "h5" : "h4"}
          sx={{
            mb: 3,
            textAlign: isSmallScreen ? "center" : "right",
            fontWeight: "bold",
          }}
        >
          {courseName}
          {level && ` – المستوى ${level}`}
        </Typography>

        <Paper
          elevation={3}
          sx={{
            mt: isSmallScreen ? 2 : 4,
            mb: isSmallScreen ? 2 : 4,
            ml: isSmallScreen ? 0 : 4,
            p: isSmallScreen ? 2 : 3,
            backgroundColor: "#fffaf5",
            minHeight: "auto",
            overflow: "visible"
          }}
        >
          <Tabs
            id="courseTab"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
            justify
          >
            <Tab eventKey="ClassesPlanTab" title="الخطة الدرسية">
              <ClassesPlanTab level={level} />
            </Tab>
            <Tab eventKey="SubjectsTab" title="المواد">
              <SubjectsTab level={level} />
            </Tab>
            <Tab eventKey="PeopleTab" title="الطلاب">
              <PeopleTab />
            </Tab>
            <Tab eventKey="ResultsTab" title="النتائج">
              <ResultsTab />
            </Tab>
          </Tabs>
        </Paper>
      </div>
    </>
  );
};

export default CourseTabs;