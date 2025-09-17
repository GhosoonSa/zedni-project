// InternalMail.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Paper,
  FormControl,
  OutlinedInput,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Axios } from "../../Api/axios";
import { GETTEACHERS, SENDMESSAGE } from "../../Api/api"; // 🟢 سنفترض أن GETSUBADMIN بيرجع الأساتذة
import ReceivedMessagesS from "./ReceivedMessagesS";
import SentMessagesS from "./SentMessagesS";
import StudentHeader from "../Components/StudentHeader";

const MailsS = () => {
  const [tab, setTab] = useState(0);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherID, setSelectedTeacherID] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await Axios.get(GETTEACHERS);
        console.log("📦 response:", res.data);

        let teacherData = [];

        if (Array.isArray(res.data)) {
          teacherData = res.data;
        } else if (res.data.teachers && Array.isArray(res.data.teachers)) {
          teacherData = res.data.teachers;
        } else if (res.data.teachers && typeof res.data.teachers === "object") {
          teacherData = [res.data.teachers]; // ✅ الحل
        } else if (res.data.id) {
          teacherData = [res.data];
        }

        setTeachers(teacherData);
      } catch (err) {
        console.error("خطأ في جلب الأساتذة:", err);
        setTeachers([]);
      }
    };
    fetchTeachers();
  }, []);

  const handleSend = async () => {
    if (!subject || !body) {
      alert("الرجاء إدخال الموضوع والرسالة");
      return;
    }

    if (!selectedTeacherID) {
      alert("الرجاء اختيار أستاذ واحد على الأقل");
      return;
    }

    const payload = {
      subject,
      content: body,
      receiverID: String(selectedTeacherID),
    };

    console.log("📨 payload:", payload);

    try {
      await Axios.post(SENDMESSAGE, payload);
      alert("تم إرسال الرسالة بنجاح!");
      setSubject("");
      setBody("");
      setSelectedTeacherID("");
    } catch (err) {
      console.error("خطأ أثناء الإرسال:", err);
      alert("فشل إرسال الرسالة");
    }
  };

  return (
    <>
      <StudentHeader />
      <Box
        sx={{
          p: 3,
          mt: 12,
          minHeight: "100vh",
          direction: "rtl",
          backgroundColor: "#fffaf5",
        }}
      >
        <Paper elevation={3} sx={{ p: 3, backgroundColor: "#fffaf5" }}>
          <Typography variant="h5" gutterBottom>
            البريد الداخلي
          </Typography>

          <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 2 }}>
            <Tab label="الوارد" />
            <Tab label="الصادر" />
            <Tab label="إرسال رسالة" />
          </Tabs>
          <Divider sx={{ my: 2 }} />

          {/* 📨 الوارد */}
          {tab === 0 && <ReceivedMessagesS />}

          {/* 📤 الصادر */}
          {tab === 1 && <SentMessagesS />}

          {/* ✍️ إرسال رسالة */}
          {tab === 2 && (
            <>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <Select
                  value={selectedTeacherID}
                  onChange={(e) => setSelectedTeacherID(e.target.value)}
                  displayEmpty
                  input={<OutlinedInput placeholder="اختر الأستاذ" />}
                >
                  <MenuItem disabled value="">
                    اختر الأستاذ
                  </MenuItem>
                  {teachers.map((t) => (
                    <MenuItem key={t.id} value={t.id}>
                      {t.firstAndLastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                placeholder="أدخل الموضوع هنا"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                inputProps={{ style: { textAlign: "right", direction: "rtl" } }}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                placeholder="أدخل الرسالة هنا"
                multiline
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                inputProps={{ style: { textAlign: "right", direction: "rtl" } }}
                sx={{ mb: 2 }}
              />

              <Button
                variant="contained"
                startIcon={<SendIcon />}
                onClick={handleSend}
                sx={{ backgroundColor: "#e7bc91", color: "black" }}
              ></Button>
            </>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default MailsS;
