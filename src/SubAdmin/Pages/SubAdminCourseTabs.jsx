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

const SubAdminCourseTabs = () => {
  const [key, setKey] = useState("ClassesPlanTab");
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
      </div>
    </>
  );
};

export default SubAdminCourseTabs;
