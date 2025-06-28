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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const CourseOptionsModal = ({
  open,
  onClose,
  course,
  showOnlyLevels = false,
}) => {
  const navigate = useNavigate();

  const [tab, setTab] = useState(showOnlyLevels ? 1 : 0);

  useEffect(() => {
    setTab(showOnlyLevels ? 1 : 0);
  }, [showOnlyLevels, open]);

  const handleTabChange = (_, newVal) => setTab(newVal);

  const handleLevelClick = (level) => {
    onClose(); 
    setTimeout(() => {
      navigate(
        `/CourseTabs?courseId=${course.id}&level=${level}&courseName=${encodeURIComponent(
          course.title,
        )}`,
      );
    }, 0);
  };

  const LevelsList = () => (
    <Box sx={{ mt: 1 }}>
      {[...Array(7)].map((_, i) => (
        <ListItemButton key={i + 1} onClick={() => handleLevelClick(i + 1)}>
          <ListItemText primary={`المستوى ${i + 1}`} />
        </ListItemButton>
      ))}
    </Box>
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth dir="rtl">
      <DialogTitle sx={{ textAlign: "center" }}>{course?.title}</DialogTitle>

      <DialogContent>
        {showOnlyLevels ? (
          <LevelsList />
        ) : (
          <>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              centered
              variant="fullWidth"
            >
              <Tab label="طلبات الانضمام" />
              <Tab label="مستويات الدورة" />
            </Tabs>
            {tab === 1 && <LevelsList />}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CourseOptionsModal;
