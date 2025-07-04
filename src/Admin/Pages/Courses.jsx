import React, { useState, useEffect } from "react";
import AdminHeader from "../Components/AdminHeader";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Box,
} from "@mui/material";
import AddCourse from "../Components/AddCourse";
import CourseOptionsModal from "../Components/CourseOptionsModal";
import backgroundTabs from "/backgroundTabs.jpg";

const CARD_WIDTH = 260;

const Courses = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showOnlyLevels, setShowOnlyLevels] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    console.log("Received token: ", authToken);
  }, []);

  const ads = [
    {
      id: 1,
      content: "/course.png",
    },
    {
      id: 2,
      content: "/course.png",
      text: "سارع بالتسجيل في دوراتنا الجديدة قبل اكتمال الأماكن",
    },
    {
      id: 3,
      content: "/course.png",
    },
  ];

  const courses = [
    { id: 1, title: "دورة الفقه", image: "/course.png", status: "الجديدة" },
    {
      id: 2,
      title: "دورة التفسير الموضوعي",
      image: "/course.png",
      status: "الحالية",
    },
    { id: 3, title: "دورة التجويد", image: "/course.png", status: "السابقة" },
    { id: 4, title: "دورة التجويد", image: "/course.png", status: "السابقة" },
    { id: 5, title: "دورة التجويد", image: "/course.png", status: "السابقة" },
    { id: 8, title: "دورة التجويد", image: "/course.png", status: "السابقة" },
  ];

  const handleCourseClick = (course, event) => {
    setSelectedCourse(course);
    setShowOnlyLevels(course.status === "السابقة");
    setAnchorEl(event.currentTarget);
    setIsOptionsOpen(true);
  };

  const closeModal = () => {
    setIsOptionsOpen(false);
    setShowOnlyLevels(false);
    setAnchorEl(null);
  };

  const CourseCard = ({ course }) => (
    <Box sx={{ width: CARD_WIDTH, flex: "0 0 auto" }}>
      <Card
        sx={{
          mx: 1,
          my: 1,
          backgroundColor: "#fffaf5",
          borderRadius: 2,
          boxShadow: 3,
          overflow: "hidden",
          transition: "transform .3s",
          "&:hover": { transform: "translateY(-6px)" },
          cursor: "pointer",
        }}
        onClick={(e) => handleCourseClick(course, e)}
      >
        <CardMedia
          component="img"
          height="140"
          image={course.image}
          alt={course.title}
          sx={{
            objectFit: "cover",
            transition: "transform .5s",
            "&:hover": { transform: "scale(1.05)" },
          }}
        />
        <CardContent sx={{ textAlign: "center", pb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {course.title}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );

  const AdCard = ({ ad }) => (
    <Box
      sx={{
        width: 300,
        flex: "0 0 auto",
        mx: 1,
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 3,
        border: "2px solid #E7BC91",
        backgroundColor: "#fffaf5",
      }}
    >
      {}
      <CardMedia
        component="img"
        height="140"
        image={ad.content}
        alt="إعلان"
        sx={{
          width: "100%",
          objectFit: "cover",
        }}
      />

      {}
      {ad.text && (
        <Box
          sx={{
            p: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="body1" sx={{ lineHeight: 1.5, color: "#555" }}>
            {ad.text}
          </Typography>
        </Box>
      )}
    </Box>
  );

  const statuses = ["الجديدة", "الحالية", "السابقة"];

  return (
    <>
      <AdminHeader />

      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: `url('${backgroundTabs}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          zIndex: -1,
        }}
      />

      {/*ads section*/}
      <Box sx={{ mt: 12, px: 4 }}>
        <Paper
          elevation={3}
          sx={{
            my: 4,
            py: 3,
            px: 4,
            direction: "rtl",
            backgroundColor: "#fffaf5",
            mr: 4,
            ml: 4,
            borderTop: "4px solid #E7BC91",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 3,
              color: "#333",
              textAlign: "right",
            }}
          >
            الإعلانات
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              overflowX: "auto",
              gap: 2,
              justifyContent: "center",
              py: 1,
              "&::-webkit-scrollbar": {
                height: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#E7BC91",
                borderRadius: "3px",
              },
            }}
          >
            {ads.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </Box>
        </Paper>

        {/* courses section */}
        {statuses.map((status) => {
          const list = courses.filter((c) => c.status === status);

          return (
            <Paper
              key={status}
              elevation={3}
              sx={{
                my: 4,
                py: 3,
                px: 4,
                direction: "rtl",
                backgroundColor: "#fffaf5",
                width: list.length <= 2 ? "50%" : "auto",
                mr: 4,
                ml: list.length <= 2 ? "auto" : 4,
                boxSizing: "border-box",
              }}
            >
              <Typography variant="h5" sx={{ mb: 4, fontWeight: "bold" }}>
                {status}
              </Typography>

              {/* add button only for new courses */}
              {status == "الجديدة" && (
                <Box sx={{ textAlign: "right", pr: 1, mb: 4 }}>
                  <Button
                    variant="outlined"
                    onClick={() => setIsAddOpen(true)}
                    sx={{
                      backgroundColor: "#E7BC91",
                      color: "black",
                      border: "#DAE2ED",
                      "&:hover": { borderColor: "#8B5E34" },
                    }}
                    size="large"
                  >
                    إضافة دورة
                  </Button>
                  <AddCourse
                    isOpen={isAddOpen}
                    onClose={() => setIsAddOpen(false)}
                  />
                </Box>
              )}

              {status == "السابقة" ? (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "nowrap",
                    overflowX: "auto",
                    gap: 2,
                    justifyContent: "center",
                    py: 1,
                    "&::-webkit-scrollbar": {
                      height: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#E7BC91",
                      borderRadius: "3px",
                    },
                  }}
                >
                  {list.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    justifyContent: "flex-start",
                  }}
                >
                  {list.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </Box>
              )}
            </Paper>
          );
        })}
      </Box>

      {selectedCourse && (
        <CourseOptionsModal
          open={isOptionsOpen}
          onClose={closeModal}
          course={selectedCourse}
          showOnlyLevels={showOnlyLevels}
          anchorEl={showOnlyLevels ? null : anchorEl}
        />
      )}
    </>
  );
};

export default Courses;
