import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grow,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  Paper,
  Avatar,
  ListItemText,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";

const SubAdminBooksTab = ({ courseId, level }) => {
  const [books, setBooks] = useState([]);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/subadmin/getBookRequestStudents/${courseId}/${level}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ` + authToken,
              ContentType: "application/json",
            },
          }
        );
        setBooks(response.data.books);
      } catch (error) {
        console.error("Error getting books :", error);
      }
    };
    fetchBooks();
  }, [authToken]);

  const [selectedBook, setSelectedBook] = useState(null);

  const handleSelectBook = (bookId) => {
    const book = books.find((b) => b.bookID === bookId);
    setSelectedBook(book);
  };

  return (
    <Box sx={{ p: 3 }}>
      {books.length === 0 ? (
        <Box
          sx={{
            py: 4,
            textAlign: "center",
            width: "100%",
          }}
        >
          <Typography variant="h6" color="textSecondary">
            لا يوجد كتب حالياً
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
          {books.map((book, index) => (
            <Box
              key={book.bookID}
              sx={{
                minWidth: { xs: "45%", sm: "30%", md: "22%" },
                flexShrink: 0,
              }}
            >
              <Grow in={true} timeout={index * 200}>
                <Card
                  onClick={() => handleSelectBook(book.bookID)}
                  sx={{
                    backgroundColor:
                      selectedBook?.bookID === book.bookID
                        ? "#f8f4e9"
                        : "#fffaf5",
                    border:
                      selectedBook?.bookID === book.bookID
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
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <CardContent sx={{ textAlign: "center", py: 3 }}>
                    <MenuBookIcon
                      color="primary"
                      sx={{ fontSize: "2.5rem", mb: 1 }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                    >
                      {book.bookName}
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Box>
          ))}
        </Box>
      )}
      {selectedBook && (
        <Paper
          elevation={3}
          sx={{
            mt: 3,
            width: "100%",
            border: "2px solid #E7BC91",
            borderRadius: 2,
            backgroundColor: "#fffaf5",
            p: 3,
            boxShadow: 3,
          }}
        >
          <Box
            sx={{
              mb: 3,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#7b3f00",
                backgroundColor: "#f8f4e9",
                px: 2,
                py: 1,
                borderRadius: 1,
                fontWeight: "bold",
              }}
            >
              العدد الكلي للكتب المطلوبة: {selectedBook.total}
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                color: "#5a3e1b",
                mb: 2,
                textAlign: "right",
              }}
            >
              الطلاب الذين طلبوا الكتاب:
            </Typography>

            {selectedBook.students.length > 0 ? (
              <List
                sx={{
                  width: "100%",
                  bgcolor: "#f8f4e9",
                  borderRadius: 1,
                  p: 0,
                  maxHeight: "300px",
                  overflowY: "auto",
                  "&::-webkit-scrollbar": { width: "8px" },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#E7BC91",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-track": { backgroundColor: "#f8f4e9" },
                }}
              >
                {selectedBook.students.map((student, index) => (
                  <React.Fragment key={index}>
                    <ListItem sx={{ py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Avatar
                          sx={{
                            bgcolor: "#E7BC91",
                            width: 30,
                            height: 30,
                          }}
                        >
                          <PersonIcon sx={{ fontSize: "1rem" }} />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={student.studentName}
                        primaryTypographyProps={{
                          sx: {
                            textAlign: "right",
                            fontWeight: "medium",
                            color: "#5a3e1b",
                          },
                        }}
                      />
                    </ListItem>
                    {index < selectedBook.students.length - 1 && (
                      <Divider component="li" sx={{ borderColor: "#e0d6c2" }} />
                    )}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  py: 2,
                  color: "#5a3e1b",
                }}
              >
                لا يوجد طلاب مسجلين لطلب هذا الكتاب حالياً
              </Typography>
            )}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default SubAdminBooksTab;
