import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Typography, TextField, Box, MenuItem } from "@mui/material";

const AddProfileImage = ({ isOpen, onClose, token }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleAddImage = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!selectedFile) {
      setMsg("يرجى اختيار صورة أولاً");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("profileImage", selectedFile);
      const response = await axios.post(
        "http://localhost:8000/api/addProfileImage",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setMsg(null);
        onClose();
      } else {
        setMsg("حدث خطأ غير متوقع أثناء الرفع.");
      }
    } catch (error) {
      console.error("add image error", error);
      setMsg(
        error?.response?.data?.message ||
          error?.message ||
          "فشل رفع الصورة. تحقق من الاتصال بالشبكة  ."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      centered
      style={{ direction: "rtl" }}
    >
      <Modal.Header closeButton style={{ backgroundColor: "#FFEDD8" }}>
        <Modal.Title style={{ marginLeft: "150px" }}>
          أضف صورة الملف الشخصي
        </Modal.Title>
      </Modal.Header>

      <form onSubmit={handleAddImage} encType="multipart/form-data">
        <Modal.Body>
          <label style={{ marginRight: "5px", marginTop: "6px" }}>
            اختر صورة
          </label>

          <TextField
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ width: "100%", marginTop: 8 }}
            variant="outlined"
            color="warning"
            size="small"
            required
          />

          {msg && (
            <div style={{ marginTop: 10, color: "#a33" }}>
              <small>{msg}</small>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" type="button" onClick={onClose}>
            إغلاق
          </Button>

          <Button
            className="btn"
            type="submit"
            disabled={loading}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              backgroundColor: isHovered ? "#FFEDD8" : "white",
              color: "black",
              border: isHovered ? "#FFEDD8" : "solid 1.5px #FFEDD8",
              margin: "10px",
              width: "100px",
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "جارٍ الرفع..." : "إضافة"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddProfileImage;
