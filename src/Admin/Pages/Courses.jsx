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
  Stack,
} from "@mui/material";
import AddCourse from "../Components/AddCourse";
import CourseOptionsModal from "../Components/CourseOptionsModal";
import backgroundTabs from "/backgroundTabs.jpg";
import axios from "axios";

const Courses = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showOnlyLevels, setShowOnlyLevels] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [ads, setAds] = useState([]);
  const [courses, setCourses] = useState([]);
  const authToken = localStorage.getItem("authToken");

  //get ads
  const fetchAds = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/getAllAnnouncements",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ` + authToken,
          },
        }
      );
      setAds(response.data.announcements);
      console.log("get ads " + ads);
    } catch (error) {
      console.error("Error getting ads :", error);
    }
  };
  //get courses
  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/admin/getAdminCourses",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ` + authToken,
          },
        }
      );
      setCourses(response.data.courses);
      console.log("get courses " + courses);
    } catch (error) {
      console.error("Error getting courses :", error);
    }
  };
  useEffect(() => {
    fetchAds();
    fetchCourses();
  }, [authToken]);

  const handleChangeNew = async (courseID) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/admin/startNewCourse/${courseID}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ` + authToken,
          },
        }
      );
      setIsOptionsOpen(false);
      fetchCourses();
    } catch (error) {
      console.error("Error starting course :", error);
    }
  };

  const handleChangeCurrent = async (courseID) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/admin/endCurrentCourse/${courseID}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ` + authToken,
          },
        }
      );
      setIsOptionsOpen(false);
      fetchCourses();
    } catch (error) {
      console.error("Error ending course :", error);
    }
  };

  const handleCourseClick = (course, event) => {
    setSelectedCourse(course);
    setShowOnlyLevels(course.status === "previous");
    setAnchorEl(event.currentTarget);
    setIsOptionsOpen(true);
  };

  const closeModal = () => {
    setIsOptionsOpen(false);
    setShowOnlyLevels(false);
    setAnchorEl(null);
  };

  const CourseCard = ({ course }) => (
    <Box
      sx={{ width: { xs: 140, sm: 180, md: 200, lg: 220 }, flex: "0 0 auto" }}
    >
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
          image={course.courseImage}
          alt={course.courseName}
          sx={{
            objectFit: "cover",
            transition: "transform .5s",
            "&:hover": { transform: "scale(1.05)" },
          }}
        />
        <Stack direction="column" spacing={2} sx={{ alignItems: "center" }}>
          <CardContent sx={{ textAlign: "center", pb: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {course.courseName}
            </Typography>
          </CardContent>
          {course.status === "new" && (
            <Button
              type="button"
              variant="outlined"
              color="primary"
              style={{
                backgroundColor: "#E7BC91",
                color: "black",
                border: "#DAE2ED",
                margin: "10px",
                width: "100px",
              }}
              onClick={() => handleChangeNew(course.id)}
            >
              بدأ الدورة
            </Button>
          )}
          {course.status === "current" && (
            <Button
              type="button"
              variant="outlined"
              color="primary"
              style={{
                backgroundColor: "#E7BC91",
                color: "black",
                border: "#DAE2ED",
                margin: "10px",
                width: "100px",
              }}
              onClick={() => handleChangeCurrent(course.id)}
            >
              إنهاء الدورة
            </Button>
          )}
        </Stack>
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
      <CardMedia
        component="img"
        height="140"
        image={ad.image}
        alt="إعلان"
        sx={{
          width: "100%",
          objectFit: "cover",
        }}
      />

      {ad.description && (
        <Box
          sx={{
            p: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="body1" sx={{ lineHeight: 1.5, color: "#555" }}>
            {ad.description}
          </Typography>
        </Box>
      )}
    </Box>
  );

  const statuses = ["new", "current", "previous"];

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

      <Box sx={{ mt: 12, px: 4 }}>
        {/*ads section*/}
        <Paper
          elevation={3}
          sx={{
            my: 1,
            py: 3,
            px: 5,
            direction: "rtl",
            backgroundColor: "#fffaf5",
            mr: 1,
            ml: 1,
            borderTop: "4px solid #E7BC91",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 3,
              mr: 3,
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
                mr: 2,
                ml: list.length <= 2 ? "auto" : 4,
                boxSizing: "border-box",
              }}
            >
              {status == "new" ? (
                <Typography
                  variant="h5"
                  sx={{ mb: 4, mr: 1, fontWeight: "bold" }}
                >
                  الجديدة
                </Typography>
              ) : status == "previous" ? (
                <Typography
                  variant="h5"
                  sx={{ mb: 4, mr: 1, fontWeight: "bold" }}
                >
                  السابقة
                </Typography>
              ) : (
                <Typography
                  variant="h5"
                  sx={{ mb: 4, mr: 1, fontWeight: "bold" }}
                >
                  الحالية
                </Typography>
              )}

              {/* add button only for new courses */}
              {status == "الجديدة" ||
                (status == "new" && (
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
                      token={authToken}
                    />
                  </Box>
                ))}

              {status == "السابقة" || status == "previous" ? (
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
                    <CourseCard
                      key={course.id}
                      course={course}
                      onClick={(e) => handleCourseClick(course, e)}
                    />
                  ))}
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    justifyContent: "center",
                  }}
                >
                  {list.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onClick={(e) => handleCourseClick(course, e)}
                    />
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
