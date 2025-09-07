import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate, useParams } from "react-router-dom";
import TeacherHeader from "../Components/TeacherHeader";
import { Axios } from "../../Api/axios";
import { GETWORKSHEETBYID, DELETEWORKSHEET } from "../../Api/api";

const WorksheetsBySubject = () => {
  const [worksheets, setWorksheets] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      Axios.get(`${GETWORKSHEETBYID}/${id}`)
        .then((res) => {
          setWorksheets(res.data.worksheets || []);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleDelete = async (worksheetId) => {
    try {
      await Axios.delete(`${DELETEWORKSHEET}/${worksheetId}`);
      setWorksheets((prev) => prev.filter((item) => item.id !== worksheetId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <TeacherHeader />
      <Paper
        elevation={3}
        sx={{
          my: 12,
          mx: "auto",
          p: 5,
          direction: "rtl",
          background: "linear-gradient(135deg, #fffaf5, #fffefd)",
          minHeight: "70vh",
          maxWidth: 1100,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 4,
            textAlign: "center",
            color: "#5d4037",
          }}
        >
          📚 أوراق العمل
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ff9800",
              "&:hover": { backgroundColor: "#fb8c00" },
              borderRadius: 2,
            }}
            onClick={() => navigate(`/AddWorkSheetT/${id}`)}
          >
            إضافة ورقة عمل
          </Button>
        </Box>

        {loading ? (
          <Typography align="center" color="text.secondary" fontSize="1.2rem">
            جاري التحميل...
          </Typography>
        ) : worksheets.length > 0 ? (
          <Grid container spacing={3}>
            {worksheets.map((ws, index) => (
              <Grid item xs={12} sm={6} md={4} key={ws.id}>
                <Card
                  elevation={4}
                  sx={{
                    borderRadius: 3,
                    backgroundColor: "#ffffff",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <AssignmentIcon
                      sx={{ fontSize: 50, color: "#8d6e63", mb: 1 }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", mb: 1, fontSize: "1.2rem" }}
                    >
                      {ws.worksheetName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      رقم الورقة: {index + 1}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      justifyContent: "center",
                      gap: 2,
                      pb: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#2196f3",
                        "&:hover": { backgroundColor: "#1976d2" },
                        borderRadius: 2,
                      }}
                      onClick={() => navigate(`/worksheet/${ws.id}`)}
                    >
                      تفاصيل
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#4caf50",
                        "&:hover": { backgroundColor: "#388e3c" },
                        borderRadius: 2,
                      }}
                      onClick={() => navigate(`/SubmitAnswers/${ws.id}`)}
                    >
                      رفع الإجابات
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#f44336",
                        "&:hover": { backgroundColor: "#d32f2f" },
                        borderRadius: 2,
                      }}
                      onClick={() => handleDelete(ws.id)}
                    >
                      حذف
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            align="center"
            color="text.secondary"
            fontSize="1.2rem"
            sx={{ mt: 3 }}
          >
            لا توجد أوراق عمل لهذه المادة.
          </Typography>
        )}
      </Paper>
    </div>
  );
};

export default WorksheetsBySubject;
