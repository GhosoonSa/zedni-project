import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminHeader from "../Components/AdminHeader";
import books from "/77221.jpg";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Zoom,
  Fade,
  Grow,
  Slide,
} from "@mui/material";

const Courses = () => {
  // const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const status = ["الجديدة", "الحالية", "السابقة"];
  const courses = [
    {
      id: 1,
      title: "دورة الفقه للمبتدئين",
      image: "/course.png",
    },
    {
      id: 2,
      title: "دورة التجويد المتقدمة",
      image: "/course.png",
    },
    {
      id: 3,
      title: "دورة التفسير الموضوعي",
      image: "/course.png",
    },
    {
      id: 4,
      title: "دورة السيرة النبوية",
      image: "/course.png",
    },
    {
      id: 5,
      title: "دورة العقيدة الإسلامية",
      image: "/course.png",
    },
    {
      id: 6,
      title: "دورة أحكام الأسرة",
      image: "/course.png",
    },
  ];
  useEffect(() => {
    // fetch courses
    const fetchCourses = async () => {
      try {
        // if (!token) {
        //   navigate("/LogIn");
        //   return;
        // }
        const response = await axios.get(
          //   "http://localhost:8000/api/trainer/getarticle",
          {
            headers: {
              Accept: "application/json",
              // Authorization: `Bearer ` + token,
            },
          }
        );
        console.log("responses " + response.data.articles);

        if (response.data && response.data.courses) {
          // setCourses(response.data.courses);
          console.log("Courses set to state:", response.data.message);
        } else {
          console.error("Invalid response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
    //put token or courses in the []
  }, []);

  const handleChoose = () => {
    navigate("/CourseTabs");
    console.log("clicked");
  };
  return (
    <>
      <AdminHeader />
      <div
        className="bg-cover h-screen w-screen"
        style={{ backgroundImage: `url(${books})` }}
      >
        <img
          src="../public/start.png"
          alt="arabic font"
          className="ml-10 pt-20"
          style={{ width: "600px", height: "600px" }}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        {status.map((status) => (
          <div key={status}>
            <h3
              className={`m-20 ${status.toLowerCase()}`}
              style={{
                marginBottom: "40px",
                marginTop: "20px",
                direction: "rtl",
              }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </h3>
            <div>
              <Grid
                container
                spacing={3}
                sx={{ direction: "rtl", maxWidth: "90vw" }}
                justifyContent="center"
              >
                {courses.map((course, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={course.id}
                    sx={{ marginBottom: "40px" }}
                  >
                    <Card
                      sx={{
                        backgroundColor: "#fffaf5",
                        boxShadow: 3,
                        borderRadius: "16px",
                        overflow: "hidden",
                        height: "100%",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                        },
                        margin: "8px",
                      }}
                      onClick={handleChoose}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={course.image}
                        alt={course.title}
                        sx={{
                          objectFit: "cover",
                          borderBottom: "2px solid #e0a96d",
                          transition: "all 0.5s ease",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                      />
                      <CardContent
                        sx={{
                          textAlign: "center",
                          background: "#fffaf5",
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          sx={{
                            color: "#7b3f00",
                            fontSize: "1.2rem",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              color: "#5a3921",
                            },
                          }}
                        >
                          {course.title}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Courses;
