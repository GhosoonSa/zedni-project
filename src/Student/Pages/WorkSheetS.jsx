import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Axios } from "../../Api/axios";
import {
  ADDQUESTION,
  DELETEWORKSHEET,
  GETWORKSHEETBYID,
  GETWORKSHEETSSTUDENT,
} from "../../Api/api";
import { useNavigate, useParams } from "react-router-dom";
import StudentHeader from "../Components/StudentHeader";
import { userContext } from "../../Auth/ContextProvider";

const WorksheetsStudents = () => {
  const [error, setError] = useState("");
  const [worksheets, setWorksheets] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentWorksheetId, setCurrentWorksheetId] = useState(null);
  const [questionType, setQuestionType] = useState("editorial");
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([""]);
  const navigate = useNavigate();
  const { id } = useParams(); // id المادة

  // useEffect لتحميل أوراق العمل مباشرة عند أول تحميل الصفحة
  useEffect(() => {
    if (id) {
      setSelectedSubject(id);
      setLoading(true);
      Axios.get(`${GETWORKSHEETSSTUDENT}/${id}`)
        .then((res) => {
          setWorksheets(res.data.worksheets || []);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleDetails = (worksheetId) => {
    navigate(`/worksheetS/${worksheetId}`);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setQuestionType("editorial");
    setQuestionText("");
    setOptions([""]);
  };

  const addOption = () => setOptions([...options, ""]);
  const removeOption = (index) => {
    if (options.length === 1) return;
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };
  const handleOptionChange = (index, value) => {
    setError("");
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSaveQuestion = () => {
    if (!questionText.trim()) {
      alert("يرجى إدخال نص السؤال");
      return;
    }
    if (
      questionType !== "editorial" &&
      options.filter((o) => o.trim() !== "").length < 2
    ) {
      setError("يجب إضافة خيارين على الأقل");
      return;
    }

    const payload = {
      worksheetID: currentWorksheetId,
      question: questionText.trim(),
      type: questionType,
      options:
        questionType === "automation"
          ? options.filter((o) => o.trim() !== "")
          : undefined,
    };

    Axios.post(`${ADDQUESTION}`, payload)
      .then(() => handleDialogClose())
      .catch((err) => {
        console.error(err);
        alert("حدث خطأ أثناء إضافة السؤال");
      });
  };

  return (
    <div>
      <StudentHeader />
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4">أوراق العمل</Typography>
        </Box>

        <Box>
          {loading ? (
            <Typography>جاري التحميل...</Typography>
          ) : worksheets.length > 0 ? (
            <TableContainer component={Paper}>
              <Table sx={{ direction: "rtl" }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">رقم</TableCell>
                    <TableCell align="center">اسم الورقة</TableCell>
                    <TableCell align="center">الإجراء</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {worksheets.map((ws, index) => (
                    <TableRow key={ws.id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{ws.worksheetName}</TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            variant="outlined"
                            onClick={() => handleDetails(ws.id)}
                          >
                            تفاصيل
                          </Button>
                          <Button
                            variant="outlined"
                            color="success"
                            onClick={() => navigate(`/SubmitAnswersS/${ws.id}`)}
                          >
                            حل ورقة العمل
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography sx={{ mt: 2 }}>
              لا توجد أوراق عمل لهذه المادة.
            </Typography>
          )}
        </Box>

        {/* Dialog لإضافة سؤال جديد كما في السابق */}
      </Paper>
    </div>
  );
};

export default WorksheetsStudents;
