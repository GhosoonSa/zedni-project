import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, Container } from "react-bootstrap";
import axios from "axios";

const Person = ({ isOpen, onClose, person, token, sender, refreshData }) => {
  if (!isOpen) return null;

  const [info, setInfo] = useState([]);
  const [courses, setCourses] = useState([]);
  const [coursesInfo, setCoursesInfo] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const fetchPersonInfo = async () => {
    try {
      let personId = null;
      let url = null;
      if (person.role === "student" && sender === "admin") {
        personId = person.studentID;
        url = "http://localhost:8000/api/admin/getCoursesForStudent";
      } else if (person.role === "student" && sender === "subadmin") {
        personId = person.studentID;
        url = "http://localhost:8000/api/subadmin/getCoursesForStudent";
      } else if (person.role === "teacher" && sender === "admin") {
        personId = person.teacherID;
        url = "http://localhost:8000/api/admin/getCoursesForTeacher";
      } else if (person.role === "teacher" && sender === "subadmin") {
        personId = person.teacherID;
        url = "http://localhost:8000/api/subadmin/getCoursesForTeacher";
      }
      const response = await axios.get(`${url}/${personId}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ` + token,
          ContentType: "application/json",
        },
      });
      setInfo(response.data.data);
      setCourses(response.data.courses);
    } catch (error) {
      console.error("fetch info error", error);
    }
  };

  useEffect(() => {
    fetchPersonInfo();
  }, [token]);

  const handleCourseCardClick = async (courseId, level) => {
    try {
      let personId = null;
      let url = null;
      if (person.role === "student" && sender === "admin") {
        personId = person.studentID;
        url = "http://localhost:8000/api/admin/getCourseDetailForStudent";
      } else if (person.role === "student" && sender === "subadmin") {
        personId = person.studentID;
        url = "http://localhost:8000/api/subadmin/getCourseDetailForStudent";
      } else if (person.role === "teacher") {
        personId = person.teacherID;
        return;
      }
      const response = await axios.get(
        `${url}/${personId}/${courseId}/${level}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ` + token,
            ContentType: "application/json",
          },
        }
      );
      setCoursesInfo(response.data.data);
    } catch (error) {
      console.error("fetch courses info error ", error);
    }
  };

  const handleDeleteAccount = async (id) => {
    try {
      let url = null;
      if (person.role === "teacher" && sender === "admin") {
        url = "http://localhost:8000/api/admin/deleteTeacherAccount";
      } else if (person.role === "student" && sender === "admin") {
        url = "http://localhost:8000/api/admin/deleteStudentAccount";
      } else {
        alert("الحذف من صلاحيات المدير فقط!");
        return;
      }
      const response = await axios.delete(`${url}/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ` + token,
          ContentType: "application/json",
        },
      });
      if (response.status === 200) {
        refreshData();
        onClose();
      }
    } catch (error) {
      console.error("delete error ", error);
    }
  };

  return (
    <>
      <Modal
        show={isOpen}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
        style={{ direction: "rtl" }}
        fullscreen="sm-down"
      >
        <Modal.Header
          className="justify-content-start"
          style={{ backgroundColor: "#FFEDD8" }}
        >
          <Modal.Title className="flex-grow-1 text-right">
            المعلومات الشخصية
          </Modal.Title>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Close"
            style={{ marginLeft: 0 }}
          />
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <h4> {info.firstAndLastName}</h4>
            <p> {info.email}</p>
          </div>
          <div
            className="row"
            style={{
              textAlign: "center",
            }}
          >
            <div
              className="col-lg-3"
              style={{ width: "50%" }}
              xs={12}
              md={6}
              lg={5}
            >
              <p>اسم الأب: {info.fatherName}</p>
              <p>عنوان السكن: {info.address}</p>
              <p>مجازة: {info.mojazeh ? "نعم" : "لا"}</p>
            </div>
            <div
              className="col-lg-3"
              style={{ width: "50%" }}
              xs={12}
              md={6}
              lg={5}
            >
              <p>رقم الموبايل: {info.phoneNumber}</p>
              <p>تاريخ الميلاد: {info.birthDate}</p>
              <p>الدراسة/العمل: {info.studyOrCareer}</p>
            </div>
          </div>

          <h5 className="mb-4 text-center">الدورات</h5>
          <Row>
            {courses.map((course) => (
              <Col
                key={course.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-4"
              >
                <Card
                  className="h-100 shadow-md border-0"
                  onClick={() => {
                    handleCourseCardClick(course.id, course.levelName);
                  }}
                  onMouseEnter={() => setIsHovered(course.id)}
                  onMouseLeave={() => setIsHovered(null)}
                  style={{
                    height: "100%",
                    boxShadow:
                      isHovered === course.id
                        ? "0 10px 20px rgba(0,0,0,0.3)"
                        : "0 4px 8px rgba(0,0,0,0.1)",
                    border: "none",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    transform:
                      isHovered === course.id
                        ? "translateY(-5px)"
                        : "translateY(0)",
                    cursor: "pointer",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={course.courseImage}
                    alt={course.courseName}
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title className="text-center">
                      {course.courseName}
                    </Card.Title>
                    <Card.Text className="text-muted text-center">
                      المستوى:
                      {course.levelName === "level1"
                        ? "1"
                        : course.levelName === "level2"
                        ? "2"
                        : course.levelName === "level3"
                        ? "3"
                        : course.levelName === "level4"
                        ? "4"
                        : course.levelName === "level5"
                        ? "5"
                        : course.levelName === "level6"
                        ? "6"
                        : course.levelName === "level7"
                        ? "7"
                        : ""}
                    </Card.Text>
                    <Card.Text
                      className={`text-center fw-bold ${
                        course.status === "new"
                          ? "text-success"
                          : "text-secondary"
                      }`}
                    >
                      {course.status === "new"
                        ? "جديدة"
                        : course.status === "current"
                        ? "حالية"
                        : "سابقة"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {coursesInfo && coursesInfo.length > 0 && (
            <>
              <h5 className="mt-5 mb-3 text-center">تفاصيل المواد في الدورة</h5>
              <Container>
                <Row className="g-4">
                  {coursesInfo.map((subject) => (
                    <Col md={6} key={subject.subject_id}>
                      <Card className="shadow-sm border-0 rounded-3 h-100">
                        <Card.Body>
                          <Card.Title className="text-primary text-center mb-3">
                            {subject.subject_name}
                          </Card.Title>

                          {subject.marks ? (
                            <div className="table-responsive">
                              <table className="table table-sm text-center align-middle">
                                <thead>
                                  <tr>
                                    <th>الاختبار</th>
                                    <th>الامتحان</th>
                                    <th>الحضور</th>
                                    <th>المجموع</th>
                                    <th>الحالة</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>{subject.marks.test}</td>
                                    <td>{subject.marks.exam}</td>
                                    <td>{subject.marks.presence}</td>
                                    <td>
                                      <strong>{subject.marks.total}</strong>
                                    </td>
                                    <td>
                                      <span
                                        className={`fw-bold ${
                                          subject.marks.status === "successful"
                                            ? "text-success"
                                            : "text-danger"
                                        }`}
                                      >
                                        {subject.marks.status === "successful"
                                          ? "ناجح"
                                          : "راسب"}
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <p className="text-muted text-center">
                              لا يوجد علامات بعد
                            </p>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Container>
            </>
          )}

          <Modal.Footer>
            <Button
              variant="outline-secondary"
              className="btn"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="outline-danger"
              className="btn"
              type="submit"
              onClick={() => {
                person.role === "teacher"
                  ? handleDeleteAccount(person.teacherID)
                  : handleDeleteAccount(person.studentID);
              }}
            >
              حذف الحساب
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Person;
