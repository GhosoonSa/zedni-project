import React, { useEffect, useState } from "react";
import StudentHeader from "../Components/StudentHeader";
import {
  Avatar,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
} from "@mui/material";
import backgroundTabs from "/backgroundTabs.jpg";
import axios from "axios";
import AddProfileImage from "../../SubAdmin/Components/AddProfileImage";
import EditProfile from "../../SubAdmin/Components/EditProfile";
import EditIcon from "@mui/icons-material/Edit";

const ProfileS = () => {
  const [user, setUser] = useState([]);
  const authToken = localStorage.getItem("authToken");
  const [isHovered, setIsHovered] = useState(null);
  const [courses, setCourses] = useState([]);
  const [coursesInfo, setCoursesInfo] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [value, setValue] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/student/studentProfile`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ` + authToken,
            ContentType: "application/json",
          },
        }
      );
      setUser(response.data.data);
      setCourses(response.data.courses);
    } catch (error) {
      console.error("fetch profile error", error);
    }
  };

  const handleCourseCardClick = async (courseId, level) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/student/getCourseDetailForStudent1/${courseId}/${level}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ` + authToken,
            ContentType: "application/json",
          },
        }
      );
      setCoursesInfo(response.data.data);
    } catch (error) {
      console.error("fetch courses info error ", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [authToken]);

  const CostumeButton = ({ value }) => (
    <>
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
          setValue(value);
          setIsEditOpen(true);
        }}
      >
        <EditIcon />
      </IconButton>
    </>
  );

  return (
    <>
      <StudentHeader />
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
          backdropFilter: "blur(2px)",
        }}
      />

      <Box
        sx={{
          flex: 1,
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            height: { xs: 150, sm: 250 },
            position: "relative",
            mb: { xs: 6, sm: 8 },
            boxShadow: "0 4px 20px rgba(210, 180, 140, 0.3)",
            backgroundImage: user.profileImage
              ? `url(${user.profileImage})`
              : "linear-gradient(45deg, #FFEDD8 30%, #E7BC91 90%)",
            backgroundSize: user.profileImage ? "cover" : "auto",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: "inherit",
            },
          }}
        >
          <Avatar
            sx={{
              width: { xs: 80, sm: 140 },
              height: { xs: 80, sm: 140 },
              position: "absolute",
              bottom: { xs: -40, sm: -60 },
              left: { xs: 20, sm: 80 },
              ml: { xs: "33%", sm: 0 },
              border: "4px solid white",
              fontSize: { xs: "2rem", sm: "5rem" },
            }}
          >
            {user.firstAndLastName?.charAt(0) || "G"}
          </Avatar>
        </Box>

        <Box
          sx={{
            pr: { xs: 0, sm: 4 },
            mt: { xs: 4, sm: 0 },
            textAlign: { xs: "center", sm: "Right" },
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: "1.8rem", sm: "2.4rem" } }}
          >
            {user.firstAndLastName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {user.email}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setIsAddOpen(true)}
            sx={{
              backgroundColor: "#E7BC91",
              color: "black",
              border: "#DAE2ED",
              "&:hover": { borderColor: "#8B5E34" },
              mt: 1,
            }}
            size="large"
          >
            إضافة صورة
          </Button>
          <AddProfileImage
            isOpen={isAddOpen}
            onClose={() => {
              setIsAddOpen(false);
              fetchProfile();
            }}
            token={authToken}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 3,
              mt: 3,
              ml: 3,
              mr: 2,
              mb: 2,
            }}
          >
            <Paper
              sx={{
                pr: 2,
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">
                اسم الأب: {user.fatherName}
              </Typography>
              <CostumeButton value={"fatherName"} />
            </Paper>
            <Paper
              sx={{
                pr: 2,
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">
                تاريخ الميلاد: {user.birthDate}
              </Typography>
              <CostumeButton value={"birthDate"} />
            </Paper>
            <Paper
              sx={{
                pr: 2,
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">
                رقم الموبايل: {user.phoneNumber}
              </Typography>
              <CostumeButton value={"phoneNumber"} />
            </Paper>
            <Paper
              sx={{
                pr: 2,
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">
                عنوان السكن: {user.address}
              </Typography>
              <CostumeButton value={"address"} />
            </Paper>
            <Paper
              sx={{
                pr: 2,
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">
                الشهادة/العمل: {user.studyOrCareer}
              </Typography>
              <CostumeButton value={"studyOrCareer"} />
            </Paper>
            <Paper
              sx={{
                pr: 2,
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">
                مجازة: {user.mogazeh ? "نعم" : "لا"}
              </Typography>
              <CostumeButton value={"mogazeh"} />
            </Paper>
            <Paper
              sx={{
                pr: 2,
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">
                خبرات سابقة: {user.PreviousExperience}
              </Typography>
              <CostumeButton value={"PreviousExperience"} />
            </Paper>
          </Box>
          <EditProfile
            isOpen={isEditOpen}
            onClose={() => {
              setIsEditOpen(false);
              fetchProfile();
            }}
            token={authToken}
            fieldName={value}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 3,
              mt: 3,
              ml: 3,
            }}
          >
            <Paper sx={{ p: 3, mb: 2 }}>
              <Typography variant="h5" align="center" sx={{ mb: 4 }}>
                الدورات
              </Typography>
              <Grid container spacing={3}>
                {courses.map((course) => (
                  <Grid item key={course.id} xs={12} sm={6} md={4} lg={3}>
                    <Card
                      onClick={() =>
                        handleCourseCardClick(course.id, course.levelName)
                      }
                      onMouseEnter={() => setIsHovered(course.id)}
                      onMouseLeave={() => setIsHovered(null)}
                      sx={{
                        height: "100%",
                        boxShadow:
                          isHovered === course.id
                            ? "0 10px 20px rgba(0,0,0,0.3)"
                            : "0 4px 8px rgba(0,0,0,0.1)",
                        border: "none",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        transform:
                          isHovered === course.id
                            ? "translateY(-5px)"
                            : "translateY(0)",
                        cursor: "pointer",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="150"
                        image={course.courseImage}
                        alt={course.courseName}
                        sx={{ objectFit: "cover" }}
                      />
                      <CardContent>
                        <Typography variant="h6" align="center" gutterBottom>
                          {course.courseName}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          align="center"
                        >
                          المستوى:{" "}
                          {course.levelName === "level1"
                            ? "1"
                            : course.levelName === "level2"
                            ? "2"
                            : course.levelName === "level3"
                            ? "3"
                            : course.levelName === "level4"
                            ? "4"
                            : course.levelName === "level5"
                            ? "5"
                            : course.levelName === "level6"
                            ? "6"
                            : course.levelName === "level7"
                            ? "7"
                            : ""}
                        </Typography>

                        <Typography
                          variant="body2"
                          align="center"
                          sx={{
                            fontWeight: "bold",
                            color:
                              course.status === "new"
                                ? "success.main"
                                : course.status === "current"
                                ? "text.secondary"
                                : "text.disabled",
                          }}
                        >
                          {course.status === "new"
                            ? "جديدة"
                            : course.status === "current"
                            ? "حالية"
                            : "سابقة"}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              {coursesInfo && coursesInfo.length > 0 && (
                <>
                  <Typography variant="h5" align="center" sx={{ mt: 5, mb: 3 }}>
                    تفاصيل المواد في الدورة
                  </Typography>

                  <Grid container spacing={4}>
                    {coursesInfo.map((subject) => (
                      <Grid item md={6} xs={12} key={subject.subject_id}>
                        <Card
                          sx={{
                            height: "100%",
                            boxShadow: 2,
                            borderRadius: 3,
                          }}
                        >
                          <CardHeader
                            title={
                              <Typography
                                variant="h6"
                                align="center"
                                sx={{ color: "primary.main", mb: 2 }}
                              >
                                {subject.subject_name}
                              </Typography>
                            }
                          />

                          <CardContent>
                            {subject.marks ? (
                              <TableContainer component={Paper}>
                                <Table size="small">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell align="center">
                                        الاختبار
                                      </TableCell>
                                      <TableCell align="center">
                                        الامتحان
                                      </TableCell>
                                      <TableCell align="center">
                                        الحضور
                                      </TableCell>
                                      <TableCell align="center">
                                        المجموع
                                      </TableCell>
                                      <TableCell align="center">
                                        الحالة
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell align="center">
                                        {subject.marks.test}
                                      </TableCell>
                                      <TableCell align="center">
                                        {subject.marks.exam}
                                      </TableCell>
                                      <TableCell align="center">
                                        {subject.marks.presence}
                                      </TableCell>
                                      <TableCell align="center">
                                        <Typography fontWeight="bold">
                                          {subject.marks.total}
                                        </Typography>
                                      </TableCell>
                                      <TableCell align="center">
                                        <Typography
                                          fontWeight="bold"
                                          color={
                                            subject.marks.status ===
                                            "successful"
                                              ? "success.main"
                                              : "error.main"
                                          }
                                        >
                                          {subject.marks.status === "successful"
                                            ? "ناجح"
                                            : "راسب"}
                                        </Typography>
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            ) : (
                              <Typography
                                variant="body2"
                                align="center"
                                color="text.secondary"
                              >
                                لا يوجد علامات بعد
                              </Typography>
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfileS;
