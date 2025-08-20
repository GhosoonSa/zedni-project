import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";

const SubAdminLevelsModal = ({ open, onClose, course, onLevelSelect }) => {
  const handleLevelClick = (level) => {
    onLevelSelect(level);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      dir="rtl"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "12px",
          backgroundColor: "#fffaf5",
          border: "2px solid #E7BC91",
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#5a3e1b",
          backgroundColor: "#f8f4e9",
          borderBottom: "1px solid #E7BC91",
        }}
      >
        {course?.courseName || "الدورة"} - اختر المستوى
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <Box
          sx={{
            mt: 1,
            maxHeight: "60vh",
            overflowY: "auto",
            "&::-webkit-scrollbar": { width: "8px" },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#E7BC91",
              borderRadius: "4px",
            },
          }}
        >
          {[...Array(7)].map((_, i) => (
            <ListItemButton
              key={i + 1}
              onClick={() => handleLevelClick(`level${i + 1}`)}
              sx={{
                "&:hover": { backgroundColor: "#f5f5f5" },
                borderBottom: "1px solid #f0e6d6",
              }}
            >
              <ListItemText
                primary={`المستوى ${i + 1}`}
                sx={{
                  textAlign: "right",
                  "& .MuiTypography-root": {
                    fontWeight: "500",
                    color: "#5a3e1b",
                  },
                }}
              />
            </ListItemButton>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SubAdminLevelsModal;
