import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Divider,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TodayIcon from "@mui/icons-material/Today";
import {
  StyledTableRow,
  StyledTableCell,
  StyledTableHeadCell,
  ContentWrapper,
  themeColors,
} from "./StyledComponents";
import axios from "axios";

const isValidDate = (dateString) => {
  if (!dateString) return false;
  const parts = dateString.split("/");
  if (parts.length !== 3) return false;

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
  if (day < 1 || day > 31) return false;
  if (month < 1 || month > 12) return false;
  return true;
};

const AddClassPlanForm = ({ courseID, level, isSmallScreen }) => {
  const [lessonPlan, setLessonPlan] = useState([
    { date: "", subject: "", dailyPlan: "" },
  ]);
  const [fieldPlan, setFieldPlan] = useState({
    date: "",
    subject: "",
    dailyPlan: "",
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const authToken = localStorage.getItem("authToken");

  const handleDateClick = (index) => {
    const today = new Date();
    const formattedDate = `${today.getDate()}/${
      today.getMonth() + 1
    }/${today.getFullYear()}`;
    handleInputChange(index, "date", formattedDate);
  };

  const handleAddRow = () => {
    setLessonPlan([...lessonPlan, { date: "", subject: "", dailyPlan: "" }]);
  };

  const handleInputChange = (index, field, value, e) => {
    const updatedPlan = [...lessonPlan];
    updatedPlan[index][field] = value;
    setLessonPlan(updatedPlan);
    const { name, value: inputValue } = e.target;
    setFieldPlan({
      ...fieldPlan,
      [name]: inputValue,
    });

    if (field === "date") {
      const newErrors = { ...errors };
      if (!isValidDate(value)) {
        newErrors[`date_${index}`] = "تاريخ غير صحيح";
      } else {
        delete newErrors[`date_${index}`];
      }
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasErrors = Object.keys(errors).length > 0;
    const hasEmptyFields = lessonPlan.some(
      (plan) => !plan.date || !plan.subject || !plan.dailyPlan
    );

    if (hasErrors || hasEmptyFields) {
      if (hasEmptyFields) {
        alert("الرجاء ملئ جميع الحقول ");
      }
      return;
    }

    const newPlans = lessonPlan.map((plan) => ({
      ...plan,
      id: Date.now(),
      level: level,
    }));

    try {
      const formData = new FormData();
      formData.append("courseID", courseID);
      formData.append("levelName", level);
      formData.append("subjectName", fieldPlan.subject);
      formData.append("sessionDate", fieldPlan.date);
      formData.append("sessionContent", fieldPlan.dailyPlan);
      const response = await axios.post(
        `http://localhost:8000/api/admin/addCurriculumPlan`,
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
            ContentType: "application/json",
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error("save class plan error", error);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: isSmallScreen ? 2 : 3,
        mb: 4,
        bgcolor: themeColors.white,
        borderRadius: "12px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          textAlign: "right",
          color: themeColors.primary,
          fontWeight: "500",
          fontSize: isSmallScreen ? "1rem" : "1.1rem",
        }}
      >
        إضافة خطة درسية جديدة
      </Typography>
      <Divider sx={{ mb: 3, borderColor: themeColors.secondary }} />

      <form onSubmit={handleSubmit}>
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <TableContainer
            sx={{
              border: `1px solid ${themeColors.secondary}`,
              borderRadius: "10px",
              minWidth: isSmallScreen ? "650px" : "100%",
              display: "inline-block",
            }}
          >
            <Table sx={{ tableLayout: "fixed", minWidth: "100%" }}>
              <colgroup>
                <col style={{ width: isSmallScreen ? "140px" : "20%" }} />
                <col style={{ width: isSmallScreen ? "170px" : "25%" }} />
                <col style={{ width: isSmallScreen ? "380px" : "55%" }} />
              </colgroup>
              <TableHead>
                <TableRow>
                  <StyledTableHeadCell>التاريخ</StyledTableHeadCell>
                  <StyledTableHeadCell>المواد</StyledTableHeadCell>
                  <StyledTableHeadCell>المقرر اليومي</StyledTableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lessonPlan.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          onClick={() => handleDateClick(index)}
                          sx={{ color: themeColors.primary }}
                        >
                          <TodayIcon />
                        </IconButton>
                        <TextField
                          fullWidth
                          value={row.date}
                          name="date"
                          onChange={(e) =>
                            handleInputChange(index, "date", e.target.value, e)
                          }
                          placeholder="يوم/شهر/سنة"
                          required
                          error={!!errors[`date_${index}`]}
                          helperText={errors[`date_${index}`]}
                        />
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        fullWidth
                        value={row.subject}
                        name="subject"
                        onChange={(e) =>
                          handleInputChange(index, "subject", e.target.value, e)
                        }
                        required
                        multiline
                        minRows={2}
                        maxRows={4}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        fullWidth
                        value={row.dailyPlan}
                        name="dailyPlan"
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "dailyPlan",
                            e.target.value,
                            e
                          )
                        }
                        required
                        multiline
                        minRows={2}
                        maxRows={4}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddRow}
          >
            إضافة صف جديد
          </Button>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {showSuccess && (
              <Typography
                sx={{ color: themeColors.success, fontStyle: "italic" }}
              >
                تم حفظ الخطة بنجاح
              </Typography>
            )}
            <Button
              variant="contained"
              type="submit"
              sx={{ bgcolor: themeColors.primary }}
            >
              حفظ الخطة
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default AddClassPlanForm;
