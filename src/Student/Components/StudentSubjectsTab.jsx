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
  Chip,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

import axios from "axios";
import { useLocation } from "react-router-dom";

const StudentSubjectsTab = ({ courseId }) => {
  const [showSyllabus, setShowsyllabus] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [isRecommended, setIsRecommended] = useState(false);
  const authToken = localStorage.getItem("authToken");
  const location = useLocation();

  const [subjects, setSubjects] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchsubjects = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/student/getSubjectDetailsStudent/${courseId}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ` + authToken,
              ContentType: "application/json",
            },
          }
        );
        setSubjects(response.data.subjects);
        setBooks(response.data.requested_books);
        console.log("from books", books);
      } catch (error) {
        console.error("Error getting subjects :", error);
      }
    };
    fetchsubjects();
  }, [authToken]);

  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleSelectSubject = (subjectId) => {
    const subject = subjects.find((s) => s.id === subjectId);
    setSelectedSubject({
      ...subject,
      showSyllabus: false,
      showAttachments: false,
    });
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
  };

  const handleShowAttachments = (subjectId) => {
    const updatedSubjects = subjects.map((subject) => {
      if (subject.id === subjectId) {
        return {
          ...subject,
          showAttachments: true,
        };
      }
      return subject;
    });
    setSubjects(updatedSubjects);

    if (selectedSubject?.id === subjectId) {
      setSelectedSubject({
        ...selectedSubject,
        showAttachments: true,
      });
    }
  };

  const handleBookRecommendation = async (curriculumID, subjectId, bookId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/student/requestBook/${curriculumID}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ` + authToken,
            ContentType: "application/json",
          },
        }
      );
      if (response.status === 201 || response.status === 200) {
        const updatedSubjects = subjects.map((subject) => {
          if (subject.id === subjectId) {
            const updatedBooks = subject.recommendedBooks.map((book) => {
              if (book.id === bookId) {
                return { ...book, isRecommended: !book.isRecommended };
              }
              return book;
            });
            return { ...subject, recommendedBooks: updatedBooks };
          }
          return subject;
        });
        setSubjects(updatedSubjects);

        if (selectedSubject?.id === subjectId) {
          const updatedBooks = selectedSubject.recommendedBooks.map((book) => {
            if (book.id === bookId) {
              return { ...book, isRecommended: !book.isRecommended };
            }
            return book;
          });
          setSelectedSubject({
            ...selectedSubject,
            recommendedBooks: updatedBooks,
          });
        }
      }
    } catch (error) {
      console.error("Error sending request book :", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
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
                    {subject.subjectName}
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
              الأستاذ: {selectedSubject.teacherName}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
            <Button
              variant="contained"
              onClick={() => handleShowSyllabus(selectedSubject.id)}
              disabled={!selectedSubject.curriculumName}
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
              }}
            >
              عرض المنهاج
            </Button>

            <Button
              variant="contained"
              onClick={() => handleShowAttachments(selectedSubject.id)}
              disabled={selectedSubject.extensions.length === 0}
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
              }}
            >
              عرض الملحقات
            </Button>
          </Box>

          {selectedSubject.showSyllabus && selectedSubject.curriculumName && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", color: "#5a3e1b", mb: 1 }}
              >
                المنهاج:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f8f4e9",
                  p: 2,
                  borderRadius: 1,
                  gap: 2,
                  width: "100%",
                }}
              >
                <DescriptionIcon color="primary" sx={{ fontSize: "2rem" }} />
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
                <IconButton
                  sx={{
                    position: "relative",
                    color: "#5a3e1b",
                    "&:hover": {
                      backgroundColor: "rgba(90, 62, 27, 0.1)",
                    },
                  }}
                  onClick={() => {
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
            </Box>
          )}

          {selectedSubject.showAttachments &&
            selectedSubject.extensions.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "#5a3e1b", mb: 2 }}
                >
                  الملحقات:
                </Typography>
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "#f8f4e9",
                    borderRadius: 1,
                    p: 0,
                  }}
                >
                  {selectedSubject.extensions.map((attachment, index) => (
                    <React.Fragment key={attachment.id}>
                      <ListItem
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          px: 2,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <DescriptionIcon color="primary" />
                          <Typography
                            variant="body1"
                            sx={{ textAlign: "right" }}
                          >
                            {attachment.extensionName}
                          </Typography>
                        </Box>
                        <IconButton
                          sx={{
                            position: "relative",
                            color: "#5a3e1b",
                            "&:hover": {
                              backgroundColor: "rgba(90, 62, 27, 0.1)",
                            },
                          }}
                          onClick={() => {
                            const fileName = attachment.extensionName;
                            const fileUrl = attachment.extensionFile;
                            if (!fileUrl) return;
                            console.log("from icon button ", fileName, fileUrl);
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
                      </ListItem>
                      {index < selectedSubject.extensions.length - 1 && (
                        <Divider component="li" />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Box>
            )}

          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", color: "#5a3e1b", mb: 2 }}
            >
              الكتب:
            </Typography>

            {selectedSubject ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {subjects.map((subject) => (
                  <Box
                    key={subject.curriculumID}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#f8f4e9",
                      p: 2,
                      borderRadius: 1,
                      gap: 1,
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    <MenuBookIcon
                      color="primary"
                      sx={{ fontSize: "2rem", mr: 1 }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        flex: 1,
                        textAlign: "right",
                      }}
                    >
                      {subject.curriculumName}
                    </Typography>
                    <Chip
                      label={
                        subject.is_requested ? " تمت التوصية" : " توصية كتاب"
                      }
                      onClick={() =>
                        handleBookRecommendation(subject.curriculumID)
                      }
                      color={subject.is_requested ? "success" : "default"}
                      sx={{
                        cursor: "pointer",
                        backgroundColor: subject.is_requested
                          ? "#4caf50"
                          : "#7a6248",
                        color: subject.is_requested ? "white" : "white",
                        "&:hover": {
                          backgroundColor: subject.is_requested
                            ? "#388e3c"
                            : "#d5c9b1",
                        },
                        ml: 1,
                        minWidth: "80px",
                        fontWeight: "bold",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography variant="body1">
                لا توجد كتب متاحة للتوصية حالياً
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default StudentSubjectsTab;
