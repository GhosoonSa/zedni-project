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
import { GETSUBADMIN, SENDMESSAGE } from "../../Api/api";
import SentMessagesAdmin from "./SentMessagesAdmin";
import ReceivedMessagesAdmin from "./ReceivedMessagesAdmin";
import AdminHeader from "../Components/AdminHeader";
// 🟢 ضيف المسارات الحقيقية لـ API عندك

const Mails = () => {
  const [tab, setTab] = useState(0);
  const [receiverTab, setReceiverTab] = useState("students");
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [students, setStudents] = useState([]);
  const [supervisors, setSupervisors] = useState([]);

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedSupervisors, setSelectedSupervisors] = useState([]);

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const [selectedReceiverID, setSelectedReceiverID] = useState(""); // 🟢 إضافة state جديد

  // ✅ جلب المشرفين
  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const res = await Axios.get(GETSUBADMIN);

        setSupervisors(res.data.subadmin || []);
        console.log(res.data.subadmin);
      } catch (err) {
        console.error("خطأ في جلب المشرفين:", err);
      }
    };
    fetchSupervisors();
  }, []);

  const handleSend = async () => {
    if (!subject || !body) {
      alert("الرجاء إدخال الموضوع والرسالة");
      return;
    }

    try {
      if (selectedSupervisors.length === 0) {
        alert("الرجاء اختيار مشرف واحد على الأقل");
        return;
      }

      // إرسال لكل مشرف على حدة
      for (let id of selectedSupervisors) {
        const payload = {
          subject,
          content: body,
          receiverID: String(id), // مهم: كل مرة نرسل ID منفصل
        };
        await Axios.post(SENDMESSAGE, payload);
      }

      alert("تم إرسال الرسالة بنجاح!");
      setSubject("");
      setBody("");
      setSelectedSupervisors([]);
    } catch (err) {
      console.error("خطأ أثناء الإرسال:", err);
      alert("فشل إرسال الرسالة");
    }
  };

  const isAllSupervisorsSelected =
    selectedSupervisors.length === supervisors.length;

  const handleToggleAllSupervisors = () => {
    if (isAllSupervisorsSelected) setSelectedSupervisors([]);
    else setSelectedSupervisors(supervisors.map((s) => s.id));
  };

  return (
    <>
      <AdminHeader />
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
          {tab === 0 && <ReceivedMessagesAdmin />}

          {/* 📤 الصادر */}
          {tab === 1 && <SentMessagesAdmin />}

          {/* ✍️ إرسال رسالة */}
          {tab === 2 && (
            <>
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Button
                  variant={
                    receiverTab === "supervisors" ? "contained" : "outlined"
                  }
                  onClick={() => setReceiverTab("supervisors")}
                >
                  المشرفين
                </Button>
              </Box>

              {receiverTab === "supervisors" && (
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Select
                    multiple
                    value={selectedSupervisors}
                    onChange={(e) => {
                      const value = e.target.value;

                      // إذا تم اختيار "all"
                      if (value.includes("all")) {
                        if (selectedSupervisors.length === supervisors.length) {
                          setSelectedSupervisors([]); // إلغاء التحديد
                        } else {
                          setSelectedSupervisors(supervisors.map((s) => s.id)); // تحديد الكل
                        }
                      } else {
                        setSelectedSupervisors(
                          value.filter((v) => v !== "all")
                        ); // تحديث القيمة بدون "all"
                      }
                    }}
                    displayEmpty
                    input={<OutlinedInput />}
                    renderValue={(selected) =>
                      selected.length === 0
                        ? "اختر المشرف"
                        : supervisors
                            .filter((s) => selected.includes(s.id))
                            .map((s) => s.firstAndLastName)
                            .join(", ")
                    }
                    MenuProps={{ PaperProps: { sx: { direction: "rtl" } } }}
                    sx={{ direction: "rtl", textAlign: "right" }}
                  >
                    <MenuItem value="all">
                      <ListItemIcon>
                        <Checkbox
                          checked={
                            selectedSupervisors.length === supervisors.length
                          }
                        />
                      </ListItemIcon>
                      تحديد الكل
                    </MenuItem>

                    {supervisors.map((s) => (
                      <MenuItem key={s.id} value={s.id}>
                        <ListItemIcon>
                          <Checkbox
                            checked={selectedSupervisors.indexOf(s.id) > -1}
                          />
                        </ListItemIcon>
                        {s.firstAndLastName}
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

export default Mails;
