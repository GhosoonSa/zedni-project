import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grow,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TeacherSubjectsTab = (props) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showSyllabus, setShowsyllabus] = useState(false);
  const authToken = localStorage.getItem("authToken");
  const courseID = props.courseId;
  const level = props.level;
  const [uploaded, setUploaded] = useState(false);
  const navigate = useNavigate();

  const fetchsubjects = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/teacher/getSubjectDetails/${courseID}/${level}`,
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

  useEffect(() => {
    fetchsubjects();
  }, [authToken, uploaded]);

  const handleAttachmentUpload = async (subjectId, event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("subjectID", subjectId);
    formData.append("extensionFile", file);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/teacher/addExtension",
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ` + authToken,
            ContentType: "application/json",
          },
        }
      );
      if (response.status === 201) {
        alert("تم إضافة الملحق بنجاح!");
        setUploaded(!uploaded);
        fetchsubjects();
      }
    } catch (error) {
      console.error("Error adding attachments :", error);
      alert("something went wrong: ", error);
    }
  };

  const handleDeleteExtension = async (exID) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/teacher/deleteExtension/${exID}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ` + authToken,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        alert("تم حذف الملحق بنجاح!");
        fetchsubjects();
      }
    } catch (error) {
      console.error("Error delete Ad :", error);
    }
  };

  const handleSelectSubject = (subjectId) => {
    const updatedSubjects = subjects.map((subject) => ({
      ...subject,
      showSyllabus: subject.id === subjectId ? subject.showSyllabus : false,
    }));
    setSubjects(updatedSubjects);

    const subject = subjects.find((s) => s.id === subjectId);
    setSelectedSubject(subject);
  };

  const handleShowSyllabus = (subjectId) => {
    const updatedSubjects = subjects.map((subject) => {
      if (subject.id === subjectId) {
        return {
          ...subject,
          showSyllabus: true,
        };
      }
      return subject;
    });
    setSubjects(updatedSubjects);

    if (selectedSubject?.id === subjectId) {
      setSelectedSubject({
        ...selectedSubject,
        showSyllabus: true,
      });
    }
    setShowsyllabus(true);
    console.log(showSyllabus);
  };

  return (
    <Box sx={{ p: 3 }}>
      {subjects.length === 0 ? (
        <Box
          sx={{
            py: 4,
            textAlign: "center",
            width: "100%",
          }}
        >
          <Typography variant="h6" color="textSecondary">
            لا يوجد مواد حالياً
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 2,
            py: 2,
            "&::-webkit-scrollbar": { height: "8px" },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#E7BC91",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-track": { backgroundColor: "#f8f4e9" },
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
                      selectedSubject?.id === subject.id
                        ? "#f8f4e9"
                        : "#fffaf5",
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
                      {subject.subjectName}
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Box>
          ))}
        </Box>
      )}

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
              الأستاذ: {selectedSubject.teacherName}
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", color: "#5a3e1b", mb: 1 }}
            >
              المنهاج:
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Button
                variant="contained"
                onClick={() => handleShowSyllabus(selectedSubject.id)}
                disabled={!selectedSubject.curriculumFile}
                sx={{
                  backgroundColor: "#5a3e1b",
                  color: "white",
                  "&:hover": { backgroundColor: "#7b3f00" },
                  "&:disabled": {
                    backgroundColor: "#e0d6c2",
                    color: "#5a3e1b",
                  },
                  px: 3,
                  py: 1,
                  mb: 2,
                }}
              >
                عرض المنهاج
              </Button>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", color: "#5a3e1b", mb: 1 }}
              >
                أوراق العمل :
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#E7BC91",
                  color: "#5a3e1b",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#d9a96e" },
                  px: 3,
                  py: 1,
                }}
                onClick={() => navigate(`/Worksheets/${selectedSubject.id}`)}
              >
                أوراق العمل
              </Button>
            </Box>

            {showSyllabus && selectedSubject.curriculumFile ? (
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
                      flex: 1,
                    }}
                  >
                    {selectedSubject.curriculumName}
                  </Typography>
                </Box>
                <IconButton
                  component="label"
                  sx={{
                    position: "relative",
                    left: 8,
                    top: 8,
                    color: "#5a3e1b",
                    "&:hover": { backgroundColor: "rgba(90, 62, 27, 0.1)" },
                  }}
                  onClick={() => {
                    console.log("form onClick");
                    const fileName = selectedSubject.curriculumName;
                    const fileUrl = selectedSubject.curriculumFile;
                    if (!fileUrl) return;

                    const link = document.createElement("a");
                    link.href = fileUrl;
                    link.setAttribute("download", fileName);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                  }}
                >
                  <DownloadRoundedIcon />
                </IconButton>
              </Box>
            ) : !selectedSubject.curriculumFile ? (
              <Typography variant="body1">
                لا يوجد منهاج مرفوع حالياً
              </Typography>
            ) : null}
          </Box>

          <Box>
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                component="label"
                sx={{
                  backgroundColor: "#5a3e1b",
                  color: "white",
                  "&:hover": { backgroundColor: "#7b3f00" },
                  px: 3,
                  py: 1,
                  mb: 2,
                }}
              >
                إضافة ملحق
                <input
                  accept=".pdf"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(event) =>
                    handleAttachmentUpload(selectedSubject.id, event)
                  }
                />
              </Button>
            </Box>

            {selectedSubject.extensions.length > 0 ? (
              <List
                sx={{
                  width: "100%",
                  bgcolor: "#f8f4e9",
                  borderRadius: 1,
                  p: 0,
                }}
              >
                {selectedSubject.extensions.map((attachment, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        <DescriptionIcon color="primary" />
                      </ListItemIcon>
                      <Typography
                        variant="body1"
                        sx={{ flex: 1, textAlign: "right" }}
                      >
                        {attachment.extensionName}
                      </Typography>
                      <IconButton
                        component="label"
                        sx={{
                          position: "absolute",
                          left: 8,
                          top: 8,
                          color: "#5a3e1b",
                          "&:hover": {
                            backgroundColor: "rgba(90, 62, 27, 0.1)",
                          },
                        }}
                        onClick={(e) => handleDeleteExtension(attachment.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                    {index < selectedSubject.extensions.length - 1 && (
                      <Divider component="li" />
                    )}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography variant="body1">
                لا يوجد ملحقات مرفوعة حالياً
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TeacherSubjectsTab;
