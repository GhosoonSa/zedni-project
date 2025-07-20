import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Box,
  IconButton,
  Grow,
  DialogActions,
  DialogTitle,
  DialogContent,
  Dialog,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const SubjectsTab = (props) => {
  const [teachers, setTeachers] = useState([]);

  const [subjects, setSubjects] = useState([]);

  const [newSubject, setNewSubject] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const authToken = localStorage.getItem("authToken");
  const courseID = props.courseId;
  const level = props.level;

  //fetch teachers names to add a subject
  const handleAddOpen = async () => {
    setOpenAddDialog(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/admin/getTeachers",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ` + authToken,
            ContentType: "application/json",
          },
        }
      );
      setTeachers(response.data.teachers);
    } catch (error) {
      console.error("Error getting teachers :", error);
    }
  };

  const handleAddSubject = async () => {
    try {
      const formData = new FormData();
      formData.append("subjectName", newSubject);
      formData.append("teacherID", selectedTeacher);
      formData.append("courseID", courseID);
      formData.append("levelName", level);
      const response = await axios.post(
        "http://localhost:8000/api/admin/addSubject",
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ` + authToken,
            ContentType: "application/json",
          },
        }
      );
      console.log("success add " + response.data.message);
      if (newSubject.trim() && selectedTeacher) {
        const newSubjectObj = {
          id: Date.now(),
          name: newSubject,
          teacher: selectedTeacher,
          syllabus: null,
        };
        setSubjects([...subjects, newSubjectObj]);
        handleCloseDialog();
      }
    } catch (error) {
      console.error("Error adding subject :", error);
    }
  };

  useEffect(() => {
    const fetchsubjects = async () => {
      try {
        console.log(courseID + " " + level);
        const response = await axios.get(
          `http://localhost:8000/api/admin/getSubjectDetails/${courseID}/${level}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ` + authToken,
              ContentType: "application/json",
            },
          }
        );
        setSubjects(response.data.subjects);
        console.log(response.data.subjects);
      } catch (error) {
        console.error("Error getting subjects :", error);
      }
    };
    fetchsubjects();
  }, [authToken]);

  const handleFileUpload = (subjectId, event) => {
    const file = event.target.files[0];
    if (file) {
      setSubjects(
        subjects.map((subject) =>
          subject.id === subjectId
            ? { ...subject, syllabus: file.name }
            : subject
        )
      );
      if (selectedSubject && selectedSubject.id === subjectId) {
        setSelectedSubject({ ...selectedSubject, syllabus: file.name });
      }
    }
  };

  const handleSelectSubject = (subjectId) => {
    const subject = subjects.find((s) => s.id === subjectId);
    setSelectedSubject(subject);
  };

  const handleCloseDialog = () => {
    setNewSubject("");
    setSelectedTeacher("");
    setOpenAddDialog(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      {}
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddOpen}
          sx={{
            backgroundColor: "#5a3e1b",
            "&:hover": { backgroundColor: "#7b3f00" },
          }}
        >
          إضافة مادة
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          py: 2,
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#E7BC91",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f8f4e9",
          },
        }}
      >
        {subjects.map((subject, index) => (
          <Box
            key={subject.id}
            sx={{
              minWidth: { xs: "45%", sm: "30%", md: "22%" },
              flexShrink: 0,
            }}
          >
            <Grow in={true} timeout={index * 200}>
              <Card
                onClick={() => handleSelectSubject(subject.id)}
                sx={{
                  backgroundColor:
                    selectedSubject?.id === subject.id ? "#f8f4e9" : "#fffaf5",
                  border:
                    selectedSubject?.id === subject.id
                      ? "2px solid #E7BC91"
                      : "1px solid #e0d6c2",
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    borderColor: "#E7BC91",
                  },
                  cursor: "pointer",
                  mb: 2,
                  height: "100%",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      fontSize: "1rem",
                    }}
                  >
                    {subject.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grow>
          </Box>
        ))}
      </Box>

      {selectedSubject && (
        <Box
          sx={{
            mt: 3,
            width: "100%",
            border: "2px solid #E7BC91",
            borderRadius: 2,
            backgroundColor: "#fffaf5",
            p: 3,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: "#5a3e1b" }}>
              الأستاذ: {selectedSubject.teacher}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                color: "#5a3e1b",
              }}
            >
              المنهاج:
            </Typography>

            {selectedSubject.syllabus ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f8f4e9",
                  p: 2,
                  borderRadius: 1,
                  gap: 2,
                  width: "100%",
                  position: "relative",
                }}
              >
                <DescriptionIcon color="primary" sx={{ fontSize: "2rem" }} />
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                      pr: 4,
                    }}
                  >
                    {selectedSubject.syllabus}
                  </Typography>
                </Box>
                {}
                <IconButton
                  component="label"
                  sx={{
                    position: "absolute",
                    left: 8,
                    top: 8,
                    color: "#5a3e1b",
                    "&:hover": { backgroundColor: "rgba(90, 62, 27, 0.1)" },
                  }}
                >
                  <EditIcon />
                  <input
                    accept=".pdf"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileUpload(selectedSubject.id, e)}
                  />
                </IconButton>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  alignItems: "flex-start",
                }}
              >
                <Typography variant="body1">
                  لا يوجد منهاج مرفوع حالياً
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<UploadIcon />}
                  component="label"
                  sx={{
                    backgroundColor: "#5a3e1b",
                    color: "white",
                    "&:hover": { backgroundColor: "#7b3f00" },
                    px: 3,
                    py: 1,
                  }}
                >
                  رفع المنهاج
                  <input
                    accept=".pdf"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileUpload(selectedSubject.id, e)}
                  />
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}

      <Dialog
        open={openAddDialog}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseDialog();
          }
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            backgroundColor: "#f8f4e9",
            borderBottom: "1px solid #E7BC91",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            إضافة مادة جديدة
          </Typography>
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            py: 3,
            backgroundColor: "#fffaf5",
            "& .MuiTextField-root": { mt: 2 },
          }}
        >
          <TextField
            fullWidth
            label="اسم المادة"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            select
            fullWidth
            label="اختر الأستاذ"
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 300,
                    overflow: "auto",
                  },
                },
              },
            }}
          >
            {teachers.map((teacher) => (
              <MenuItem key={teacher.id} value={teacher.id}>
                {teacher.firstAndLastName}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>

        <DialogActions
          sx={{
            backgroundColor: "#f8f4e9",
            borderTop: "1px solid #E7BC91",
            px: 3,
            py: 2,
          }}
        >
          <Button onClick={handleCloseDialog} sx={{ color: "#5a3e1b" }}>
            إلغاء
          </Button>
          <Button
            onClick={handleAddSubject}
            disabled={!newSubject || !selectedTeacher}
            variant="contained"
            sx={{
              backgroundColor: "#5a3e1b",
              "&:hover": { backgroundColor: "#7b3f00" },
              "&:disabled": { backgroundColor: "#e0d6c2" },
            }}
          >
            حفظ
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubjectsTab;
