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
  Checkbox,
  ListItemIcon,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Axios } from "../../Api/axios";
import { GETSUBADMIN, GETTEACHERS, SENDMESSAGE } from "../../Api/api";
import ReceivedMessagesSubAdmin from "./ReceivedMessagesSubAdmin";
import SentMessagesSubAdmin from "./SentMessagesSubAdmin";
import SubAdminHeader from "../Components/SubAdminHeader";

const MailsSA = () => {
  const [tab, setTab] = useState(0);
  const [receiverType, setReceiverType] = useState("teacher"); // teacher | admin

  const [teachers, setTeachers] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState([]);

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  // 🟢 ID المدير (ثابت من الـ API عندك)
  const ADMIN_ID = 1;

  // جلب الأساتذة
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await Axios.get(GETTEACHERS); // أو GETSUBADMIN لو دا endpoint الصحيح
        console.log("📦 response (teachers):", res.data);

        let teacherData = [];

        if (Array.isArray(res.data)) {
          teacherData = res.data;
        } else if (res.data.teachers && Array.isArray(res.data.teachers)) {
          teacherData = res.data.teachers;
        } else if (res.data.teachers && typeof res.data.teachers === "object") {
          teacherData = [res.data.teachers];
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

    try {
      if (receiverType === "teacher") {
        if (selectedTeachers.length === 0) {
          alert("الرجاء اختيار أستاذ واحد على الأقل");
          return;
        }

        // إرسال لكل أستاذ محدد
        for (let id of selectedTeachers) {
          const payload = { subject, content: body, receiverID: String(id) };
          await Axios.post(SENDMESSAGE, payload);
        }
      } else if (receiverType === "admin") {
        const payload = {
          subject,
          content: body,
          receiverID: String(ADMIN_ID),
        };
        await Axios.post(SENDMESSAGE, payload);
      }

      alert("تم إرسال الرسالة بنجاح!");
      setSubject("");
      setBody("");
      setSelectedTeachers([]);
    } catch (err) {
      console.error("خطأ أثناء الإرسال:", err);
      alert("فشل إرسال الرسالة");
    }
  };

  return (
    <>
      <SubAdminHeader />
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

          {tab === 0 && <ReceivedMessagesSubAdmin />}
          {tab === 1 && <SentMessagesSubAdmin />}

          {tab === 2 && (
            <>
              {/* 🟢 اختيار نوع المستقبل */}
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Button
                  variant={
                    receiverType === "teacher" ? "contained" : "outlined"
                  }
                  onClick={() => setReceiverType("teacher")}
                >
                  الأساتذة
                </Button>
                <Button
                  variant={receiverType === "admin" ? "contained" : "outlined"}
                  onClick={() => setReceiverType("admin")}
                >
                  المدير
                </Button>
              </Box>

              {/* 🟢 إذا اخترت الأساتذة */}
              {receiverType === "teacher" && (
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Select
                    multiple
                    value={selectedTeachers}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.includes("all")) {
                        if (selectedTeachers.length === teachers.length) {
                          setSelectedTeachers([]);
                        } else {
                          setSelectedTeachers(teachers.map((t) => t.id));
                        }
                      } else {
                        setSelectedTeachers(value);
                      }
                    }}
                    displayEmpty
                    input={<OutlinedInput />}
                    renderValue={(selected) =>
                      selected.length === 0
                        ? "اختر الأستاذ"
                        : teachers
                            .filter((t) => selected.includes(t.id))
                            .map((t) => t.firstAndLastName)
                            .join(", ")
                    }
                    MenuProps={{ PaperProps: { sx: { direction: "rtl" } } }}
                    sx={{ direction: "rtl", textAlign: "right" }}
                  >
                    <MenuItem value="all">
                      <ListItemIcon>
                        <Checkbox
                          checked={selectedTeachers.length === teachers.length}
                        />
                      </ListItemIcon>
                      تحديد الكل
                    </MenuItem>

                    {teachers.map((t) => (
                      <MenuItem key={t.id} value={t.id}>
                        <ListItemIcon>
                          <Checkbox
                            checked={selectedTeachers.indexOf(t.id) > -1}
                          />
                        </ListItemIcon>
                        {t.firstAndLastName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

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

export default MailsSA;
