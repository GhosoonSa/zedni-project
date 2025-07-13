import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Grid,
  Grow,
  Paper,
  Snackbar,
  Alert,
  Collapse,
  IconButton
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import ResultsTable from "./ResultsTable";

const SubAdminResultsTab = () => {
  const subjects = [
    { id: 1, name: "الفقه" },
    { id: 2, name: "السيرة" },
    { id: 3, name: "التفسير" },
    { id: 4, name: "الحديث" },
  ];

  const students = [
    { id: 1, name: "أحمد" },
    { id: 2, name: "سارة" },
    { id: 3, name: "عبدالله" },
    { id: 4, name: "بيان" },
    { id: 5, name: "نور" },

  ];

  // بيانات تجريبية كاملة
  const initialMarks = {
    study: { 1: 25, 2: 28, 3: 20, 4: 30, 5: 30 },    // علامات المذاكرة (من 30)
    exam: { 1: 40, 2: 45, 3: 35, 4: 50, 5: 22 },     // علامات الامتحان (من 50)
    attendance: { 1: 15, 2: 18, 3: 12, 4: 20, 5: 10 }, // علامات الحضور (من 20)
    total: { 1: 44, 2: 33, 3: 67, 4: 100, 5: 60 },    // المجموع الكلي (من 100)
    status: { 1: "راسب", 2: "راسب", 3: "راسب", 4: "ناجح", 5: "ناجح" } // النتيجة
  };

  // حالة التطبيق
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [marks, setMarks] = useState(initialMarks);
  const [activeView, setActiveView] = useState(null);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // إغلاق التنبيه
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // تهيئة العلامات
  const initializeMarks = () => {
    const newMarks = { ...marks };
    students.forEach(student => {
      if (!newMarks.study[student.id]) newMarks.study[student.id] = "";
      if (!newMarks.exam[student.id]) newMarks.exam[student.id] = "";
    });
    setMarks(newMarks);
    setErrors({});
  };

  // تغيير العلامات
  const handleMarkChange = (studentId, value, type) => {
    const maxValue = type === 'study' ? 30 : 50;
    const numValue = value === "" ? "" : Math.min(maxValue, Math.max(0, parseFloat(value) || 0));

    setMarks(prev => ({
      ...prev,
      [type]: { ...prev[type], [studentId]: numValue }
    }));

    if (errors[`${type}-${studentId}`]) {
      const newErrors = { ...errors };
      delete newErrors[`${type}-${studentId}`];
      setErrors(newErrors);
    }
  };

  // التحقق من صحة البيانات
  const validateMarks = () => {
    const newErrors = {};
    let isValid = true;

    if (activeView === 'study' || activeView === 'exam') {
      const maxValue = activeView === 'study' ? 30 : 50;
      students.forEach(student => {
        const mark = marks[activeView][student.id];
        if (mark === "" || mark === undefined) {
          newErrors[`${activeView}-${student.id}`] = "يجب إدخال العلامة";
          isValid = false;
        } else if (mark < 0 || mark > maxValue) {
          newErrors[`${activeView}-${student.id}`] = `يجب أن تكون العلامة بين 0 و ${maxValue}`;
          isValid = false;
        }
      });
    }

    setErrors(newErrors);
    return isValid;
  };

  // إرسال البيانات (محاكاة بدون رفع حقيقي)
  const handleSubmit = () => {
    if (!validateMarks()) {
      setSnackbar({
        open: true,
        message: "يوجد أخطاء في البيانات المدخلة، الرجاء التأكد من العلامات",
        severity: "error"
      });
      return;
    }

    // هنا سيتم لاحقًا استدعاء API للباك إند
    console.log("بيانات جاهزة للإرسال للباك إند:", {
      study: marks.study,
      exam: marks.exam
    });

    // محاكاة لحفظ البيانات محليًا
    setSnackbar({
      open: true,
      message: "تم حفظ العلامات بنجاح",
      severity: "success"
    });
  };

  // عرض قائمة المواد
  const renderSubjects = () => (
    <Box sx={{
      display: "flex",
      overflowX: "auto",
      gap: 2,
      py: 2,
      "&::-webkit-scrollbar": { height: "8px" },
      "&::-webkit-scrollbar-thumb": { backgroundColor: "#E7BC91", borderRadius: "4px" },
      "&::-webkit-scrollbar-track": { backgroundColor: "#f8f4e9" },
    }}>
      {subjects.map((subject, index) => (
        <Box key={subject.id} sx={{ minWidth: "22%", flexShrink: 0 }}>
          <Grow in={true} timeout={index * 200}>
            <Card
              onClick={() => {
                setSelectedSubject(subject);
                initializeMarks();
                setActiveView(null);
              }}
              sx={{
                backgroundColor: selectedSubject?.id === subject.id ? "#f8f4e9" : "#fffaf5",
                border: selectedSubject?.id === subject.id ? "2px solid #E7BC91" : "1px solid #e0d6c2",
                borderRadius: 2,
                boxShadow: 3,
                transition: "all 0.3s ease",
                "&:hover": { transform: "translateY(-5px)", borderColor: "#E7BC91" },
                cursor: "pointer",
                height: "100%",
                minHeight: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center", fontSize: "1.1rem" }}>
                  {subject.name}
                </Typography>
              </CardContent>
            </Card>
          </Grow>
        </Box>
      ))}
    </Box>
  );

  // عرض أزرار التحكم
  const renderControlButtons = () => (
    <Box sx={{
      display: "flex",
      gap: 2,
      mt: 3,
      mb: 5,
      flexWrap: "wrap",
      justifyContent: "center"
    }}>
      <Button
        variant={activeView === 'study' ? "contained" : "outlined"}
        onClick={() => {
          setActiveView('study');
          initializeMarks();
        }}
        sx={{
          backgroundColor: activeView === 'study' ? "#5a3e1b" : "transparent",
          color: activeView === 'study' ? "white" : "#5a3e1b",
          borderColor: "#5a3e1b",
          minWidth: "180px",
          "&:hover": {
            backgroundColor: activeView === 'study' ? "#7b3f00" : "rgba(90, 62, 27, 0.1)"
          },
        }}
      >
        إدخال علامة مذاكرة (30)
      </Button>

      <Button
        variant={activeView === 'exam' ? "contained" : "outlined"}
        onClick={() => {
          setActiveView('exam');
          initializeMarks();
        }}
        sx={{
          backgroundColor: activeView === 'exam' ? "#5a3e1b" : "transparent",
          color: activeView === 'exam' ? "white" : "#5a3e1b",
          borderColor: "#5a3e1b",
          minWidth: "180px",
          "&:hover": {
            backgroundColor: activeView === 'exam' ? "#7b3f00" : "rgba(90, 62, 27, 0.1)"
          },
        }}
      >
        إدخال علامة امتحان (50)
      </Button>

      <Button
        variant={activeView === 'results' ? "contained" : "outlined"}
        onClick={() => {
          setActiveView('results');
          initializeMarks();
        }}
        sx={{
          backgroundColor: activeView === 'results' ? "#5a3e1b" : "transparent",
          color: activeView === 'results' ? "white" : "#5a3e1b",
          borderColor: "#5a3e1b",
          minWidth: "180px",
          "&:hover": {
            backgroundColor: activeView === 'results' ? "#7b3f00" : "rgba(90, 62, 27, 0.1)"
          },
        }}
      >
        عرض النتائج
      </Button>
    </Box>
  );

  // زر الحفظ 
  const renderSaveButton = () => {
    if (!activeView || activeView === 'results') return null;

    return (
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 3,
        position: 'relative',
      }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          startIcon={<SaveIcon />}
          sx={{
            backgroundColor: "#2E7D32",
            color: "white",
            minWidth: "220px",
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "8px",
            gap: 1,
            boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
            "&:hover": {
              backgroundColor: "#1B5E20",
              transform: "translateY(-2px)",
              boxShadow: "0 5px 8px rgba(0,0,0,0.3)"
            },
            transition: "all 0.3s ease",
          }}
        >
          حفظ العلامات
        </Button>

        {/* رسالة التنبيه */}
        <Box sx={{
          position: 'absolute',
          bottom: -35,
          width: '100%',
          display: 'flex',
          justifyContent: 'right'
        }}>
          <Collapse in={snackbar.open}>
            <Alert
              severity={snackbar.severity}
              sx={{
                width: '80%',
                boxShadow: 1,
                alignItems: 'center'
              }}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={handleCloseSnackbar}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {snackbar.message}
            </Alert>
          </Collapse>
        </Box>
      </Box>
    );
  };

  // عرض واجهة إدخال العلامات
  const renderMarksEntry = () => {
    if (!activeView || activeView === 'results') return null;

    const maxValue = activeView === 'study' ? 30 : 50;
    const label = activeView === 'study' ? `علامة المذاكرة (${maxValue})` : `علامة الامتحان (${maxValue})`;

    return (
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {students.map(student => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={student.id}>
            <Paper sx={{
              p: 2,
              border: "1px solid #e0d6c2",
              borderRadius: 2,
              backgroundColor: "#fffaf5",
              minHeight: "150px",
              minWidth: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <Box>
                <Typography variant="subtitle1" sx={{
                  fontWeight: "bold",
                  mb: 1,
                  fontSize: "0.95rem"
                }}>
                  {student.name}
                </Typography>

                {errors[`${activeView}-${student.id}`] && (
                  <Typography color="error" sx={{ fontSize: "0.8rem", mb: 1 }}>
                    {errors[`${activeView}-${student.id}`]}
                  </Typography>
                )}
              </Box>

              <TextField
                label={label}
                type="number"
                value={marks[activeView][student.id] || ""}
                onChange={(e) => handleMarkChange(student.id, e.target.value, activeView)}
                error={!!errors[`${activeView}-${student.id}`]}
                inputProps={{
                  min: 0,
                  max: maxValue,
                  step: "0.5",
                  style: {
                    MozAppearance: 'textfield',
                    WebkitAppearance: 'none',
                    margin: 0,
                    fontSize: "0.9rem"
                  }
                }}
                fullWidth
                size="small"
                sx={{
                  '& .MuiInputLabel-root': {
                    fontSize: "0.8rem",
                    transform: 'translate(14px, 9px) scale(1)',
                    '&.MuiInputLabel-shrink': {
                      transform: 'translate(14px, -9px) scale(0.75)'
                    }
                  },
                  '& input': {
                    fontSize: "0.9rem",
                    padding: "8.5px 14px"
                  },
                  '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
                    WebkitAppearance: 'none',
                    margin: 0
                  }
                }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      {renderSubjects()}

      {selectedSubject && (
        <>
          {renderControlButtons()}

          {activeView === 'results' && (
            <ResultsTable
              students={students}
              marks={marks}
            />
          )}

          {renderMarksEntry()}

          {renderSaveButton()}
        </>
      )}
    </Box>
  );
};

export default SubAdminResultsTab;