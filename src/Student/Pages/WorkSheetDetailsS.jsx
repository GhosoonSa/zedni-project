import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  List,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { Axios } from "../../Api/axios";
import {
  GETWORKSHEETWITHANSWERS,
  EDITQUESTION,
  DELETEQUESTION,
  EDITANSWERS,
  GETWORKSHEETWITHANSWERSSTUDENT,
} from "../../Api/api";

import { Edit, Delete } from "@mui/icons-material";
import StudentHeader from "../Components/StudentHeader";

const WorksheetDetailsS = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [worksheet, setWorksheet] = useState(null);
  const [loading, setLoading] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedOptions, setEditedOptions] = useState([]);
  const [editedAnswer, setEditedAnswer] = useState("");

  useEffect(() => {
    setLoading(true);
    Axios.get(`${GETWORKSHEETWITHANSWERSSTUDENT}/${id}`)
      .then((res) => {
        setWorksheet(res.data.worksheet);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleEditClick = (question) => {
    setCurrentQuestion(question);
    setEditedQuestion(question.question);
    setEditedOptions(question.options ? [...question.options] : []);
    setEditedAnswer(question.answer?.[0]?.answer || "");
    setEditOpen(true);
  };

  const handleDelete = (questionID) => {
    Axios.delete(`${DELETEQUESTION}/${questionID}`)
      .then(() => {
        setWorksheet((prev) => ({
          ...prev,
          questions: prev.questions.filter((q) => q.id !== questionID),
        }));
      })
      .catch((err) => console.error(err));
  };

  const handleSave = async () => {
    const filteredOptions = editedOptions.filter((o) => o.trim() !== "");
    const questionPayload = {
      questionID: currentQuestion.id,
      question: editedQuestion,
      type: currentQuestion.type,
      ...(filteredOptions.length > 0 && { options: filteredOptions }),
    };

    try {
      await Axios.put(`${EDITQUESTION}`, questionPayload);
      if (currentQuestion.type === "editorial" && editedAnswer.trim() !== "") {
        const answerPayload = {
          answerID: currentQuestion.answer?.[0]?.id,
          answer: editedAnswer,
        };
        await Axios.put(`${EDITANSWERS}`, answerPayload);
      }

      setWorksheet((prev) => ({
        ...prev,
        questions: prev.questions.map((q) =>
          q.id === currentQuestion.id
            ? {
                ...q,
                question: editedQuestion,
                options: filteredOptions,
                answer:
                  currentQuestion.type === "editorial"
                    ? [{ ...currentQuestion.answer?.[0], answer: editedAnswer }]
                    : currentQuestion.answer,
              }
            : q
        ),
      }));

      setEditOpen(false);
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء حفظ السؤال أو الإجابة");
    }
  };

  const handleAddQuestionClick = () => {
    navigate(`/AddQuestion/${id}`);
  };

  return (
    <>
      <StudentHeader />
      <Paper
        elevation={3}
        sx={{
          my: 15,
          mx: 5,
          p: 4,
          direction: "rtl",
          backgroundColor: "#fffaf5",
          minHeight: "70vh",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h4">تفاصيل ورقة العمل</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddQuestionClick}
          >
            إضافة سؤال
          </Button>
        </Box>

        {loading && <Typography>جاري التحميل...</Typography>}

        {!loading && worksheet ? (
          <>
            <Typography variant="h5" mb={3}>
              اسم ورقة العمل: {worksheet.name}
            </Typography>

            {worksheet.questions?.length > 0 ? (
              <List>
                {worksheet.questions.map((q, index) => (
                  <Paper
                    key={q.id}
                    elevation={1}
                    sx={{
                      mb: 2,
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: "#fffefc",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold" }}>
                        السؤال {index + 1}: {q.question}
                      </Typography>
                      <Box>
                        <IconButton
                          onClick={() => handleEditClick(q)}
                          color="primary"
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(q.id)}
                          color="error"
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>

                    {q.options?.length > 0 && (
                      <Box
                        sx={{
                          mb: 1,
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 0.5,
                        }}
                      >
                        {q.options.map((opt, i) => {
                          const isCorrect = q.answer?.some(
                            (a) => a.answer === opt
                          );
                          return (
                            <Box
                              key={i}
                              sx={{
                                px: 1.5,
                                py: 0.2,
                                borderRadius: "16px",
                                border: "1px solid #e0c097",
                                backgroundColor: isCorrect
                                  ? "#d0f0c0"
                                  : "#fff8f0",
                                fontSize: "13px",
                                fontWeight: isCorrect ? "bold" : "normal",
                                color: isCorrect ? "#2e7d32" : "#000",
                              }}
                            >
                              {opt}
                            </Box>
                          );
                        })}
                      </Box>
                    )}

                    {q.answer?.length > 0 && q.type === "editorial" && (
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "500",
                          color: "#2e2e2e",
                          fontSize: "14px",
                        }}
                      >
                        الإجابة:{" "}
                        <span style={{ color: "#2e7d32" }}>
                          {q.answer.map((a) => a.answer).join(", ")}
                        </span>
                      </Typography>
                    )}
                  </Paper>
                ))}
              </List>
            ) : (
              <Typography>لا توجد أسئلة لعرضها.</Typography>
            )}
          </>
        ) : (
          !loading && <Typography>لا توجد بيانات لعرضها.</Typography>
        )}
      </Paper>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth>
        <DialogTitle>تعديل السؤال</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            minRows={2}
            label="نص السؤال"
            value={editedQuestion}
            onChange={(e) => setEditedQuestion(e.target.value)}
            sx={{ mt: 1, mb: 2 }}
          />
          {currentQuestion &&
            currentQuestion.type !== "editorial" &&
            editedOptions.map((opt, idx) => (
              <Box key={idx} sx={{ display: "flex", mb: 1 }}>
                <TextField
                  fullWidth
                  value={opt}
                  onChange={(e) => {
                    const newOpts = [...editedOptions];
                    newOpts[idx] = e.target.value;
                    setEditedOptions(newOpts);
                  }}
                />
                <Button
                  color="error"
                  onClick={() =>
                    setEditedOptions(editedOptions.filter((_, i) => i !== idx))
                  }
                  sx={{ ml: 1 }}
                >
                  حذف
                </Button>
              </Box>
            ))}

          {currentQuestion && currentQuestion.type === "editorial" && (
            <TextField
              fullWidth
              multiline
              minRows={2}
              label="الإجابة"
              value={editedAnswer}
              onChange={(e) => setEditedAnswer(e.target.value)}
              sx={{ mt: 2, mb: 2 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>إلغاء</Button>
          <Button variant="contained" onClick={handleSave}>
            حفظ
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WorksheetDetailsS;
