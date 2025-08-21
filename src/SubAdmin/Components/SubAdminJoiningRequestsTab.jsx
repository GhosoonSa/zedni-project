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
  useMediaQuery,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HistoryIcon from "@mui/icons-material/History";
import AttendanceForm from "./AttendanceForm";
import AttendanceHistory from "./AttendanceHistory";
import axios from "axios";

const SubAdminJoiningRequestsTab = ({ courseId, level }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const authToken = localStorage.getItem("authToken");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [view, setView] = useState("form");
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/getSubjects/${courseId}/${level}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ` + authToken,
              ContentType: "application/json",
            },
          }
        );
        setSubjects(response.data.subjects);
      } catch (error) {
        console.error("Error posting Ad info:", error);
      }
    };
    fetchSubjects();
  }, [authToken]);

  const handleSelectSubject = (subjectId) => {
    const subject = subjects.find((s) => s.id === subjectId);
    setSelectedSubject(subject);
    setView("form");
  };

  const handleSubmitAttendance = async (date, presentStudentIds, subjectId) => {
    const newRecord = {
      id: attendanceHistory.length + 1,
      date: date,
      subjectId: selectedSubject.id,
      presentStudentIds: presentStudentIds,
    };
    setAttendanceHistory([newRecord, ...attendanceHistory]);
    try {
      const formData = new FormData();
      formData.append("date", date);
      presentStudentIds.forEach((id) => {
        formData.append("studentIDs[]", id);
      });
      formData.append("subjectID", subjectId);
      console.log("ids ", presentStudentIds);
      const response = await axios.post(
        "http://localhost:8000/api/subadmin/addPresence",
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ` + authToken,
            ContentType: "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("submit attendance error", error);
      if (error.response.status === 409) {
        alert("تم تسجيل الحضور مسبقا من أجل هذا التاريخ!");
      }
    }
  };

  return (
    <Box
      sx={{
        p: isSmallScreen ? 2 : 3,
        direction: "rtl",
        minHeight: "100vh",
        backgroundColor: "#f9f5f0",
      }}
    >
      {subjects.length === 0 ? (
        <Box
          sx={{
            py: 4,
            textAlign: "center",
            width: "100%",
          }}
        >
          <Typography variant="h6" color="textSecondary">
            لا يوجد مواد حالياً
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 2,
            py: 2,
            "&::-webkit-scrollbar": { height: "8px" },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#E7BC91",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f8f4e9",
            },
          }}
        >
          {subjects.map((subject, index) => (
            <Box
              key={subject.id}
              sx={{
                minWidth: isSmallScreen
                  ? "80%"
                  : isMediumScreen
                  ? "45%"
                  : "22%",
                flexShrink: 0,
              }}
            >
              <Grow in={true} timeout={index * 200}>
                <Card
                  onClick={() => handleSelectSubject(subject.id)}
                  sx={{
                    backgroundColor:
                      selectedSubject?.id === subject.id
                        ? "#f8f4e9"
                        : "#fffaf5",
                    border:
                      selectedSubject?.id === subject.id
                        ? "2px solid #E7BC91"
                        : "1px solid #e0d6c2",
                    borderRadius: 2,
                    boxShadow: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      borderColor: "#E7BC91",
                    },
                    cursor: "pointer",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <CardContent sx={{ textAlign: "center", py: 3 }}>
                    <EventIcon
                      sx={{
                        fontSize: "2.5rem",
                        mb: 1,
                        color: "#7b3f00",
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        fontSize: isSmallScreen ? "1rem" : "1.1rem",
                        color: "#5a3e1b",
                      }}
                    >
                      {subject.subjectName}
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Box>
          ))}
        </Box>
      )}

      {selectedSubject && (
        <Paper
          elevation={3}
          sx={{
            mt: 3,
            width: "100%",
            border: "2px solid #E7BC91",
            borderRadius: 2,
            backgroundColor: "#fffaf5",
            p: isSmallScreen ? 2 : 3,
            boxShadow: 3,
          }}
        >
          <Divider sx={{ borderColor: "#e0d6c2", mb: 3 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: isSmallScreen ? "center" : "flex-start",
              mb: 3,
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant={view === "form" ? "contained" : "outlined"}
              startIcon={<CheckCircleIcon sx={{ ml: 1 }} />}
              onClick={() => setView("form")}
              sx={{
                backgroundColor: view === "form" ? "#7b3f00" : "transparent",
                color: view === "form" ? "#fff" : "#7b3f00",
                "&:hover": {
                  backgroundColor: view === "form" ? "#5a3e1b" : "#f8f4e9",
                },
                px: 3,
                py: 1,
                borderRadius: 2,
                minWidth: isSmallScreen ? "100%" : "180px",
              }}
            >
              إضافة تسجيل حضور
            </Button>
            <Button
              variant={view === "history" ? "contained" : "outlined"}
              startIcon={<HistoryIcon sx={{ ml: 1 }} />}
              onClick={() => setView("history")}
              sx={{
                backgroundColor: view === "history" ? "#7b3f00" : "transparent",
                color: view === "history" ? "#fff" : "#7b3f00",
                "&:hover": {
                  backgroundColor: view === "history" ? "#5a3e1b" : "#f8f4e9",
                },
                px: 3,
                py: 1,
                borderRadius: 2,
                minWidth: isSmallScreen ? "100%" : "180px",
              }}
            >
              سجل الحضور
            </Button>
          </Box>

          {view === "form" ? (
            <AttendanceForm
              subjectId={selectedSubject.id}
              onSubmit={handleSubmitAttendance}
            />
          ) : (
            <AttendanceHistory subjectId={selectedSubject.id} />
          )}
        </Paper>
      )}
    </Box>
  );
};

export default SubAdminJoiningRequestsTab;
