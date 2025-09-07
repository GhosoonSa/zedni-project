import React, { useState, useEffect } from "react";
import Search from "../Components/Search";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Box,
  Stack,
  IconButton,
  Grow,
} from "@mui/material";
import axios from "axios";

const SearchSubject = () => {
  const authToken = localStorage.getItem("authToken");
  const [searchTerm, setSearchTerm] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [curriculum, setCurriculum] = useState([]);
  const fetchSearchResults = async (term) => {
    if (!term) {
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8000/api/searchSubject/${term}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
            ContentType: "application/json",
          },
        }
      );
      setSubjects(response.data.subjects);
    } catch (error) {
      console.error("search error ", error);
    }
  };
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchSearchResults(searchTerm);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleSelectSubject = (subjectId) => {
    const subject = subjects.find((s) => s.id === subjectId);
    setSelectedSubject(subject);
    setCurriculum(subject.curriculum);
  };
  return (
    <>
      <Paper sx={{ p: 3, m: 2, backgroundColor: "#fffaf5" }}>
        <Search value={searchTerm} onChange={setSearchTerm} />
        {subjects.length === 0 && searchTerm !== "" ? (
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "1rem",
            }}
          >
            لا يوجد مواد بهذا الاسم
          </Typography>
        ) : (
          ""
        )}
        {searchTerm !== ""
          ? subjects.map((subject, index) => (
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
                      mt: 2,
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
            ))
          : ""}
        {searchTerm !== "" && selectedSubject && (
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
                {curriculum.curriculumName}
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
                const fileName = curriculum.curriculumName;
                const fileUrl = curriculum.curriculumFile;
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
        )}
      </Paper>
    </>
  );
};

export default SearchSubject;
