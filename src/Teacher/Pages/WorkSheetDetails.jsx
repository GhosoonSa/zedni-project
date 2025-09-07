import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { Axios } from "../../Api/axios";
import {
  GETWORKSHEETWITHANSWERS,
  EDITQUESTION,
  DELETEQUESTION,
  EDITANSWERS,
} from "../../Api/api";
import TeacherHeader from "../Components/TeacherHeader";

const WorksheetDetails = () => {
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
    Axios.get(`${GETWORKSHEETWITHANSWERS}/${id}`)
      .then((res) => setWorksheet(res.data.worksheet))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleEditClick = (q) => {
    setCurrentQuestion(q);
    setEditedQuestion(q.question);
    setEditedOptions(q.options ? [...q.options] : []);
    setEditedAnswer(q.answer?.[0]?.answer || "");
    setEditOpen(true);
  };

  const handleDelete = async (questionID) => {
    await Axios.delete(`${DELETEQUESTION}/${questionID}`);
    setWorksheet((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionID),
    }));
  };

  const handleSaveUnified = async () => {
    if (!currentQuestion) return;

    const filteredOptions = editedOptions.filter((o) => o.trim() !== "");

    const questionChanged =
      editedQuestion.trim() !== currentQuestion.question ||
      (currentQuestion.type !== "editorial" &&
        JSON.stringify(filteredOptions) !==
          JSON.stringify(currentQuestion.options));

    const answerChanged =
      editedAnswer !== (currentQuestion.answer?.[0]?.answer || "");

    try {
      if (questionChanged) {
        const payload = {
          questionID: currentQuestion.id,
          question: editedQuestion,
          type: currentQuestion.type,
          options:
            currentQuestion.type !== "editorial" ? filteredOptions : undefined,
          answer:
            currentQuestion.type !== "editorial" && editedAnswer
              ? [{ answer: editedAnswer }]
              : [],
        };

        await Axios.put(`${EDITQUESTION}`, payload);

        setWorksheet((prev) => ({
          ...prev,
          questions: prev.questions.map((q) =>
            q.id === currentQuestion.id
              ? {
                  ...q,
                  question: editedQuestion,
                  options: filteredOptions,
                  answer:
                    currentQuestion.type !== "editorial"
                      ? [{ answer: editedAnswer }]
                      : q.answer,
                }
              : q
          ),
        }));
      }

      if (answerChanged) {
        const answerID = currentQuestion.answer?.[0]?.id;
        if (!answerID) {
          alert("لا يوجد جواب موجود لتعديله.");
          return;
        }

        await Axios.put(`${EDITANSWERS}`, {
          questionID: currentQuestion.id,
          answerID: answerID,
          answer: editedAnswer,
        });

        setWorksheet((prev) => ({
          ...prev,
          questions: prev.questions.map((q) =>
            q.id === currentQuestion.id
              ? { ...q, answer: [{ ...q.answer[0], answer: editedAnswer }] }
              : q
          ),
        }));
      }

      setEditOpen(false);
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء حفظ التعديلات");
    }
  };

  const handleAddQuestion = () => navigate(`/AddQuestion/${id}`);

  return (
    <>
      <TeacherHeader />
      <Paper
        elevation={3}
        sx={{
          my: 12,
          mx: "auto",
          p: 5,
          direction: "rtl",
          background: "linear-gradient(135deg, #fffaf5, #fffefd)",
          minHeight: "70vh",
          maxWidth: 1100,
          borderRadius: 4,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            تفاصيل ورقة العمل
          </Typography>
          <Button
            sx={{ backgroundColor: "#5D4037" }}
            variant="contained"
            color="primary"
            onClick={handleAddQuestion}
          >
            إضافة سؤال
          </Button>
        </Box>

        {loading ? (
          <Typography align="center">جاري التحميل...</Typography>
        ) : worksheet && worksheet.questions?.length > 0 ? (
          <Grid container spacing={3}>
            {worksheet.questions.map((q, idx) => (
              <Grid item xs={12} sm={6} key={q.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    backgroundColor: "#ffffff",
                    transition: "0.3s",
                    "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        السؤال {idx + 1}: {q.question}
                      </Typography>
                      <Box>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleEditClick(q)}
                        >
                          تعديل
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          onClick={() => handleDelete(q.id)}
                          sx={{ ml: 1 }}
                        >
                          حذف
                        </Button>
                      </Box>
                    </Box>

                    {q.options?.length > 0 && (
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        {q.options.map((opt, i) => (
                          <Box
                            key={i}
                            sx={{
                              px: 1.5,
                              py: 0.5,
                              borderRadius: "16px",
                              border: "1px solid #e0c097",
                              backgroundColor: q.answer?.some(
                                (a) => a.answer === opt
                              )
                                ? "#d0f0c0"
                                : "#fff8f0",
                              fontWeight: q.answer?.some(
                                (a) => a.answer === opt
                              )
                                ? "bold"
                                : "normal",
                              color: q.answer?.some((a) => a.answer === opt)
                                ? "#2e7d32"
                                : "#000",
                              fontSize: "14px",
                            }}
                          >
                            {opt}
                          </Box>
                        ))}
                      </Box>
                    )}

                    {q.type === "editorial" && q.answer?.length > 0 && (
                      <Typography fontSize="14px">
                        الإجابة:{" "}
                        <span style={{ color: "#2e7d32" }}>
                          {q.answer.map((a) => a.answer).join(", ")}
                        </span>
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography align="center" mt={3}>
            لا توجد أسئلة لعرضها.
          </Typography>
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
            sx={{ mb: 2 }}
          />
          {currentQuestion && currentQuestion.type !== "editorial" && (
            <>
              {editedOptions.map((opt, i) => (
                <Box
                  key={i}
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                >
                  <TextField
                    fullWidth
                    value={opt}
                    onChange={(e) => {
                      const newOpts = [...editedOptions];
                      const newValue = e.target.value;

                      newOpts[i] = newValue;
                      setEditedOptions(newOpts);

                      if (editedAnswer === opt) {
                        setEditedAnswer(newValue);
                      }
                    }}
                  />
                  <Button
                    variant={editedAnswer === opt ? "contained" : "outlined"}
                    color="success"
                    sx={{ mx: 1 }}
                    onClick={() => setEditedAnswer(opt)}
                  >
                    صحيحة
                  </Button>
                </Box>
              ))}
              <Button
                variant="outlined"
                onClick={() => setEditedOptions([...editedOptions, ""])}
                sx={{ mt: 1 }}
              >
                إضافة خيار
              </Button>
            </>
          )}
          {currentQuestion && currentQuestion.type === "editorial" && (
            <TextField
              fullWidth
              multiline
              minRows={2}
              label="الإجابة"
              value={editedAnswer}
              onChange={(e) => setEditedAnswer(e.target.value)}
              sx={{ mt: 2 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>إلغاء</Button>
          <Button variant="contained" onClick={handleSaveUnified}>
            حفظ
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WorksheetDetails;
