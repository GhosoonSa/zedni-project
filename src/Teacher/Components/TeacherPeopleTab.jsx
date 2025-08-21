import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Avatar,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Search from "../../Admin/Components/Search";

const TeacherPeopleTab = ({ courseId, level }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const authToken = localStorage.getItem("authToken");
  const [searchTerm, setSearchTerm] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/getStudentInLevel2/${courseId}/${level}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ` + authToken,
            ContentType: "application/json",
          },
        }
      );
      setStudents(response.data.students);
    } catch (error) {
      console.error("fetch student error ", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [authToken]);

  const fetchStudentInfo = async (studentId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/getStudentInfoInLevel/${studentId}/${courseId}/${level}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ` + authToken,
            ContentType: "application/json",
          },
        }
      );
      setSelectedStudent(response.data.data);
      setAttendance(response.data.presence);
    } catch (error) {
      console.error("fetch student info error ", error);
    }
  };

  const handleStudentClick = (studentId) => {
    fetchStudentInfo(studentId);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

  const fetchSearchResults = async (term) => {
    if (!term) {
      fetchStudents();
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8000/api/searchInLevel/${courseId}/${level}/${term}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
            ContentType: "application/json",
          },
        }
      );
      setStudents(response.data.students);
    } catch (error) {
      console.error("search error ", error);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchSearchResults(searchTerm);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <Box sx={{ direction: "rtl" }}>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#f8f4e9",
          borderRadius: 2,
          p: 2,
          mb: 3,
          border: "1px solid #e0d6c2",
        }}
      >
        <Search value={searchTerm} onChange={setSearchTerm} />

        <Grid container spacing={2}>
          {students.map((student) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={student.studentID}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  direction: "rtl",
                  backgroundColor: "transparent",
                  borderRadius: 2,
                  border: "1px solid #e0d6c2",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(231, 188, 145, 0.2)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
                onClick={() => {
                  searchTerm !== null
                    ? handleStudentClick(student.id)
                    : handleStudentClick(student.studentID);
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#E7BC91",
                      width: 40,
                      height: 40,
                      fontSize: "1.1rem",
                    }}
                  >
                    {student.firstAndLastName?.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "medium",
                        color: "#5a3e1b",
                        fontSize: "1.1rem",
                      }}
                    >
                      {student.firstAndLastName}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Dialog
        open={Boolean(selectedStudent)}
        onClose={(event, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            handleCloseModal();
          }
        }}
        fullWidth
        maxWidth="sm"
        dir="rtl"
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#fffaf5",
            border: "1px solid #E7BC91",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#5E3023",
            borderBottom: "1px solid #E7BC91",
            position: "relative",
            py: 3,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              left: 16,
              top: 16,
              color: "#d32f2f",
              "&:hover": {
                backgroundColor: "rgba(211, 47, 47, 0.08)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            تفاصيل الطالب
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 4 }}>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", minWidth: 120 }}
              >
                الاسم:
              </Typography>
              <Typography variant="body1">
                {selectedStudent?.firstAndLastName}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", minWidth: 120 }}
              >
                البريد الإلكتروني:
              </Typography>
              <Typography variant="body1">{selectedStudent?.email}</Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", minWidth: 120 }}
              >
                رقم الهاتف:
              </Typography>
              <Typography variant="body1">
                {selectedStudent?.phoneNumber}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", minWidth: 120 }}
              >
                الشهادة/العمل:
              </Typography>
              <Typography variant="body1">
                {selectedStudent?.studyOrCareer}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", minWidth: 120 }}
              >
                حاصل على إجازة:
              </Typography>
              <Typography variant="body1">
                {selectedStudent?.mogazeh ? "نعم" : "لا"}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                الدورات السابقة في أماكن أخرى:
              </Typography>
              {selectedStudent?.PreviousCoursesInOtherPlace?.length > 0 ? (
                <Typography variant="body1">
                  {selectedStudent.PreviousCoursesInOtherPlace}
                </Typography>
              ) : (
                <Typography variant="body1">لا يوجد دورات سابقة</Typography>
              )}
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                الدورات السابقة:
              </Typography>
              {selectedStudent?.previousCourses?.length > 0 ? (
                <ul style={{ paddingRight: "20px", margin: 0 }}>
                  {selectedStudent.previousCourses.map((course, index) => (
                    <li key={index}>
                      <Typography variant="body1">{course}</Typography>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography variant="body1">لا يوجد دورات سابقة</Typography>
              )}
            </Box>
            <Grid container spacing={2}>
              {attendance.map((subject) => (
                <Grid item xs={12} sm={6} md={4} key={subject.subject_id}>
                  <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h6">
                        {subject.subject_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        نسبة الحضور:
                        <span style={{ fontWeight: "bold" }}>
                          {subject.presence_rate}
                        </span>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TeacherPeopleTab;
