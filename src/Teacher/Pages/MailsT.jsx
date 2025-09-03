import React, { useState } from "react";
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

const mockStudents = [
  { id: 1, name: "الطالب أحمد" },
  { id: 2, name: "الطالبة سارة" },
  { id: 3, name: "الطالبة مريم" },
];

const mockSupervisors = [
  { id: 1, name: "المشرف أحمد" },
  { id: 2, name: "المشرفة فاطمة" },
];

const mockInbox = [
  {
    id: 1,
    from: "الأستاذة فاطمة",
    subject: "مرحبًا بكم",
    body: "أهلاً في الدورة",
  },
  {
    id: 2,
    from: "المشرف أحمد",
    subject: "تنبيه",
    body: "يرجى الالتزام بالمواعيد",
  },
];

const InternalMail = () => {
  const [tab, setTab] = useState(0);
  const [receiverTab, setReceiverTab] = useState("students");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedSupervisors, setSelectedSupervisors] = useState([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sentMessages, setSentMessages] = useState([]);

  const isAllStudentsSelected = selectedStudents.length === mockStudents.length;
  const isAllSupervisorsSelected =
    selectedSupervisors.length === mockSupervisors.length;

  const handleToggleAllStudents = () => {
    if (isAllStudentsSelected) setSelectedStudents([]);
    else setSelectedStudents(mockStudents.map((s) => s.name));
  };

  const handleToggleAllSupervisors = () => {
    if (isAllSupervisorsSelected) setSelectedSupervisors([]);
    else setSelectedSupervisors(mockSupervisors.map((s) => s.name));
  };

  const handleSend = () => {
    if (
      !subject ||
      !body ||
      (selectedStudents.length === 0 && selectedSupervisors.length === 0)
    ) {
      alert("الرجاء إدخال الموضوع والرسالة واختيار المستلمين");
      return;
    }

    const payload = {
      to: [...selectedStudents, ...selectedSupervisors],
      subject,
      body,
    };

    setSentMessages((prev) => [...prev, payload]);
    setSubject("");
    setBody("");
    setSelectedStudents([]);
    setSelectedSupervisors([]);
    alert("تم إرسال الرسالة بنجاح!");
    setTab(1);
  };

  return (
    <>
      <TeacherHeader />
      <Box
        sx={{
          p: 3,
          mt: 7,
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

          {tab === 0 && (
            <>
              {mockInbox.map((msg) => (
                <Box
                  key={msg.id}
                  sx={{
                    mb: 2,
                    p: 2,
                    border: "1px solid #eee",
                    borderRadius: 1,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    {msg.from}
                  </Typography>
                  <Typography sx={{ fontStyle: "italic" }}>
                    {msg.subject}
                  </Typography>
                  <Typography>{msg.body}</Typography>
                </Box>
              ))}
            </>
          )}

          {tab === 1 && (
            <>
              {sentMessages.map((msg, idx) => (
                <Box
                  key={idx}
                  sx={{
                    mb: 2,
                    p: 2,
                    border: "1px solid #eee",
                    borderRadius: 1,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    إلى: {msg.to.join(", ")}
                  </Typography>
                  <Typography sx={{ fontStyle: "italic" }}>
                    {msg.subject}
                  </Typography>
                  <Typography>{msg.body}</Typography>
                </Box>
              ))}
            </>
          )}

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
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Select
                    multiple
                    value={selectedStudents}
                    onChange={(e) => setSelectedStudents(e.target.value)}
                    input={<OutlinedInput placeholder="اختر الطلاب" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={{ PaperProps: { sx: { direction: "rtl" } } }}
                    sx={{ direction: "rtl", textAlign: "right" }}
                  >
                    <MenuItem value="all" onClick={handleToggleAllStudents}>
                      <ListItemIcon>
                        <Checkbox checked={isAllStudentsSelected} />
                      </ListItemIcon>
                      تحديد الكل
                    </MenuItem>
                    {mockStudents.map((s) => (
                      <MenuItem key={s.id} value={s.name}>
                        <ListItemIcon>
                          <Checkbox
                            checked={selectedStudents.indexOf(s.name) > -1}
                          />
                        </ListItemIcon>
                        {s.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {receiverTab === "supervisors" && (
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Select
                    multiple
                    value={selectedSupervisors}
                    onChange={(e) => setSelectedSupervisors(e.target.value)}
                    input={<OutlinedInput placeholder="اختر المشرفين" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={{ PaperProps: { sx: { direction: "rtl" } } }}
                    sx={{ direction: "rtl", textAlign: "right" }}
                  >
                    <MenuItem value="all" onClick={handleToggleAllSupervisors}>
                      <ListItemIcon>
                        <Checkbox checked={isAllSupervisorsSelected} />
                      </ListItemIcon>
                      تحديد الكل
                    </MenuItem>
                    {mockSupervisors.map((s) => (
                      <MenuItem key={s.id} value={s.name}>
                        <ListItemIcon>
                          <Checkbox
                            checked={selectedSupervisors.indexOf(s.name) > -1}
                          />
                        </ListItemIcon>
                        {s.name}
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
              >
                إرسال
              </Button>
            </>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default InternalMail;
