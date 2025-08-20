import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  List,
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

  useEffect(() => {
    setLoading(true);
    Axios.get(`${GETWORKSHEETWITHANSWERS}/${id}`)
      .then((res) => {
        setWorksheet(res.data.worksheet);
      })
      .catch((err) => {
        console.error(err);
        setWorksheet(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // فتح dialog التعديل
  const handleEditClick = (question) => {
    setCurrentQuestion(question);
    setEditedQuestion(question.question);
    setEditedOptions(question.options ? [...question.options] : []);
    setEditOpen(true);
  };

  // حذف السؤال
  const handleDelete = (questionID) => {
    Axios.delete(`${DELETEQUESTION}/${questionID}`)
      .then(() => {
        setWorksheet((prev) => ({
          ...prev,
          questions: prev.questions.filter((q) => q.id !== questionID),
        }));
      })
      .catch((err) => console.error("Error deleting question:", err));
  };

  return (
    <>
      <TeacherHeader />
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
        <Typography variant="h4" gutterBottom>
          تفاصيل ورقة العمل
        </Typography>

        {loading && <Typography>جاري التحميل...</Typography>}

        {!loading && worksheet ? (
          <>
            <Typography variant="h5" mb={3}>
              اسم ورقة العمل: {worksheet.name}
            </Typography>

            {worksheet.questions?.length > 0 ? (
              <List>
                {worksheet.questions.map((q, index) => (
                  <Box
                    key={q.id}
                    sx={{
                      mb: 3,
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: "#fff4e5",
                      border: "1px solid #e7bc91",
                    }}
                  >
                    <Typography fontWeight="bold" mb={1}>
                      السؤال {index + 1} : {q.question} ({" "}
                      {q.type === "editorial" ? "تحريري" : "اختياري"})
                    </Typography>

                    {q.options?.length > 0 && (
                      <Typography mb={1} sx={{ color: "#555" }}>
                        الاختيارات: {q.options.join(", ")}
                      </Typography>
                    )}

                    <Typography sx={{ color: "#000" }}>
                      الإجابة: {q.answer?.map((a) => a.answer).join(", ")}
                    </Typography>

                    <Box mt={1}>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mr: 1 }}
                        onClick={() => handleEditClick(q)}
                      >
                        تعديل
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(q.id)}
                      >
                        حذف
                      </Button>
                    </Box>
                  </Box>
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

      {/* Dialog التعديل */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
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

          {currentQuestion && currentQuestion.type !== "editorial" && (
            <>
              <Typography variant="subtitle1" mb={1}>
                الخيارات:
              </Typography>
              {editedOptions.map((opt, idx) => (
                <Box
                  key={idx}
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                >
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
                      setEditedOptions(
                        editedOptions.filter((_, i) => i !== idx)
                      )
                    }
                    sx={{ ml: 1 }}
                  >
                    حذف
                  </Button>
                </Box>
              ))}

              <Button
                variant="outlined"
                onClick={() => setEditedOptions([...editedOptions, ""])}
              >
                إضافة خيار
              </Button>
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>إلغاء</Button>
          <Button
            variant="contained"
            onClick={() => {
              const filteredOptions = editedOptions.filter(
                (o) => o.trim() !== ""
              );

              const payload = {
                questionID: currentQuestion.id,
                question: editedQuestion,
                type: currentQuestion.type,
                ...(filteredOptions.length > 0 && { options: filteredOptions }),
              };

              Axios.put(`${EDITQUESTION}`, payload)
                .then((res) => {
                  setWorksheet((prev) => ({
                    ...prev,
                    questions: prev.questions.map((q) =>
                      q.id === currentQuestion.id ? res.data.question : q
                    ),
                  }));
                  setEditOpen(false);
                  navigate(`/worksheets/${worksheet.id}`);
                })
                .catch((err) =>
                  console.error(
                    "Error updating question:",
                    err.response?.data || err
                  )
                );
            }}
          >
            حفظ
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WorksheetDetails;
