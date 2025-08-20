import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grow,
  Chip,
  Paper,
} from "@mui/material";
import axios from "axios";

const StudentResultsTab = ({ courseId, level }) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [marks, setMarks] = useState({
    study: "",
    exam: "",
    attendance: "",
    total: "",
    status: "",
  });
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchSubject = async () => {
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
        console.error("fetch subjects error ", error);
      }
    };
    fetchSubject();
  }, [authToken]);

  const fetchMarks = async (subjectId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/student/getMarksStudent/${subjectId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ` + authToken,
            ContentType: "application/json",
          },
        }
      );
      setMarks(response.data.results);
    } catch (error) {
      console.error("fetch marks errro ", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* قائمة المواد   */}
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
          "&::-webkit-scrollbar-track": { backgroundColor: "#f8f4e9" },
        }}
      >
        {subjects.map((subject) => (
          <Box
            key={subject.id}
            sx={{
              minWidth: { xs: "45%", sm: "30%", md: "22%" },
              flexShrink: 0,
            }}
          >
            <Grow in={true} timeout={subject.id * 200}>
              <Card
                onClick={() => {
                  setSelectedSubject(subject);
                  fetchMarks(subject.id);
                }}
                sx={{
                  backgroundColor:
                    selectedSubject?.id === subject.id ? "#f8f4e9" : "#fffaf5",
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
                  mb: 2,
                  height: "100%",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      fontSize: "1rem",
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

      {/* تفاصيل المادة المختارة */}
      {selectedSubject && (
        <Box
          sx={{
            mt: 3,
            width: "100%",
            border: "2px solid #E7BC91",
            borderRadius: 2,
            backgroundColor: "#fffaf5",
            p: 3,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* النتائج  */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mb: 4,
            }}
          >
            {Object.entries(marks).map(
              ([key, value]) =>
                key !== "النتيجة" && (
                  <Box
                    key={key}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "#f8f4e9",
                      p: 2,
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {key === "study"
                        ? "المذاكرة"
                        : key === "exam"
                        ? "الامتحان"
                        : key === "presence"
                        ? "الحضور"
                        : key === "total"
                        ? "المجموع"
                        : key === "status"
                        ? "النتيجة"
                        : ""}
                      :
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: key === "total" ? "bold" : "normal",
                        color: "#5a3e1b",
                      }}
                    >
                      {value === "successful"
                        ? "ناجح"
                        : value === "failed"
                        ? "راسب"
                        : value}
                    </Typography>
                  </Box>
                )
            )}
          </Box>

          {/* النتيجة النهائية */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:
                marks.status === "successful" ? "#e8f5e9" : "#ffebee",
              p: 3,
              borderRadius: 1,
              border: `2px solid ${
                marks.status === "failed" ? "#4caf50" : "#f44336"
              }`,
            }}
          >
            <Chip
              label={`النتيجة: ${
                marks.status === "successful" ? "ناجح" : "راسب"
              }`}
              color={marks.status === "successful" ? "success" : "error"}
              sx={{
                fontSize: "1.3rem",
                padding: "10px 20px",
                fontWeight: "bold",
                width: "80%",
                textAlign: "center",
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default StudentResultsTab;
