import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Box,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
  Popper,
  Avatar,
  ListItemAvatar,
  MenuItem,
  Select,
  Button,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const CourseOptionsModal = ({
  open,
  onClose,
  course,
  showOnlyLevels = false,
  anchorEl = null,
}) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(showOnlyLevels ? 1 : 0);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [requests, setRequests] = useState([{}]);
  const authToken = localStorage.getItem("authToken");
  const courseID = course.id;

  useEffect(() => {
    //get requests:
    const fetchRequests = async (courseID) => {
      try {
        console.log("Received token: ", authToken);
        const response = await axios.get(
          `http://localhost:8000/api/admin/getJoiningRequests/${courseID}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ` + authToken,
              ContentType: "application/json",
            },
          }
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, [authToken]);

  //if the course is old show only the levels without requests
  useEffect(() => {
    setTab(showOnlyLevels ? 1 : 0);
  }, [showOnlyLevels, open]);

  const handleTabChange = (_, newVal) => setTab(newVal);

  //navigate and show the choosen level
  const handleLevelClick = (level) => {
    onClose();
    navigate("/CourseTabs", {
      state: {
        courseId: course.id,
        level: level,
        courseName: course.title,
      },
    });
  };

  //get the student info
  const handleRequestClick = async (request) => {
    setSelectedRequest(request);
    const studentID = request.student_id;
    try {
      console.log("Received token: ", authToken);
      const response = await axios.get(
        `http://localhost:8000/api/admin/getStudentInfo/${studentID}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ` + authToken,
            ContentType: "application/json",
          },
        }
      );
      setSelectedRequest(response.data);
    } catch (error) {
      console.error("Error getting user info:", error);
    }
    setSelectedLevel("");
  };

  const handleCloseRequestModal = () => {
    setSelectedRequest(null);
  };

  //assign a level for a student
  const handleAssignLevel = async (request) => {
    const studentID = request.student_id;
    //? const courseID = request.course_id;
    const formData = new FormData();
    formData.append("student_id", studentID);
    formData.append("course_id", courseID);
    formData.append("level", level);

    try {
      console.log("Received token: ", authToken);
      const response = await axios.post(
        `http://localhost:8000/api/admin/enrollStudentToLevel`,
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ` + authToken,
            ContentType: "application/json",
          },
        }
      );
      setSelectedRequest(response.data);
      // if(response.status===200)
      if (selectedRequest && selectedLevel) {
        console.log(
          `تم تعيين المستوى ${selectedLevel} للطالب ${selectedRequest.name}`
        );
        setSnackbarOpen(true);
        setRequests(
          requests.filter((req) => req.email !== selectedRequest.email)
        );
        handleCloseRequestModal();
      }
    } catch (error) {
      console.error("Error getting user info:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const LevelsList = () => (
    <Box
      sx={{
        mt: 1,
        height: "45vh",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#E7BC91",
          borderRadius: "4px",
        },
      }}
    >
      {[...Array(7)].map((_, i) => (
        <ListItemButton
          key={i + 1}
          onClick={() => handleLevelClick(i + 1)}
          sx={{
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <ListItemText
            primary={`المستوى ${i + 1}`}
            sx={{ textAlign: "right" }}
          />
        </ListItemButton>
      ))}
    </Box>
  );

  const JoinRequestsList = () => (
    <Box
      sx={{
        mt: 1,
        height: "45vh",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#E7BC91",
          borderRadius: "4px",
        },
      }}
    >
      {requests.map((request, index) => (
        <ListItemButton
          key={index}
          onClick={() => handleRequestClick(request)}
          sx={{
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <ListItemAvatar>
            <Avatar
              sx={{
                bgcolor: "#E7BC91",
                color: "#5E3023",
                fontSize: "1rem",
                width: 32,
                height: 32,
              }}
            >
              {/* {request.name.charAt(0)} */}
              {request.name}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={request.name}
            sx={{
              textAlign: "right",
              paddingRight: "8px",
            }}
            primaryTypographyProps={{
              noWrap: true,
            }}
          />
        </ListItemButton>
      ))}
    </Box>
  );

  if (showOnlyLevels) {
    return (
      <Dialog open={open} onClose={onClose} fullWidth dir="rtl">
        <DialogTitle sx={{ textAlign: "center" }}>{course?.title}</DialogTitle>
        <DialogContent>
          <LevelsList />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [150, 100],
            },
          },
          {
            name: "preventOverflow",
            options: {
              padding: 16,
              boundariesElement: "viewport",
            },
          },
        ]}
        sx={{
          zIndex: 1300,
          width: 350,
          bgcolor: "background.paper",
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid #E7BC91",
          marginLeft: "100px",
          marginTop: "200px",
          maxHeight: "70vh",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 1,
            backgroundColor: "#fffaf5",
            position: "relative",
            height: "65vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              left: 8,
              top: 8,
              color: "#d32f2f",
              "&:hover": {
                backgroundColor: "rgba(211, 47, 47, 0.08)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              p: 2,
              fontWeight: "bold",
              color: "#5E3023",
            }}
          >
            {course?.title}
          </Typography>

          <Tabs
            value={tab}
            onChange={handleTabChange}
            centered
            variant="fullWidth"
            sx={{
              mb: 1,
              "& .MuiTabs-indicator": {
                backgroundColor: "#E7BC91",
              },
            }}
          >
            <Tab label="طلبات الانضمام" sx={{ fontSize: "0.85rem" }} />
            <Tab label="مستويات الدورة" sx={{ fontSize: "0.85rem" }} />
          </Tabs>

          <Box sx={{ flex: 1, overflow: "hidden" }}>
            {tab === 0 && <JoinRequestsList />}
            {tab === 1 && <LevelsList />}
          </Box>
        </Paper>
      </Popper>

      <Dialog
        open={Boolean(selectedRequest)}
        onClose={handleCloseRequestModal}
        fullWidth
        maxWidth="xs"
        dir="rtl"
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#fffaf5",
            border: "1px solid #E7BC91",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#5E3023",
            borderBottom: "1px solid #E7BC91",
            position: "relative",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseRequestModal}
            sx={{
              position: "absolute",
              left: 8,
              top: 8,
              color: "#d32f2f",
              "&:hover": {
                backgroundColor: "rgba(211, 47, 47, 0.08)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          تفاصيل طلب الانضمام
        </DialogTitle>
        <DialogContent sx={{ pt: 6 }}>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", mb: 1 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", minWidth: 100 }}
              >
                الاسم:
              </Typography>
              <Typography variant="body1">{selectedRequest?.name}</Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 1 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", minWidth: 100 }}
              >
                اسم الأب:
              </Typography>
              <Typography variant="body1">
                {selectedRequest?.fatherName}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 1 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", minWidth: 100 }}
              >
                تاريخ الميلاد:
              </Typography>
              <Typography variant="body1">
                {selectedRequest?.birthDate}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 1 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", minWidth: 100 }}
              >
                البريد الإلكتروني:
              </Typography>
              <Typography variant="body1">{selectedRequest?.email}</Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 1 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", minWidth: 100 }}
              >
                رقم الهاتف:
              </Typography>
              <Typography variant="body1">{selectedRequest?.phone}</Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 1 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", minWidth: 100 }}
              >
                العنوان:
              </Typography>
              <Typography variant="body1">
                {selectedRequest?.address}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 1 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", minWidth: 100 }}
              >
                الشهادة/العمل:
              </Typography>
              <Typography variant="body1">
                {selectedRequest?.qualification}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 1 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", minWidth: 100 }}
              >
                حاصل على إجازة:
              </Typography>
              <Typography variant="body1">
                {selectedRequest?.isCertified ? "نعم" : "لا"}
              </Typography>
            </Box>

            <Box sx={{ mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                الدورات السابقة:
              </Typography>
              {selectedRequest?.previousCourses?.length > 0 ? (
                <ul style={{ paddingRight: "20px", margin: 0 }}>
                  {selectedRequest.previousCourses.map((course, index) => (
                    <li key={index}>
                      <Typography variant="body1">{course}</Typography>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography variant="body1">لا يوجد دورات سابقة</Typography>
              )}
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              اختر المستوى:
            </Typography>
            <Select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              fullWidth
              sx={{
                textAlign: "right",
                "& .MuiSelect-select": {
                  textAlign: "right",
                },
              }}
            >
              <MenuItem value="" disabled>
                اختر مستوى
              </MenuItem>
              {[...Array(7)].map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  المستوى {i + 1}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="contained"
              onClick={handleAssignLevel(selectedRequest)}
              disabled={!selectedLevel}
              sx={{
                backgroundColor: "#E7BC91",
                color: "#5E3023",
                "&:hover": {
                  backgroundColor: "#D8AB7F",
                },
                "&:disabled": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              تعيين المستوى
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          تم تعيين المستوى بنجاح!
        </Alert>
      </Snackbar>
    </>
  );
};

export default CourseOptionsModal;
