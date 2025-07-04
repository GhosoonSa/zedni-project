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
  const [requests, setRequests] = useState([
    {
      name: "أحمد محمد",
      email: "ahmed@example.com",
      fatherName: "محمد عبدالله",
      phone: "0912345678",
      address: "دمشق - المزة",
      birthDate: "1995-05-15",
      qualification: "بكالوريوس في الشريعة",
      isCertified: true,
      previousCourses: ["الفقه الأساسي", "أصول الفقه"],
    },
    {
      name: "سارة علي",
      email: "sara@example.com",
      fatherName: "علي محمود",
      phone: "0934567890",
      address: "دمشق - القابون",
      birthDate: "1998-08-22",
      qualification: "طالبة جامعية",
      isCertified: false,
      previousCourses: ["التجويد"],
    },
    {
      name: "خالد عبدالله",
      email: "khaled@example.com",
      fatherName: "عبدالله أحمد",
      phone: "0945678901",
      address: "دمشق - قدسيا",
      birthDate: "1990-03-10",
      qualification: "إمام مسجد",
      isCertified: true,
      previousCourses: ["الفقه", "التفسير", "الحديث"],
    },
    {
      name: "بيان",
      email: "bayyan@example.com",
      fatherName: "محمود حسن",
      phone: "0956789012",
      address: "دمشق - الميدان",
      birthDate: "1993-11-05",
      qualification: "مدرسة",
      isCertified: false,
      previousCourses: [],
    },
    {
      name: "نور",
      email: "nour@example.com",
      fatherName: "محمود ",
      phone: "0956779012",
      address: "دمشق ",
      birthDate: "1983-11-05",
      qualification: "مدرسة",
      isCertified: false,
      previousCourses: [],
    },
    {
      name: "اية",
      email: "aya@example.com",
      fatherName: " حسن",
      phone: "0956749012",
      address: " الميدان",
      birthDate: "1999-11-05",
      qualification: "مدرسة",
      isCertified: false,
      previousCourses: [],
    },
    {
      name: "راية",
      email: "raya@example.com",
      fatherName: "محمود ",
      phone: "0996789012",
      address: " الميدان",
      birthDate: "1999-11-05",
      qualification: "مدرسة",
      isCertified: false,
      previousCourses: [],
    },
      {
      name: "شمس",
      email: "ya@example.com",
      fatherName: "محمود ",
      phone: "0906789012",
      address: " الميدان",
      birthDate: "1979-11-05",
      qualification: "مدرسة",
      isCertified: false,
      previousCourses: [],
    },
  ]);

  useEffect(() => {
    setTab(showOnlyLevels ? 1 : 0);
  }, [showOnlyLevels, open]);

  const handleTabChange = (_, newVal) => setTab(newVal);

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

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setSelectedLevel("");
  };

  const handleCloseRequestModal = () => {
    setSelectedRequest(null);
  };

  const handleAssignLevel = () => {
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
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const LevelsList = () => (
    <Box sx={{ 
      mt: 1,
      height: '45vh',
      overflowY: 'auto',
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#E7BC91",
        borderRadius: "4px",
      },
    }}>
      {[...Array(7)].map((_, i) => (
        <ListItemButton 
          key={i + 1} 
          onClick={() => handleLevelClick(i + 1)}
          sx={{
            '&:hover': {
              backgroundColor: '#f5f5f5',
            }
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
        height: '45vh',
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
              {request.name.charAt(0)}
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
              boundariesElement: 'viewport',
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
          maxHeight: '70vh',
        }}
      >
        <Paper
          elevation={0}
          sx={{ 
            p: 1, 
            backgroundColor: "#fffaf5", 
            position: "relative",
            height: '65vh',
            display: 'flex',
            flexDirection: 'column',
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

          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            {tab === 0 && <JoinRequestsList />}
            {tab === 1 && <LevelsList />}
          </Box>
        </Paper>
      </Popper>

      <Dialog
        open={Boolean(selectedRequest)}
        onClose={handleCloseRequestModal}
        fullWidth
        maxWidth="sm"
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
              <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 100 }}>
                الاسم:
              </Typography>
              <Typography variant="body1">{selectedRequest?.name}</Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 100 }}>
                اسم الأب:
              </Typography>
              <Typography variant="body1">
                {selectedRequest?.fatherName}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 100 }}>
                تاريخ الميلاد:
              </Typography>
              <Typography variant="body1">
                {selectedRequest?.birthDate}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 100 }}>
                البريد الإلكتروني:
              </Typography>
              <Typography variant="body1">{selectedRequest?.email}</Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 100 }}>
                رقم الهاتف:
              </Typography>
              <Typography variant="body1">{selectedRequest?.phone}</Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 100 }}>
                العنوان:
              </Typography>
              <Typography variant="body1">
                {selectedRequest?.address}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 100 }}>
                الشهادة/العمل:
              </Typography>
              <Typography variant="body1">
                {selectedRequest?.qualification}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 100 }}>
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
              onClick={handleAssignLevel}
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