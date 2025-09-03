import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useParams, useNavigate } from "react-router-dom";
import TeacherHeader from "../Components/TeacherHeader";
import { Axios } from "../../Api/axios";
import { ADDQUESTION } from "../../Api/api";

const AddQuestion = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [questions, setQuestions] = useState([
    { type: "editorial", question: "", options: [""] },
  ]);
  const [error, setError] = useState("");

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { type: "editorial", question: "", options: [""] },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const removeOption = (qIndex, optIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.splice(optIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const q of questions) {
        if (!q.question.trim()) {
          setError("يرجى إدخال نص السؤال");
          return;
        }
        if (
          q.type === "automation" &&
          q.options.filter((o) => o.trim() !== "").length < 2
        ) {
          setError("يجب إضافة خيارين على الأقل للسؤال الاختياري");
          return;
        }

        const payload = {
          worksheetID: id,
          question: q.question,
          type: q.type,
          options:
            q.type === "automation"
              ? q.options.filter((o) => o.trim() !== "")
              : undefined,
        };

        await Axios.post(`${ADDQUESTION}`, payload);
      }

      navigate(-1);
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء إضافة السؤال");
    }
  };

  return (
    <div>
      <TeacherHeader />
      <Paper
        elevation={3}
        sx={{
          my: 15,
          py: 4,
          px: 4,
          direction: "rtl",
          backgroundColor: "#fffaf5",
          mx: 5,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
          إضافة سؤال جديد
        </Typography>

        <form onSubmit={handleSubmit}>
          {questions.map((q, index) => (
            <Box
              key={index}
              sx={{
                mb: 4,
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Select
                  value={q.type}
                  onChange={(e) =>
                    handleQuestionChange(index, "type", e.target.value)
                  }
                >
                  <MenuItem value="editorial">تحريري</MenuItem>
                  <MenuItem value="automation">اختياري</MenuItem>
                </Select>

                <TextField
                  fullWidth
                  value={q.question}
                  onChange={(e) =>
                    handleQuestionChange(index, "question", e.target.value)
                  }
                  placeholder={`السؤال ${index + 1}`}
                />

                <IconButton
                  color="error"
                  onClick={() => handleRemoveQuestion(index)}
                  disabled={questions.length === 1}
                >
                  <RemoveIcon />
                </IconButton>
              </Box>

              {q.type === "automation" && (
                <Box>
                  <Typography>الخيارات:</Typography>
                  {q.options.map((opt, optIndex) => (
                    <Box key={optIndex} sx={{ display: "flex", gap: 1, mb: 1 }}>
                      <TextField
                        fullWidth
                        value={opt}
                        onChange={(e) =>
                          handleOptionChange(index, optIndex, e.target.value)
                        }
                        placeholder={`الخيار ${optIndex + 1}`}
                      />
                      <IconButton
                        color="error"
                        onClick={() => removeOption(index, optIndex)}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    onClick={() => addOption(index)}
                    startIcon={<AddIcon />}
                    variant="outlined"
                  >
                    إضافة خيار
                  </Button>
                </Box>
              )}
            </Box>
          ))}

          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddQuestion}
            sx={{
              mb: 3,
              backgroundColor: "#e7bc91",
              color: "black",
              borderColor: "gray",
              "&:hover": { borderColor: "black" },
            }}
          >
            إضافة سؤال
          </Button>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Box>
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#e7bc91",
                color: "black",
                "&:hover": { backgroundColor: "#d49a6a" },
              }}
            >
              حفظ
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default AddQuestion;
