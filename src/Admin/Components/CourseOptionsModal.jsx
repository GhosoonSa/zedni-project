import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Box,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CourseOptionsModal = ({ open, onClose, course }) => {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (_, value) => {
    if (value === 0) {
      navigate(
        `/CourseTabs?courseId=${course.id}&tab=joining&courseName=${encodeURIComponent(
          course.title
        )}`
      );
      onClose();
    } else {
      setTab(value);
    }
  };

  const handleLevelClick = (level) => {
    navigate(
      `/CourseTabs?courseId=${course.id}&level=${level}&courseName=${encodeURIComponent(
        course.title
      )}`
    );
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth dir="rtl">
      <DialogTitle sx={{ textAlign: "center" }}>{course?.title}</DialogTitle>

      <DialogContent>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          centered
          variant="fullWidth"
        >
          <Tab label="طلبات الانضمام" />
          <Tab label="مستويات الدورة" />
        </Tabs>

        {tab === 1 && (
          <Box sx={{ mt: 1 }}>
            {[...Array(7)].map((_, i) => (
              <ListItemButton
                key={i + 1}
                onClick={() => handleLevelClick(i + 1)}
              >
                <ListItemText primary={`المستوى ${i + 1}`} />
              </ListItemButton>
            ))}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CourseOptionsModal;
