import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Chip,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Axios } from "../../Api/axios";
import { GETTEACHERANSWRS } from "../../Api/api";
import StudentHeader from "../Components/StudentHeader";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const WorksheetDetailsS = () => {
  const { id } = useParams();
  const [worksheet, setWorksheet] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Axios.get(`${GETTEACHERANSWRS}/${id}`)
      .then((res) => {
        setWorksheet(res.data);
      })
      .catch((err) => {
        console.error("Error fetching worksheet:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <StudentHeader />
      <Paper
        elevation={3}
        sx={{
          my: 10,
          mx: "auto",
          p: 5,
          direction: "rtl",
          background: "linear-gradient(135deg, #fffaf5, #fffefd)",
          minHeight: "70vh",
          maxWidth: 1100,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          mb={4}
          sx={{ fontWeight: "bold", textAlign: "center", color: "#5d4037" }}
        >
          📝 إجابات الأستاذ
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
              sx={{ fontWeight: "bold", color: "#3e2723", textAlign: "center" }}
            >
              اسم ورقة العمل : {worksheet.worksheet_name}
            </Typography>

            {worksheet.questions?.length > 0 ? (
              <Box display="flex" flexDirection="column" gap={3}>
                {worksheet.questions.map((q, index) => (
                  <Card
                    key={q.questionID}
                    elevation={4}
                    sx={{
                      borderRadius: 3,
                      backgroundColor: "#ffffff",
                      transition: "0.3s",
                      "&:hover": {
                        boxShadow: 6,
                        transform: "translateY(-3px)",
                      },
                    }}
                  >
                    <CardContent>
                      {/* السؤال */}
                      <Box display="flex" alignItems="center" mb={2}>
                        <HelpOutlineIcon sx={{ color: "#8d6e63", mr: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          السؤال {index + 1}: {q.question}
                        </Typography>
                      </Box>

                      {/* الخيارات */}
                      {q.options?.length > 0 && (
                        <Box
                          sx={{
                            mb: 2,
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                          }}
                        >
                          {q.options.map((opt, i) => {
                            const isCorrect = q.teacherAnswers?.some(
                              (a) => a.answer === opt
                            );
                            return (
                              <Chip
                                key={i}
                                label={opt}
                                color={isCorrect ? "success" : "default"}
                                variant={isCorrect ? "filled" : "outlined"}
                                sx={{
                                  fontWeight: isCorrect ? "bold" : "normal",
                                }}
                              />
                            );
                          })}
                        </Box>
                      )}

                      <Divider sx={{ my: 2 }} />

                      {/* الإجابة */}
                      {q.teacherAnswers?.length > 0 && (
                        <Box display="flex" alignItems="center">
                          <CheckCircleOutlineIcon
                            sx={{ color: "#2e7d32", mr: 1 }}
                          />
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "500", color: "#2e7d32" }}
                          >
                            الإجابة:{" "}
                            {q.teacherAnswers.map((a) => a.answer).join(", ")}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Box>
            ) : (
              <Typography align="center" color="text.secondary">
                لا توجد أسئلة لعرضها.
              </Typography>
            )}
          </>
        ) : (
          !loading && (
            <Typography align="center" color="text.secondary">
              لا توجد بيانات لعرضها.
            </Typography>
          )
        )}
      </Paper>
    </>
  );
};

export default WorksheetDetailsS;
