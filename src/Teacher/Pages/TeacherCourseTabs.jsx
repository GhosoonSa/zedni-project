import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TeacherClassesPlanTab from "../Components/TeacherClassesPlanTab";
import TeacherPeopleTab from "../Components/TeacherPeopleTab";
import TeacherResultsTab from "../Components/TeacherResultsTab";
import TeacherSubjectsTab from "../Components/TeacherSubjectsTab";
import TeacherHeader from "../Components/TeacherHeader";

const TeacherCourseTabs = () => {
  const [key, setKey] = useState("ClassesPlanTab");
  return (
    <>
      <TeacherHeader />
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
          marginLeft: "525px",
          marginTop: "20px",
          direction: "rtl",
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
      </div>
    </>
  );
};

export default TeacherCourseTabs;
