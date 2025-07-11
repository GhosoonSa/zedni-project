import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Card,
  CardContent,
  Grow,
  useTheme,
  useMediaQuery
} from "@mui/material";
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HistoryIcon from '@mui/icons-material/History';
import AttendanceForm from "./AttendanceForm";
import AttendanceHistory from "./AttendanceHistory";

const SubAdminJoiningRequestsTab = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [subjects] = useState([
    { id: 1, name: "أصول الفقه" },
    { id: 2, name: "تفسير القرآن الكريم" },
    { id: 3, name: "صحيح البخاري" },
    { id: 4, name: "الفقه الميسر" }
  ]);

  const [students] = useState([
    { id: 1, name: "أحمد ", subjectId: 1 },
    { id: 2, name: "سارة ", subjectId: 1 },
    { id: 3, name: "خالد ", subjectId: 1 },
    { id: 4, name: "فاطمة ", subjectId: 2 },
    { id: 5, name: "محمود ", subjectId: 2 },
    { id: 6, name: "نورا ", subjectId: 3 },
    { id: 7, name: "باسل ", subjectId: 3 },
    { id: 8, name: "هبة ", subjectId: 4 }
  ]);

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [view, setView] = useState("form");
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  useEffect(() => {
    const mockHistory = [
      {
        id: 1,
        date: "2023-06-15",
        subjectId: 1,
        presentStudents: [1, 2, 3]
      },
      {
        id: 2,
        date: "2023-06-10",
        subjectId: 1,
        presentStudents: [1, 3]
      }
    ];
    setAttendanceHistory(mockHistory);
  }, []);

  const handleSelectSubject = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    setSelectedSubject(subject);
    setView("form");
  };

  const handleSubmitAttendance = (date, presentStudents) => {
    const newRecord = {
      id: attendanceHistory.length + 1,
      date: date,
      subjectId: selectedSubject.id,
      presentStudents: presentStudents.map(s => s.id)
    };
    setAttendanceHistory([newRecord, ...attendanceHistory]);
  };

  return (
    <Box sx={{ 
      p: isSmallScreen ? 2 : 3,
      direction: 'rtl',
      minHeight: '100vh',
      backgroundColor: '#f9f5f0'
    }}>
      {}
      <Box sx={{
        display: 'flex',
        overflowX: 'auto',
        gap: 2,
        py: 2,
        '&::-webkit-scrollbar': { height: '8px' },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#E7BC91',
          borderRadius: '4px'
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f8f4e9'
        }
      }}>
        {subjects.map((subject, index) => (
          <Box key={subject.id} sx={{
            minWidth: isSmallScreen ? '80%' : isMediumScreen ? '45%' : '22%',
            flexShrink: 0
          }}>
            <Grow in={true} timeout={index * 200}>
              <Card
                onClick={() => handleSelectSubject(subject.id)}
                sx={{
                  backgroundColor: selectedSubject?.id === subject.id ? '#f8f4e9' : '#fffaf5',
                  border: selectedSubject?.id === subject.id ? '2px solid #E7BC91' : '1px solid #e0d6c2',
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    borderColor: '#E7BC91'
                  },
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <EventIcon sx={{
                    fontSize: '2.5rem',
                    mb: 1,
                    color: '#7b3f00'
                  }} />
                  <Typography variant="h6" sx={{
                    fontWeight: 'bold',
                    fontSize: isSmallScreen ? '1rem' : '1.1rem',
                    color: '#5a3e1b'
                  }}>
                    {subject.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grow>
          </Box>
        ))}
      </Box>

      {}
      {selectedSubject && (
        <Paper elevation={3} sx={{
          mt: 3,
          width: '100%',
          border: '2px solid #E7BC91',
          borderRadius: 2,
          backgroundColor: '#fffaf5',
          p: isSmallScreen ? 2 : 3,
          boxShadow: 3,
        }}>
          <Divider sx={{ borderColor: '#e0d6c2', mb: 3 }} />

          {}
          <Box sx={{
            display: 'flex',
            justifyContent: isSmallScreen ? 'center' : 'flex-start',
            mb: 3,
            gap: 2,
            flexWrap: 'wrap'
          }}>
            <Button
              variant={view === "form" ? "contained" : "outlined"}
              startIcon={<CheckCircleIcon sx={{ ml: 1 }} />}
              onClick={() => setView("form")}
              sx={{
                backgroundColor: view === "form" ? '#7b3f00' : 'transparent',
                color: view === "form" ? '#fff' : '#7b3f00',
                '&:hover': {
                  backgroundColor: view === "form" ? '#5a3e1b' : '#f8f4e9'
                },
                px: 3,
                py: 1,
                borderRadius: 2,
                minWidth: isSmallScreen ? '100%' : '180px'
              }}
            >
              إضافة تسجيل حضور
            </Button>
            <Button
              variant={view === "history" ? "contained" : "outlined"}
              startIcon={<HistoryIcon sx={{ ml: 1 }} />}
              onClick={() => setView("history")}
              sx={{
                backgroundColor: view === "history" ? '#7b3f00' : 'transparent',
                color: view === "history" ? '#fff' : '#7b3f00',
                '&:hover': {
                  backgroundColor: view === "history" ? '#5a3e1b' : '#f8f4e9'
                },
                px: 3,
                py: 1,
                borderRadius: 2,
                minWidth: isSmallScreen ? '100%' : '180px'
              }}
            >
              سجل الحضور
            </Button>
          </Box>

          {}
          {view === "form" ? (
            <AttendanceForm
              students={students.filter(s => s.subjectId === selectedSubject.id)}
              onSubmit={handleSubmitAttendance}
            />
          ) : (
            <AttendanceHistory
              history={attendanceHistory.filter(h => h.subjectId === selectedSubject.id)}
              students={students.filter(s => s.subjectId === selectedSubject.id)}
            />
          )}
        </Paper>
      )}
    </Box>
  );
};

export default SubAdminJoiningRequestsTab;