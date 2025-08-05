import React, { useState, useEffect } from "react";
import TeacherHeader from "../Components/TeacherHeader";
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
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import Person from "../../Admin/Components/Person";
import Search from "../../Admin/Components/Search";

const PeopleT = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const authToken = localStorage.getItem("authToken");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        avatar: "",
        fatherName: "Jane Smith",
        phoneNumber: "099999999",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "User",
        avatar: "",
        fatherName: "Bob Johnson",
        phoneNumber: "099999999",
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "User",
        avatar: "",
        fatherName: "John Doe",
        phoneNumber: "099999999",
      },
    ];
    setStudents(mockUsers);
    setFilteredStudents(mockUsers);
  }, []);

  const handleUserClick = (user) => {
    setSelectedStudent(user);
    setIsOpen(true);
  };

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const results = students.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerSearch) ||
        user.email.toLowerCase().includes(lowerSearch) ||
        user.fatherName.toLowerCase().includes(lowerSearch)
    );
    setFilteredStudents(results);
  }, [searchTerm, students]);

  return (
    <>
      <TeacherHeader />
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
            الطلاب
          </Typography>
          <Search value={searchTerm} onChange={setSearchTerm} />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}>الاسم</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>اسم الأب</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    البريد الالكتروني
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    رقم الموبايل
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>الدور</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell sx={{ textAlign: "center" }}>
                      {user.name}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {user.fatherName}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {user.email}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {user.phoneNumber}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {user.role}
                    </TableCell>

                    <TableCell sx={{ textAlign: "center" }}>
                      <Button
                        color="warning"
                        variant="outlined"
                        size="small"
                        onClick={() => handleUserClick(user)}
                      >
                        تفاصيل
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <Person
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  person={selectedStudent}
                  token={authToken}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>{" "}
    </>
  );
};

export default PeopleT;
