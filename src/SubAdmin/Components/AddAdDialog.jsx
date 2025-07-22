import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const AddAdDialog = ({ open, onClose, onSave, authToken }) => {
  const [newAdImage, setNewAdImage] = useState({
    image: "",
  });
  const [image, setImage] = useState(null);
  const [newAdText, setNewAdText] = useState("");
  const role = localStorage.getItem("role");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setNewAdImage(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("image", newAdImage);
      formData.append("description", newAdText);
      console.log("formData: " + formData);
      console.log("token:" + authToken);
      console.log("role: " + role);
      const response = await axios.post(
        "http://localhost:8000/api/subadmin/createAnnouncementCourse",
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ` + authToken,
            ContentType: "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        alert("تم إضافة الإعلان بنجاح!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error posting Ad info:", error);
    }
    if (!newAdImage) return;
    onSave({
      image: newAdImage,
      text: newAdText,
    });
    setNewAdImage(null);
    setNewAdText("");
    onClose();
  };

  const handleClose = () => {
    setNewAdImage(null);
    setNewAdText("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          handleClose();
        }
      }}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle
        sx={{
          backgroundColor: "#f8f4e9",
          borderBottom: "2px solid #E7BC91",
          py: 2,
          px: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#5a3e1b",
            fontWeight: "bold",
            fontFamily: "'Tajawal', sans-serif",
          }}
        >
          إنشاء إعلان جديد
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon sx={{ color: "#5a3e1b" }} />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          py: 3,
          px: 3,
          backgroundColor: "#fffaf5",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <input
            accept="image/*"
            id="ad-image-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <label htmlFor="ad-image-upload">
            <Button
              variant="outlined"
              component="span"
              fullWidth
              sx={{
                border: "2px dashed #E7BC91",
                backgroundColor: "rgba(231, 188, 145, 0.1)",
                color: "#5a3e1b",
                py: 2,
                "&:hover": {
                  border: "2px dashed #d2a679",
                  backgroundColor: "rgba(231, 188, 145, 0.2)",
                },
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                اختر صورة للإعلان
              </Typography>
            </Button>
          </label>
        </Box>

        {image && (
          <Box
            sx={{
              mb: 4,
              height: "400px",
              borderRadius: "12px",
              overflow: "hidden",
              border: "2px solid #E7BC91",
              position: "relative",
            }}
          >
            <img
              src={image}
              alt="معاينة الإعلان"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        )}

        <TextField
          label="نص الإعلان (اختياري)"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={newAdText}
          onChange={(e) => setNewAdText(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#E7BC91",
                borderWidth: 2,
              },
              "&:hover fieldset": {
                borderColor: "#d2a679",
              },
            },
          }}
        />
      </DialogContent>

      <DialogActions
        sx={{
          backgroundColor: "#f8f4e9",
          borderTop: "2px solid #E7BC91",
          py: 2,
          px: 3,
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            color: "#5a3e1b",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "rgba(122, 81, 22, 0.1)",
            },
          }}
        >
          إلغاء
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!newAdImage}
          sx={{
            backgroundColor: "#5a3e1b",
            px: 4,
            py: 1,
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#7b3f00",
            },
            "&:disabled": {
              backgroundColor: "#e0d6c2",
            },
          }}
        >
          نشر الإعلان
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAdDialog;
