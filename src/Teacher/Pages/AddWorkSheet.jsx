import React, { useEffect, useState } from "react";
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
import TeacherHeader from "../Components/TeacherHeader";
import { ADDWORKSHEET, ALLSUBJECTS } from "../../Api/api";
import { Axios } from "../../Api/axios";
import { useNavigate, useParams } from "react-router-dom";

//hi
const AddWorksheet = () => {
  const subjects = [
    { id: 1, name: "فقه" },
    { id: 4, name: "تفسير" },
    { id: 3, name: "حدديث" },
  ];
  const { subjectId } = useParams(); // id المادة المرسلة من الصفحة السابقة
  const navigate = useNavigate();
  const [subject, setSubject] = useState(subjectId || ""); // اجعل القيمة الافتراضية subjectId
  const [allSubjects, setAllSubjects] = useState([]);
  const [error, setError] = useState("");
  const [worksheetName, setWorksheetName] = useState("");
  const [questions, setQuestions] = useState([
    { type: "editorial", question: "", options: [] },
  ]);

  //getSubjects
  useEffect(() => {
    Axios.get(`${ALLSUBJECTS}`)
      .then((data) => console.log(data.data.data))
      .catch((error) => console.log(error));
  }, []);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { type: "editorial", question: "", options: [] },
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

  const addOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push("");
    setQuestions(updatedQuestions);
  };

  const removeOption = (qIndex, optIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.splice(optIndex, 1);
    setQuestions(updatedQuestions);
  };
  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      subjectID: subject,
      worksheetName,
      questions: questions.map((q) => {
        const formatted = {
          type: q.type,
          question: q.question,
        };
        if (q.type === "automation") {
          formatted.options = q.options;
        }
        return formatted;
      }),
    };
    try {
      const res = await Axios.post(`${ADDWORKSHEET}`, payload);
      console.log(res);
      if (res.status === 201) {
        navigate(`/Worksheets/${subject}`); // العودة مباشرة إلى أوراق العمل الخاصة بالمادة
      }
    } catch (error) {
      if (error.response && error.response.status === 422)
        setError("  اسم ورقة العمل موجود مسبقاّ");
      console.log(error);
    }
  }

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
          إضافة ورقة عمل
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <Typography>اسم ورقة العمل</Typography>
            <TextField
              fullWidth
              value={worksheetName}
              onChange={(e) => setWorksheetName(e.target.value)}
              placeholder="أدخل اسم الورقة"
              error={Boolean(error)}
              helperText={error}
            />
          </Box>

          <Typography sx={{ mb: 2 }}>الأسئلة</Typography>

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
              "&:hover": {
                borderColor: "black",
              },
            }}
          >
            إضافة سؤال
          </Button>

          <Box>
            <Button
              variant="outlined"
              type="submit"
              sx={{
                mb: 3,
                backgroundColor: "#e7bc91",
                color: "black",
                borderColor: "gray",
                "&:hover": {
                  borderColor: "black",
                },
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

export default AddWorksheet;
