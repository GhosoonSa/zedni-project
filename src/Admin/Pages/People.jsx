import React, { useState, useEffect } from "react";
import AdminHeader from "../Components/AdminHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";
import Person from "../Components/Person";
import Search from "../Components/Search";
import axios from "axios";

const People = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const authToken = localStorage.getItem("authToken");
  const [searchTerm, setSearchTerm] = useState("");
  let isAdmin = "admin";

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/admin/getAllStudents`,
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
  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/admin/getAllTeachers`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ` + authToken,
            ContentType: "application/json",
          },
        }
      );
      setTeachers(response.data.teachers);
    } catch (error) {
      console.error("fetch student error ", error);
    }
  };

  const fetchSearchResults = async (term) => {
    if (!term) {
      fetchStudents();
      fetchTeachers();
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8000/api/searchStudentTeacherInSystem/${term}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
            ContentType: "application/json",
          },
        }
      );
      setStudents(response.data.students);
      setTeachers(response.data.teachers);
    } catch (error) {
      console.error("search error ", error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
  }, [authToken]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchSearchResults(searchTerm);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleUserClick = (user) => {
    setSelectedStudent(user);
    setIsOpen(true);
  };

  return (
    <>
      <AdminHeader />
      <Paper
        elevation={3}
        sx={{
          my: 13,
          py: 2,
          px: 3,
          direction: "rtl",
          backgroundColor: "#fffaf5",
          width: "auto",
          mr: 4,
          ml: 4,
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            الأشخاص
          </Typography>
          <Search value={searchTerm} onChange={setSearchTerm} />
          {students.length === 0 ? (
            <Typography variant="body1" sx={{ mb: 2 }}>
              لا يوجد طلاب
            </Typography>
          ) : (
            <>
              <Typography variant="body1" sx={{ mb: 2 }}>
                الطلاب:
              </Typography>
              <TableContainer
                component={Paper}
                sx={{
                  maxHeight: students.length > 20 ? 400 : "auto",
                  overflowY: students.length > 20 ? "auto" : "visible",
                }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ textAlign: "center" }}>الاسم</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        اسم الأب
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        البريد الالكتروني
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        رقم الموبايل
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>الدور</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.studentID} hover>
                        <TableCell sx={{ textAlign: "center" }}>
                          {student.firstAndLastName}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {student.fatherName}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {student.email}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {student.phoneNumber}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {student.role === "student" ? "طالب" : ""}
                        </TableCell>

                        <TableCell sx={{ textAlign: "center" }}>
                          <Button
                            color="warning"
                            variant="outlined"
                            size="small"
                            onClick={() => handleUserClick(student)}
                          >
                            تفاصيل
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
          {teachers.length === 0 ? (
            <Typography variant="body1" sx={{ mb: 2, mt: 5 }}>
              لا يوجد أساتذة
            </Typography>
          ) : (
            <>
              <Typography variant="body1" sx={{ mb: 2, mt: 5 }}>
                الأساتذة:
              </Typography>
              <TableContainer
                component={Paper}
                sx={{
                  mt: 5,
                  maxHeight: teachers.length > 20 ? 400 : "auto",
                  overflowY: teachers.length > 20 ? "auto" : "visible",
                }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ textAlign: "center" }}>الاسم</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        اسم الأب
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        البريد الالكتروني
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        رقم الموبايل
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>الدور</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teachers.map((teacher) => (
                      <TableRow key={teacher.teacherID} hover>
                        <TableCell sx={{ textAlign: "center" }}>
                          {teacher.firstAndLastName}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {teacher.fatherName}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {teacher.email}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {teacher.phoneNumber}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {teacher.role === "teacher" ? "استاذ" : ""}
                        </TableCell>

                        <TableCell sx={{ textAlign: "center" }}>
                          <Button
                            color="warning"
                            variant="outlined"
                            size="small"
                            onClick={() => handleUserClick(teacher)}
                          >
                            تفاصيل
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
          <Person
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            person={selectedStudent}
            token={authToken}
            sender={isAdmin}
            refreshData={() => {
              fetchStudents();
              fetchTeachers();
            }}
          />
        </Box>
      </Paper>
    </>
  );
};

export default People;
