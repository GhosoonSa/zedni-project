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
import backgroundTabs from "/tabtab.jpg";

const CourseTabs = () => {
  const [key, setKey] = useState("ClassesPlanTab");
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
      </div>
    </>
  );
};

export default CourseTabs;
