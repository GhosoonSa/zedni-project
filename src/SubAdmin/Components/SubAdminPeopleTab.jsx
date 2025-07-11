import React, { useState } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SubAdminPeopleTab = () => {

  const students = [
    {
      id: 1,
      name: "أحمد ",
      email: "ahmed@example.com",
      fatherName: "محمد عبدالله",
      phone: "0912345678",
      address: "دمشق - المزة",
      birthDate: "1995-05-15",
      qualification: "بكالوريوس في الشريعة",
      isCertified: true,
      previousCourses: ["الفقه الأساسي", "أصول الفقه"],
    },
    {
      id: 2,
      name: "سارة ",
      email: "sara@example.com",
      fatherName: "علي محمود",
      phone: "0934567890",
      address: "دمشق - القابون",
      birthDate: "1998-08-22",
      qualification: "طالبة جامعية",
      isCertified: false,
      previousCourses: ["التجويد"],
    },
    {
      id: 3,
      name: " عبدالله",
      email: "khaled@example.com",
      fatherName: "عبدالله أحمد",
      phone: "0945678901",
      address: "دمشق - قدسيا",
      birthDate: "1990-03-10",
      qualification: "إمام مسجد",
      isCertified: true,
      previousCourses: ["الفقه", "التفسير", "الحديث"],
    },
    {
      id: 4,
      name: " بيان",
      email: "bayyan@example.com",
      fatherName: "محمود حسن",
      phone: "0956789012",
      address: "دمشق - الميدان",
      birthDate: "1993-11-05",
      qualification: "مدرسة",
      isCertified: false,
      previousCourses: [],
    },
    {
      id: 5,
      name: "نور",
      email: "nour@example.com",
      fatherName: "محمود ",
      phone: "0956779012",
      address: "دمشق ",
      birthDate: "1983-11-05",
      qualification: "مدرسة",
      isCertified: false,
      previousCourses: [],
    },
    {
      id: 6,
      name: "اية",
      email: "aya@example.com",
      fatherName: " حسن",
      phone: "0956749012",
      address: " الميدان",
      birthDate: "1999-11-05",
      qualification: "مدرسة",
      isCertified: false,
      previousCourses: [],
    },
    {
      id: 7,
      name: "راية",
      email: "raya@example.com",
      fatherName: "محمود ",
      phone: "0996789012",
      address: " الميدان",
      birthDate: "1999-11-05",
      qualification: "مدرسة",
      isCertified: false,
      previousCourses: [],
    },
    {
      id: 8,
      name: "شمس",
      email: "ya@example.com",
      fatherName: "محمود ",
      phone: "0906789012",
      address: " الميدان",
      birthDate: "1979-11-05",
      qualification: "مدرسة",
      isCertified: false,
      previousCourses: [],
    },
  ];

  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

  return (
    <Box sx={{ direction: 'rtl' }}>
      <Paper elevation={0} sx={{
        backgroundColor: '#f8f4e9',
        borderRadius: 2,
        p: 2,
        mb: 3,
        border: '1px solid #e0d6c2'
      }}>
        <Grid container spacing={2}>
          {students.map((student) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={student.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  direction: 'rtl',
                  backgroundColor: 'transparent',
                  borderRadius: 2,
                  border: '1px solid #e0d6c2',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(231, 188, 145, 0.2)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
                onClick={() => handleStudentClick(student)}
              >
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}>
                  <Avatar sx={{
                    bgcolor: '#E7BC91',
                    width: 40,
                    height: 40,
                    fontSize: '1.1rem'
                  }}>
                    {student.name.split(' ')[0].charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{
                      fontWeight: 'medium',
                      color: '#5a3e1b',
                      fontSize: '1.1rem'
                    }}>
                      {student.name}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {}
      <Dialog
        open={Boolean(selectedStudent)}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            handleCloseModal();
          }
        }} fullWidth
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
            py: 3
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
              <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 120 }}>
                الاسم:
              </Typography>
              <Typography variant="body1">{selectedStudent?.name}</Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 120 }}>
                اسم الأب:
              </Typography>
              <Typography variant="body1">
                {selectedStudent?.fatherName}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 120 }}>
                تاريخ الميلاد:
              </Typography>
              <Typography variant="body1">
                {selectedStudent?.birthDate}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 120 }}>
                البريد الإلكتروني:
              </Typography>
              <Typography variant="body1">{selectedStudent?.email}</Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 120 }}>
                رقم الهاتف:
              </Typography>
              <Typography variant="body1">{selectedStudent?.phone}</Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 120 }}>
                العنوان:
              </Typography>
              <Typography variant="body1">
                {selectedStudent?.address}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 120 }}>
                الشهادة/العمل:
              </Typography>
              <Typography variant="body1">
                {selectedStudent?.qualification}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 120 }}>
                حاصل على إجازة:
              </Typography>
              <Typography variant="body1">
                {selectedStudent?.isCertified ? "نعم" : "لا"}
              </Typography>
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
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SubAdminPeopleTab;