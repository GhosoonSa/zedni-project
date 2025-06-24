import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import StudentHeader from "../Components/StudentHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import StudentClassesPlanTab from "../Components/StudentClassesPlanTab";
import StudentResultsTab from "../Components/StudentResultsTab";
import StudentSubjectsTab from "../Components/StudentSubjectsTab";

const StudentCourseTabs = () => {
  const [key, setKey] = useState("ClassesPlanTab");

  const { id } = useParams(); // نحصل على معرف الدورة من URL
  const location = useLocation(); // نحصل على البيانات الممرّرة

  const course = location.state?.course;

  return (
    <>
      <StudentHeader />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          height: "500px",
          width: "700px",
          marginLeft: "525px",
          marginTop: "100px",
          direction: "ltr",
        }}
      >
        <h2 style={{ marginBottom: "30px", textAlign: "center", color: "#7b3f00" }}>
          {course?.title || `Course ID: ${id}`}
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
              <StudentClassesPlanTab courseId={id} />
            </div>
          </Tab>
          <Tab eventKey="SubjectsTab" title="المواد">
            <div style={{ flex: 1, overflow: "auto" }}>
              <StudentSubjectsTab courseId={id} />
            </div>
          </Tab>
          <Tab eventKey="ResultsTab" title="النتائج">
            <div style={{ flex: 1, overflow: "auto" }}>
              <StudentResultsTab courseId={id} />
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default StudentCourseTabs;
 