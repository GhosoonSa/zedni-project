import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminHeader from "../Components/AdminHeader";
import books from "/77221.jpg";
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import AddCourse from "../Components/AddCourse";

const Courses = () => {
  // const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
        className="bg-cover h-screen "
        style={{ backgroundImage: `url(${books})` }}
      >
        <img
          src="../public/start.png"
          alt="arabic font"
          className="ml-10 pt-20"
          style={{ width: "600px", height: "600px", marginRight: "700px" }}
        />
      </div>

      {/* add course */}
      <div style={{ marginTop: "20px" }}>
        <div>
          <Button
            variant="outlined"
            onClick={() => setIsModalOpen(true)}
            sx={{
              backgroundColor: "#E7BC91",
              color: "black",
              border: "#DAE2ED",
              marginRight: "50px",
              "&:hover": { borderColor: "#8B5E34" },
            }}
            size="large"
          >
            إضافة دورة
          </Button>
          <AddCourse
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
            }}
            //token={token}
          />
        </div>

        {/* show courses */}
        <Typography variant="h2" sx={{ marginRight: "50px", marginTop: 4 }}>
          الدورات
        </Typography>
        {status.map((status) => (
          <Paper
            key={status}
            elevation={3}
            sx={{
              marginTop: 4,
              marginBottom: 4,
              marginLeft: 4,
              marginRight: 4,
              padding: 3,
              direction: "rtl",
              backgroundColor: "#fffaf5",
            }}
          >
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
                  // <Slider {...settings}>
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
                        height="140"
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
                  // </Slider>
                ))}
              </Grid>
            </div>
          </Paper>
        ))}
      </div>
    </>
  );
};

export default Courses;
