import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Typography, TextField, Box, MenuItem } from "@mui/material";

const EditProfile = ({ isOpen, onClose, token, fieldName }) => {
  const [fieldValue, setFieldValue] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!fieldName || !fieldValue) {
      setMsg("يرجى إدخال الحقل والقيمة الجديدة");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append(fieldName, fieldValue);

      const response = await axios.post(
        "http://localhost:8000/api/updateProfile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setMsg(null);
        onClose();
      } else {
        setMsg("حدث خطأ غير متوقع أثناء التعديل.");
      }
    } catch (error) {
      console.error("edit profile error", error);
      setMsg(
        error?.response?.data?.message ||
          error?.message ||
          "فشل تعديل البيانات. تحقق من الخادم أو الصلاحيات."
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
        <Modal.Title style={{ marginLeft: "210px" }}>
          تعديل الملف الشخصي
        </Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Modal.Body>
          <label style={{ marginRight: "5px", marginTop: "6px" }}>
            المحتوى الجديد
          </label>
          <TextField
            type="text"
            onChange={(e) => setFieldValue(e.target.value)}
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
          {/* Make sure this is NOT a submit button */}
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

export default EditProfile;
