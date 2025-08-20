import React, { useState } from "react";
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
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TeacherHeader from "../Components/TeacherHeader";
import { Axios } from "../../Api/axios";
import { ADDQUESTION, DELETEWORKSHEET, GETWORKSHEETBYID } from "../../Api/api";
import { useNavigate } from "react-router-dom";

const WorksheetsBySubject = () => {
  const subjects = [
    { id: 1, name: "فقه" },
    { id: 2, name: "تفسير" },
    { id: 3, name: "حديث" },
  ];

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

  const fetchWorksheets = (subjectId) => {
    setSelectedSubject(subjectId);
    setLoading(true);
    Axios.get(`${GETWORKSHEETBYID}/${subjectId}`)
      .then((res) => {
        setWorksheets(res.data.worksheets || []);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  //handle Delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${DELETEWORKSHEET}/${id}`);
      setWorksheets((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }
  const handleDetails = (id) => {
    navigate(`/worksheets/${id}`);
  };

  const handleAddQuestionClick = (worksheetId) => {
    console.log(worksheetId);
    setCurrentWorksheetId(worksheetId);
    setDialogOpen(true);
  };
  //hiiiiii
  const handleDialogClose = () => {
    setDialogOpen(false);
    setQuestionType("editorial");
    setQuestionText("");
    setOptions([""]);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

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
    console.log(questionType);
    if (!questionText.trim()) {
      alert("يرجى إدخال نص السؤال");
      return;
    }

    if (
      questionType !== "editorial" &&
      options.filter((o) => o.trim() !== "").length < 2
    ) {
      setError("يجب إضافة خيارين على الأقل");
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
    if (error === "") {
      Axios.post(`${ADDQUESTION}`, payload)
        .then((res) => {
          handleDialogClose();
          setError("");
        })
        .catch((err) => {
          console.error(err);
          alert("حدث خطأ أثناء إضافة السؤال");
        });
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",

            mb: 3,
          }}
        >
          <Typography variant="h4">أوراق العمل</Typography>
          <Button
            variant="outlined"
            sx={{
              mb: 3,
              backgroundColor: "#e7bc91",
              color: "black",
              borderColor: "gray",
              "&:hover": {
                borderColor: "black",
              },
            }}
            onClick={() => navigate("/AddWorkSheetT")}
          >
            إضافة ورقة عمل
          </Button>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography>اختر المادة</Typography>
          <Select
            fullWidth
            value={selectedSubject || ""}
            onChange={(e) => {
              fetchWorksheets(e.target.value);
            }}
            displayEmpty
          >
            <MenuItem value="" disabled>
              اختر المادة
            </MenuItem>
            {subjects.map((subj) => (
              <MenuItem key={subj.id} value={subj.id}>
                {subj.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {selectedSubject && (
          <Box>
            <Typography variant="h5">
              أوراق العمل لمادة{" "}
              {subjects.find((s) => s.id === selectedSubject)?.name}
            </Typography>

            {loading ? (
              <Typography>جاري التحميل...</Typography>
            ) : worksheets.length > 0 ? (
              <TableContainer component={Paper}>
                <Table sx={{ direction: "rtl" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">رقم المعرف </TableCell>
                      <TableCell align="center">اسم ورقة العمل</TableCell>
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
                              onClick={() => handleAddQuestionClick(ws.id)}
                            >
                              إضافة سؤال
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => handleDelete(ws.id)}
                            >
                              حذف
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
        )}

        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          dir="rtl"
          fullWidth
        >
          <DialogTitle>إضافة سؤال جديد</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <Typography>نوع السؤال</Typography>
              <Select
                fullWidth
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                sx={{ mb: 3 }}
              >
                <MenuItem value="editorial">تحريري</MenuItem>
                <MenuItem value="automation">اختياري</MenuItem>
              </Select>

              <TextField
                fullWidth
                label="السؤال"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                sx={{ mb: 3 }}
              />

              {questionType === "automation" && (
                <Box>
                  <Typography>الخيارات</Typography>
                  {options.map((opt, index) => (
                    <Box key={index} sx={{ display: "flex", gap: 1, mb: 1 }}>
                      <TextField
                        fullWidth
                        value={opt}
                        error={Boolean(error)}
                        helperText={error}
                        onChange={(e) => {
                          handleOptionChange(index, e.target.value);
                        }}
                        placeholder={`الخيار ${index + 1}`}
                      />
                      <IconButton
                        color="error"
                        onClick={() => removeOption(index)}
                        disabled={options.length === 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={addOption}
                  >
                    إضافة خيار
                  </Button>
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>إلغاء</Button>
            <Button variant="contained" onClick={handleSaveQuestion}>
              حفظ
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
};

export default WorksheetsBySubject;
