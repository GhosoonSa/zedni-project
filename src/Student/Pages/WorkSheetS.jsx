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
import StudentHeader from "../Components/StudentHeader";
import { Axios } from "../../Api/axios";
import { GETWORKSHEETSSTUDENT } from "../../Api/api";

const WorksheetsStudents = () => {
  const [worksheets, setWorksheets] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      Axios.get(`${GETWORKSHEETSSTUDENT}/${id}`)
        .then((res) => {
          setWorksheets(res.data.worksheets || []);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <div>
      <StudentHeader />
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
                      variant="outlined"
                      size="small"
                      sx={{ borderRadius: 2 }}
                      onClick={() => navigate(`/worksheetDetailsS/${ws.id}`)}
                    >
                      الأجوبة
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      sx={{ borderRadius: 2 }}
                      onClick={() => navigate(`/StudentAnswers/${ws.id}`)}
                    >
                      أجوبتي
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="success"
                      sx={{ borderRadius: 2 }}
                      onClick={() => navigate(`/SubmitAnswersS/${ws.id}`)}
                    >
                      حل الورقة
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

export default WorksheetsStudents;
