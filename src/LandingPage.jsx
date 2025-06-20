import React, { useState, useRef } from "react";
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
import MenuBookIcon from "@mui/icons-material/MenuBook";
import InfoIcon from "@mui/icons-material/Info";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import Header from "./Header";

const LandingPage = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const aboutRef = useRef(null);
  const coursesRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleClick = (section) => {
    if (section === "courses") {
      setShowCourses(true);
      setShowAbout(false);
      setShowContact(false);
      scrollToSection(coursesRef);
    } else if (section === "about") {
      setShowAbout(true);
      setShowCourses(false);
      setShowContact(false);
      scrollToSection(aboutRef);
    } else if (section === "contact") {
      setShowContact(true);
      setShowAbout(false);
      setShowCourses(false);
      scrollToSection(contactRef);
    }
  };

  // بيانات الدورات التجريبية
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

  return (
    <>
      <Header />
      <Box
        sx={{
          fontFamily: "Cairo, sans-serif",
          direction: "rtl",
          backgroundColor: "#fff9f2",
          width: "100vw",
          overflowX: "hidden",
          textAlign: "right",
          px: 0,
          mx: 0,
        }}
      >
        {/* قسم الترحيب */}
        <Box
          sx={{
            backgroundImage: `url('/Landing.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "420px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            px: 0,
            mx: 0,
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.03)",
            },
          }}
        >
          <Zoom in={true} style={{ transitionDelay: "100ms" }}>
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.88)",
                p: 4,
                borderRadius: 4,
                boxShadow: 5,
                maxWidth: "90vw",
                mx: "auto",
                transform: "scale(0.9)",
                animation: "pulse 2s infinite alternate",
                "@keyframes pulse": {
                  "0%": { transform: "scale(0.95)" },
                  "100%": { transform: "scale(1)" },
                },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "#7b3f00",
                  mb: 1,
                  textAlign: "center",
                }}
              >
                أهلًا بكم في دورات زدني علمًا
              </Typography>
            </Box>
          </Zoom>
        </Box>

        {/* أزرار التنقل */}
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          sx={{
            py: 3,
            px: 2,
            maxWidth: "100%",
            mx: 0,
          }}
        >
          <Grid item>
            <Slide direction="left" in={true} timeout={500}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#e0a96d",
                  color: "#fff",
                  borderRadius: "20px",
                  px: 3,
                  transition: "all 0.3s ease",
                  transform: "translateY(0)",
                  "&:hover": {
                    backgroundColor: "#cf8b45",
                    transform: "translateY(-3px)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  },
                }}
                startIcon={<MenuBookIcon sx={{ ml: 1 }} />}
                onClick={() => handleClick("courses")}
              >
                الدورات الجديدة
              </Button>
            </Slide>
          </Grid>
          <Grid item>
            <Slide direction="left" in={true} timeout={700}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#e0a96d",
                  color: "#5a3921",
                  borderRadius: "20px",
                  px: 3,
                  transition: "all 0.3s ease",
                  transform: "translateY(0)",
                  "&:hover": {
                    backgroundColor: "#ffe9d6",
                    transform: "translateY(-3px)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  },
                }}
                startIcon={<InfoIcon sx={{ ml: 1 }} />}
                onClick={() => handleClick("about")}
              >
                من نحن؟
              </Button>
            </Slide>
          </Grid>
          <Grid item>
            <Slide direction="left" in={true} timeout={900}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#e0a96d",
                  color: "#5a3921",
                  borderRadius: "20px",
                  px: 3,
                  transition: "all 0.3s ease",
                  transform: "translateY(0)",
                  "&:hover": {
                    backgroundColor: "#ffe9d6",
                    transform: "translateY(-3px)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  },
                }}
                startIcon={<ContactPhoneIcon sx={{ ml: 1 }} />}
                onClick={() => handleClick("contact")}
              >
                رقم التواصل
              </Button>
            </Slide>
          </Grid>
        </Grid>

        {/* قسم من نحن */}
        <div ref={aboutRef}>
          <Collapse in={showAbout} timeout={800} unmountOnExit>
            <Fade in={showAbout} timeout={1000}>
              <Box
                sx={{
                  backgroundColor: "#fff0e0",
                  px: 3,
                  py: 4,
                  textAlign: "right",
                  mx: "auto",
                  maxWidth: "95vw",
                  mt: 2,
                  borderRadius: 2,
                  transition: "all 0.5s ease",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  "&:hover": {
                    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: "#7b3f00",
                    fontWeight: "bold",
                    mb: 2,
                    textAlign: "right",
                  }}
                  gutterBottom
                >
                  من نحن؟
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    maxWidth: "800px",
                    lineHeight: 2,
                    fontSize: "1.1rem",
                  }}
                >
                  دورات زدني علماً للعلوم الشرعية والتزكويّة تسعى لتعليم أساسيات
                  العلوم الشرعيّة والتقدم خلال عدة مستويات. تستوعب دوراتنا فئات
                  عمريّة مختلفة.
                  <br />
                  انطلقت الدورات عام 1446هـ - 2024م مع مجموعة من المدرسات
                  المختصات والمجازات في جامع الإيمان.
                </Typography>
              </Box>
            </Fade>
          </Collapse>
        </div>

        {/* قسم التواصل */}
        <div ref={contactRef}>
          <Collapse in={showContact} timeout={800} unmountOnExit>
            <Grow in={showContact} timeout={1000}>
              <Box
                sx={{
                  py: 3,
                  textAlign: "center",
                  mx: "auto",
                  maxWidth: "95vw",
                  mt: 2,
                }}
              >
                <Card
                  sx={{
                    maxWidth: 400,
                    margin: "0 auto",
                    backgroundColor: "#ffe9d6",
                    boxShadow: 4,
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ color: "#5a3921" }}
                      gutterBottom
                    >
                      رقم التواصل
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{
                        color: "#5a3921",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          color: "#7b3f00",
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      09999998886
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grow>
          </Collapse>
        </div>

        {/* قسم الدورات */}
        <div ref={coursesRef}>
          <Collapse in={showCourses} timeout={800} unmountOnExit>
            <Box
              sx={{
                px: 2,
                py: 2,
                mx: "auto",
                maxWidth: "95vw",
                mt: 2,
              }}
            >
              <Slide direction="right" in={showCourses} timeout={500}>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#7b3f00",
                    textAlign: "right",
                    mb: 3,
                    fontWeight: "bold",
                  }}
                  gutterBottom
                >
                  الدورات الجديدة
                </Typography>
              </Slide>

              <Grid
                container
                spacing={3}
                sx={{ direction: "rtl" }}
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
                    <Grow in={showCourses} timeout={index * 200 + 500}>
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
                    </Grow>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Collapse>
        </div>
      </Box>
    </>
  );
};

export default LandingPage;
