import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grow,
  Button,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  Chip,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const StudentSubjectsTab = ({ courseId }) => {
  useEffect(() => {
    console.log("Current course ID:", courseId);
  }, [courseId]);

  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: "الفقه",
      teacher: "نور",
      syllabus: "",
      attachments: ["ملاحظات الفقه.pdf"],
      showSyllabus: false,
      showAttachments: false,
      recommendedBooks: [
        { id: 1, title: "الفقه الميسر", isRecommended: false },
      ],
    },
    {
      id: 2,
      name: "التفسير",
      teacher: "علي",
      syllabus: null,
      attachments: [],
      showSyllabus: false,
      showAttachments: false,
      recommendedBooks: [
        { id: 1, title: "تفسير السعدي", isRecommended: false },
      ],
    },
    {
      id: 3,
      name: "الحديث",
      teacher: "أحمد",
      syllabus: "حديث.pdf",
      attachments: ["ملخص الحديث.pdf"],
      showSyllabus: false,
      showAttachments: false,
      recommendedBooks: [],
    },
    {
      id: 4,
      name: "التجويد",
      teacher: "محمد",
      syllabus: "تجويد.pdf",
      attachments: ["ملاحظات.pdf", "تمارين.pdf"],
      showSyllabus: false,
      showAttachments: false,
      recommendedBooks: [
        { id: 1, title: "التحفة التجويدية", isRecommended: false },
      ],
    },
  ]);

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

  const handleBookRecommendation = (subjectId, bookId) => {
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
  };

  return (
    <Box sx={{ p: 3 }}>
      {}
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
                    {subject.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grow>
          </Box>
        ))}
      </Box>

      {}
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
          {}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: "#5a3e1b" }}>
              الأستاذ: {selectedSubject.teacher}
            </Typography>
          </Box>

          {}
          <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
            <Button
              variant="contained"
              onClick={() => handleShowSyllabus(selectedSubject.id)}
              disabled={!selectedSubject.syllabus}
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
              disabled={selectedSubject.attachments.length === 0}
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

          {selectedSubject.showSyllabus && selectedSubject.syllabus && (
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
                  {selectedSubject.syllabus}
                </Typography>
              </Box>
            </Box>
          )}

          {}
          {selectedSubject.showAttachments &&
            selectedSubject.attachments.length > 0 && (
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
                  {selectedSubject.attachments.map((attachment, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemIcon>
                          <DescriptionIcon color="primary" />
                        </ListItemIcon>
                        <Typography
                          variant="body1"
                          sx={{ flex: 1, textAlign: "right" }}
                        >
                          {attachment}
                        </Typography>
                      </ListItem>
                      {index < selectedSubject.attachments.length - 1 && (
                        <Divider component="li" />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Box>
            )}

          {}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", color: "#5a3e1b", mb: 2 }}
            >
              الكتب:
            </Typography>

            {selectedSubject.recommendedBooks.length > 0 ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {selectedSubject.recommendedBooks.map((book) => (
                  <Box
                    key={book.id}
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
                      {book.title}
                    </Typography>
                    <Chip
                      label={
                        book.isRecommended ? " تمت التوصية" : " توصية كتاب"
                      }
                      onClick={() =>
                        handleBookRecommendation(selectedSubject.id, book.id)
                      }
                      color={book.isRecommended ? "success" : "default"}
                      sx={{
                        cursor: "pointer",
                        backgroundColor: book.isRecommended
                          ? "#4caf50"
                          : "#7a6248",
                        color: book.isRecommended ? "white" : "white",
                        "&:hover": {
                          backgroundColor: book.isRecommended
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
