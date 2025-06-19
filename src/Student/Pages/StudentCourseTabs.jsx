import React, { useState } from "react";
import StudentHeader from "../Components/StudentHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import StudentClassesPlanTab from "../Components/StudentClassesPlanTab";
import StudentResultsTab from "../Components/StudentResultsTab";
import StudentSubjectsTab from "../Components/StudentSubjectsTab";

const StudentCourseTabs = () => {
  const [key, setKey] = useState("ClassesPlanTab");
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
          height: "500px",
          width: "700px",
          marginLeft: "100px",
          marginTop: "20px",
        }}
      >
        <h2
          style={{
            marginBottom: "30px",
          }}
        >
          course name
        </h2>
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
      </div>
    </>
  );
};

export default StudentCourseTabs;
