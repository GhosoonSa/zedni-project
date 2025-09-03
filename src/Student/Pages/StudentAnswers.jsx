import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, List, Chip } from "@mui/material";
import { useParams } from "react-router-dom";
import { Axios } from "../../Api/axios";
import { GETWORKSHEETWITHANSWERSSTUDENT } from "../../Api/api";
import StudentHeader from "../Components/StudentHeader";
import QuizIcon from "@mui/icons-material/Quiz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";

const StudentAnswers = () => {
  const { id } = useParams();
  const [worksheet, setWorksheet] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Axios.get(`${GETWORKSHEETWITHANSWERSSTUDENT}/${id}`)
      .then((res) => {
        setWorksheet(res.data.worksheet);
      })
      .catch((err) => console.error("Error fetching worksheet:", err))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <StudentHeader />
      <Paper
        elevation={4}
        sx={{
          my: 12,
          mx: "auto",
          p: 5,
          direction: "rtl",
          background: "linear-gradient(135deg, #fffaf5, #fffefd)",
          minHeight: "70vh",
          maxWidth: 900,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          mb={4}
          sx={{
            fontWeight: "bold",
            color: "#5d4037",
            textAlign: "center",
            fontSize: "2rem",
          }}
        >
          تفاصيل ورقة العمل
        </Typography>

        {loading && (
          <Typography align="center" color="text.secondary" fontSize="1.2rem">
            جاري التحميل...
          </Typography>
        )}

        {!loading && worksheet ? (
          <>
            <Typography
              variant="h5"
              mb={4}
              sx={{ textAlign: "center", color: "#6d4c41", fontSize: "1.5rem" }}
            >
              📝 {worksheet.name}
            </Typography>

            {worksheet.questions?.length > 0 ? (
              <List sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {worksheet.questions.map((q, index) => (
                  <Paper
                    key={q.id}
                    elevation={2}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      backgroundColor: "#ffffff",
                      border: "1px solid #f0e5d8",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: 5,
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center" mb={1}>
                      <QuizIcon sx={{ color: "#8d6e63", mr: 1 }} />
                      <Typography
                        sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                      >
                        السؤال {index + 1}: {q.question}
                      </Typography>
                    </Box>

                    {q.options?.length > 0 && (
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          my: 2,
                        }}
                      >
                        {q.options.map((opt, i) => {
                          const isSelected = q.answer?.some(
                            (a) => a.answer === opt
                          );
                          return (
                            <Chip
                              key={i}
                              label={opt}
                              variant={isSelected ? "filled" : "outlined"}
                              icon={
                                isSelected ? (
                                  <CheckCircleIcon sx={{ color: "#2e7d32" }} />
                                ) : null
                              }
                              sx={{
                                borderRadius: "16px",
                                fontSize: "1rem",
                                fontWeight: isSelected ? "bold" : "normal",
                                backgroundColor: isSelected
                                  ? "#e8f5e9"
                                  : "#fafafa",
                                borderColor: "#d7ccc8",
                                color: isSelected ? "#2e7d32" : "#5d4037",
                                px: 1.5,
                                py: 0.5,
                              }}
                            />
                          );
                        })}
                      </Box>
                    )}

                    {q.type === "editorial" && q.answer?.length > 0 && (
                      <Box
                        mt={2}
                        p={2}
                        sx={{
                          backgroundColor: "#f9fbe7",
                          borderRadius: 2,
                          border: "1px solid #e6ee9c",
                        }}
                      >
                        <Box display="flex" alignItems="center" mb={1}>
                          <EditNoteIcon sx={{ color: "#827717", mr: 1 }} />
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              fontSize: "1.1rem",
                              color: "#827717",
                            }}
                          >
                            إجابتك:
                          </Typography>
                        </Box>
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "1rem", color: "#33691e" }}
                        >
                          {q.answer.map((a) => a.answer).join(", ")}
                        </Typography>
                      </Box>
                    )}
                  </Paper>
                ))}
              </List>
            ) : (
              <Typography
                align="center"
                color="text.secondary"
                fontSize="1.2rem"
              >
                لا توجد أسئلة لعرضها.
              </Typography>
            )}
          </>
        ) : (
          !loading && (
            <Typography align="center" color="text.secondary" fontSize="1.2rem">
              لا توجد بيانات لعرضها.
            </Typography>
          )
        )}
      </Paper>
    </>
  );
};

export default StudentAnswers;
