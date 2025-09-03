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
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useParams, useNavigate } from "react-router-dom";
import { Axios } from "../../Api/axios";
import {
  GETWORKSHEETWITHANSWERSSTUDENT,
  SUBMITANSWERSSTUDENT,
} from "../../Api/api";
import StudentHeader from "../Components/StudentHeader";

const SubmitAnswersStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [worksheet, setWorksheet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [conflicts, setConflicts] = useState([]);

  useEffect(() => {
    setLoading(true);
    Axios.get(`${GETWORKSHEETWITHANSWERSSTUDENT}/${id}`)
      .then((res) => {
        const unansweredQuestions = res.data.worksheet.questions.filter(
          (q) => !q.answer || q.answer.length === 0
        );

        setWorksheet({ ...res.data.worksheet, questions: unansweredQuestions });

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
      await Axios.post(`${SUBMITANSWERSSTUDENT}`, payload);
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

  if (loading)
    return (
      <Typography align="center" sx={{ mt: 10 }}>
        جاري التحميل...
      </Typography>
    );

  if (!worksheet)
    return (
      <Typography align="center" sx={{ mt: 10 }}>
        لا توجد بيانات لعرضها.
      </Typography>
    );

  if (worksheet.questions.length === 0)
    return (
      <>
        <StudentHeader />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="70vh"
        >
          <Paper
            elevation={3}
            sx={{
              p: 5,
              textAlign: "center",
              backgroundColor: "#f9fff9",
              borderRadius: 4,
              maxWidth: 400,
            }}
          >
            <CheckCircleOutlineIcon
              sx={{ fontSize: 60, color: "green", mb: 2 }}
            />
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              أحسنت!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              لقد أجبت على كل الأسئلة بالفعل 🎉
            </Typography>
          </Paper>
        </Box>
      </>
    );

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
          borderRadius: 4,
          maxWidth: 1000,
        }}
      >
        <Typography
          variant="h4"
          mb={4}
          sx={{ fontWeight: "bold", textAlign: "center", color: "#5d4037" }}
        >
          حل ورقة العمل : {worksheet.name}
        </Typography>

        <Box display="flex" flexDirection="column" gap={3}>
          {worksheet.questions.map((q, index) => {
            const isConflict = conflicts.some((c) => c.questionID === q.id);

            return (
              <Card
                key={q.id}
                elevation={4}
                sx={{
                  borderRadius: 3,
                  backgroundColor: isConflict ? "#ffe9e6" : "#ffffff",
                  border: isConflict ? "1px solid #d84315" : "1px solid #eee",
                }}
              >
                <CardContent>
                  {/* عنوان السؤال */}
                  <Box display="flex" alignItems="center" mb={2}>
                    <HelpOutlineIcon sx={{ color: "#6d4c41", mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      السؤال {index + 1}: {q.question}
                    </Typography>
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  {/* نوع السؤال */}
                  {q.type === "editorial" ? (
                    <TextField
                      fullWidth
                      multiline
                      minRows={3}
                      placeholder="اكتب إجابتك هنا..."
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
                          sx={{ my: 0.5 }}
                        />
                      ))}
                    </RadioGroup>
                  )}

                  {isConflict && (
                    <Typography variant="caption" color="error" mt={1}>
                      ⚠️ لديك إجابة موجودة مسبقًا، يمكنك تعديلها هنا.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </Box>

        <Box textAlign="center" mt={5}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#5D4037", // برتقالي
              "&:hover": { backgroundColor: "#e64a19" }, // عند التمرير
              px: 5,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderRadius: 3,
            }}
          >
            رفع الإجابات
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default SubmitAnswersStudent;
