 import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Typography, TextField, Box, MenuItem } from "@mui/material";
//const AddCourse = ({ isOpen, onClose, token }) => {

const AddCourse = ({ isOpen, onClose }) => {
  const [courseName, setCourseName] = useState("");
  const [selectedFile, setSelectedFile] = useState({
    image: "",
  });
  const [message, setMessage] = useState("");

  //   useEffect(() => {
  //     console.log("Received token: ", token);
  //   }, [token]);

  console.log("title " + courseName);
  console.log("image " + selectedFile);

  const handleFileChange = (e) => {
    console.log("File selected: ", e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  const handleAddArticle = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      // console.log("before posting " + token);
      const response = await axios.post("", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          //Authorization: `Bearer ` + token,
        },
      });
      setMessage(response.massage);
      console.log("after posting post's message " + message);
      if (response.status === 200) {
        alert("course submitted successfully");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };

  return (
    <>
      <Modal
        show={isOpen}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
        centered
        style={{ direction: "rtl" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "260px" }}>
            أضف دورة جديدة
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddArticle}>
            <TextField
              required
              name="courseName"
              id="name"
              label="اسم الدورة"
              variant="outlined"
              onChange={(e) => {
                setSelectedFile(e.target.value);
              }}
              color="success"
              size="small"
              fullWidth
              sx={{ direction: "ltr" }}
            />
            <Form.Label style={{ marginRight: "5px", marginTop: "6px" }}>
              اختر صورة
            </Form.Label>

            <TextField
              type="file"
              required
              name="courseName"
              id="name"
              variant="outlined"
              // onChange={(e)=>{setCourseImage(e.target.value)}}
              color="success"
              size="small"
              fullWidth
              sx={{ direction: "ltr", marginTop: 1 }}
            />

            {/* 
            <Form.Group controlId="formFile">
              <Form.Label style={{ marginRight: "5px" }}>اختر صورة</Form.Label>
              <Form.Control
                type="file"
                name="img"
                onChange={handleFileChange}
                required
              />
            </Form.Group>*/}
            <Form.Text style={{ marginRight: "5px" }}>
              سيتم إنشاء الدورة فقط بإضافة جميع المعلومات
            </Form.Text>
            <Modal.Footer>
              <Button
                variant="outline-secondary"
                className="btn"
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                variant="outline-success"
                className="btn"
                type="submit"
                onClick={onClose}
              >
                Submit
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddCourse;