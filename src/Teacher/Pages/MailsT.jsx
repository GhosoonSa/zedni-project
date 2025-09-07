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
import TeacherHeader from "../Components/TeacherHeader";
import { Axios } from "../../Api/axios";
import {
  GETSUBADMIN,
  GETLEVELFORTEACHER,
  GETSTUDENTINLEVEL,
  SENDMESSAGE,
} from "../../Api/api";
import SentMessagesT from "./SentMessagesT";
import ReceivedMessagesT from "./ReceivedMessagesT";
// 🟢 ضيف المسارات الحقيقية لـ API عندك

const InternalMail = () => {
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

  // ✅ جلب المستويات التي يدرّسها الأستاذ
  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const res = await Axios.get(GETLEVELFORTEACHER);
        console.log("المستويات:", res.data.levels); // تحقق من اسم الحقل
        setLevels(res.data.levels || []);
      } catch (err) {
        console.error("خطأ في جلب المستويات:", err);
      }
    };
    fetchLevels();
  }, []);

  // ✅ جلب الطلاب بناء على المستوى
  useEffect(() => {
    if (!selectedLevel) return;
    const fetchStudents = async () => {
      try {
        const res = await Axios.get(`${GETSTUDENTINLEVEL}/${selectedLevel}`);
        setStudents(res.data.students || []);
        console.log(res.data.students);
      } catch (err) {
        console.error("خطأ في جلب الطلاب:", err);
      }
    };
    fetchStudents();
  }, [selectedLevel]);

  const handleSend = async () => {
    if (!subject || !body) {
      alert("الرجاء إدخال الموضوع والرسالة");
      return;
    }

    let receivers =
      receiverTab === "students" ? selectedStudents : selectedSupervisors;

    if (!receivers.length) {
      alert("الرجاء اختيار مستلم واحد على الأقل");
      return;
    }

    try {
      for (let id of receivers) {
        let payload = {
          subject,
          content: body,
          receiverID: String(id), // 🟢 سيرفر يريد string واحد فقط
        };
        await Axios.post(SENDMESSAGE, payload);
      }
      alert("✅ تم إرسال الرسالة لجميع المستلمين");
      setSubject("");
      setBody("");
      setSelectedStudents([]);
      setSelectedSupervisors([]);
    } catch (err) {
      console.error("خطأ أثناء الإرسال:", err);
      alert("❌ فشل إرسال الرسالة");
    }
  };

  const isAllStudentsSelected = selectedStudents.length === students.length;
  const isAllSupervisorsSelected =
    selectedSupervisors.length === supervisors.length;

  const handleToggleAllStudents = () => {
    if (isAllStudentsSelected) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students.map((s) => s.id));
    }
  };

  const handleToggleAllSupervisors = () => {
    if (isAllSupervisorsSelected) setSelectedSupervisors([]);
    else setSelectedSupervisors(supervisors.map((s) => s.id));
  };

  return (
    <>
      <TeacherHeader />
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
          {tab === 0 && <ReceivedMessagesT />}

          {/* 📤 الصادر */}
          {tab === 1 && <SentMessagesT />}

          {/* ✍️ إرسال رسالة */}
          {tab === 2 && (
            <>
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Button
                  variant={
                    receiverTab === "students" ? "contained" : "outlined"
                  }
                  onClick={() => setReceiverTab("students")}
                >
                  الطلاب
                </Button>
                <Button
                  variant={
                    receiverTab === "supervisors" ? "contained" : "outlined"
                  }
                  onClick={() => setReceiverTab("supervisors")}
                >
                  المشرفين
                </Button>
              </Box>

              {receiverTab === "students" && (
                <>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      displayEmpty
                      input={<OutlinedInput />}
                    >
                      <MenuItem disabled value="">
                        اختر المستوى
                      </MenuItem>
                      {levels.map((lvl) => (
                        <MenuItem key={lvl.id} value={lvl.id}>
                          {lvl.levelName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {selectedLevel && (
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <Select
                        multiple
                        value={selectedStudents}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.includes("all")) {
                            // إذا تم اختيار "all"، نحدد كل الطلاب أو نلغيهم حسب الحالة الحالية
                            if (isAllStudentsSelected) {
                              setSelectedStudents([]);
                            } else {
                              setSelectedStudents(students.map((s) => s.id));
                            }
                          } else {
                            setSelectedStudents(value);
                          }
                        }}
                        displayEmpty
                        input={<OutlinedInput />}
                        renderValue={(selected) =>
                          selected.length === 0
                            ? "اختر الطلاب"
                            : students
                                .filter((s) => selected.includes(s.id))
                                .map((s) => s.firstAndLastName)
                                .join(", ")
                        }
                        MenuProps={{ PaperProps: { sx: { direction: "rtl" } } }}
                        sx={{ direction: "rtl", textAlign: "right" }}
                      >
                        <MenuItem value="all">
                          <ListItemIcon>
                            <Checkbox checked={isAllStudentsSelected} />
                          </ListItemIcon>
                          تحديد الكل
                        </MenuItem>

                        {students.map((s) => (
                          <MenuItem key={s.id} value={s.id}>
                            <ListItemIcon>
                              <Checkbox
                                checked={selectedStudents.indexOf(s.id) > -1}
                              />
                            </ListItemIcon>
                            {s.firstAndLastName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </>
              )}

              {receiverTab === "supervisors" && (
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Select
                    multiple
                    value={selectedSupervisors}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.includes("all")) {
                        if (isAllSupervisorsSelected) {
                          setSelectedSupervisors([]);
                        } else {
                          setSelectedSupervisors(supervisors.map((s) => s.id));
                        }
                      } else {
                        setSelectedSupervisors(value);
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
                        <Checkbox checked={isAllSupervisorsSelected} />
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

export default InternalMail;
