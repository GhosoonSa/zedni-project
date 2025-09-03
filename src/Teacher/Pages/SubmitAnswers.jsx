import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { Axios } from "../../Api/axios";
import { GETWORKSHEETWITHANSWERS, SUBMITANSWERS } from "../../Api/api";
import TeacherHeader from "../Components/TeacherHeader";

const SubmitAnswers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [worksheet, setWorksheet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [conflicts, setConflicts] = useState([]);

  useEffect(() => {
    setLoading(true);
    Axios.get(`${GETWORKSHEETWITHANSWERS}/${id}`)
      .then((res) => {
        const worksheetData = res.data.worksheet;

        // فلترة الأسئلة التي ليس لها إجابة
        const unansweredQuestions = worksheetData.questions.filter(
          (q) => !q.answer || q.answer.length === 0
        );

        setWorksheet({ ...worksheetData, questions: unansweredQuestions });

        const initialAnswers = {};
        unansweredQuestions.forEach((q) => {
          initialAnswers[q.id] = "";
        });
        setAnswers(initialAnswers);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (questionID, value) => {
    setAnswers({ ...answers, [questionID]: value });
  };

  const handleSubmit = async () => {
    const payload = {
      answers: Object.keys(answers).map((questionID) => ({
        questionID: parseInt(questionID),
        answer: answers[questionID],
      })),
    };

    try {
      await Axios.post(`${SUBMITANSWERS}`, payload);
      alert("تم رفع الإجابات بنجاح!");
      navigate(-1);
    } catch (err) {
      if (err.response?.data?.error_code === "answers_exist") {
        setConflicts(err.response.data.conflicts);
      } else {
        console.error(err);
        alert("حدث خطأ أثناء رفع الإجابات");
      }
    }
  };

  if (loading) return <Typography>جاري التحميل...</Typography>;
  if (!worksheet) return <Typography>لا توجد بيانات لعرضها.</Typography>;

  // إذا جميع الأسئلة تمت الإجابة عنها
  if (worksheet?.questions.length === 0) {
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
          }}
        >
          <Typography variant="h4" mb={3}>
            لقد قمت برفع جميع الإجابات مسبقًا لهذه الورقة: {worksheet.name}
          </Typography>
        </Paper>
      </>
    );
  }

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
        }}
      >
        <Typography variant="h4" mb={3}>
          رفع الإجابات لورقة العمل: {worksheet.name}
        </Typography>

        {worksheet.questions.map((q, index) => {
          const isConflict = conflicts.some((c) => c.questionID === q.id);
          return (
            <Box
              key={q.id}
              sx={{
                mb: 4,
                p: 2,
                border: "1px solid",
                borderColor: isConflict ? "#d84315" : "#ccc",
                borderRadius: 2,
                backgroundColor: isConflict ? "#ffe9e6" : "#fffaf5",
              }}
            >
              <Typography variant="body1" mb={1}>
                السؤال {index + 1}: {q.question}
              </Typography>

              {q.type === "editorial" ? (
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  value={answers[q.id]}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                />
              ) : (
                <RadioGroup
                  value={answers[q.id]}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                >
                  {q.options.map((opt, i) => (
                    <FormControlLabel
                      key={i}
                      value={opt}
                      control={<Radio />}
                      label={opt}
                    />
                  ))}
                </RadioGroup>
              )}

              {isConflict && (
                <Typography variant="caption" color="error">
                  لديك إجابة موجودة مسبقًا، يمكنك تعديلها هنا.
                </Typography>
              )}
            </Box>
          );
        })}

        <Button variant="contained" onClick={handleSubmit}>
          رفع الإجابات
        </Button>
      </Paper>
    </>
  );
};

export default SubmitAnswers;
