import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Paper,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  ListItemIcon,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

// بيانات ثابتة للتجربة
const mockStudents = [
  { id: 1, name: "الطالب أحمد" },
  { id: 2, name: "الطالبة سارة" },
  { id: 3, name: "الطالبة مريم" },
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
  const [tab, setTab] = useState(0); // 0 وارد - 1 صادر - 2 إنشاء رسالة
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sentMessages, setSentMessages] = useState([]); // حفظ الرسائل الصادرة

  const allStudentNames = mockStudents.map((s) => s.name);
  const isAllSelected = selectedStudents.length === mockStudents.length;

  const handleToggleAll = () => {
    if (isAllSelected) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(allStudentNames);
    }
  };

  const handleSend = () => {
    if (!subject || !body || selectedStudents.length === 0) {
      alert("الرجاء إدخال جميع الحقول واختيار الطلاب");
      return;
    }

    const payload = {
      to: selectedStudents,
      subject,
      body,
    };

    console.log("📤 سيتم إرسال:", payload);

    // حفظ الرسالة في الصادر
    setSentMessages((prev) => [...prev, payload]);

    // تفريغ الحقول بعد الإرسال
    setSubject("");
    setBody("");
    setSelectedStudents([]);
    setTab(1); // الانتقال إلى تبويب الصادر تلقائياً
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#fffaf5", minHeight: "100vh" }}>
      <Paper
        elevation={3}
        sx={{
          my: 4,
          p: 3,
          backgroundColor: "#fffaf5",
          textAlign: "right",
        }}
        dir="rtl"
      >
        <Typography variant="h5" gutterBottom>
          البريد الداخلي
        </Typography>
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label="الوارد" />
          <Tab label="الصادر" />
          <Tab label="رسالة جديدة" />
        </Tabs>
        <Divider sx={{ my: 2 }} />

        {/* الوارد */}
        {tab === 0 && (
          <List>
            {mockInbox.map((msg) => (
              <ListItem
                key={msg.id}
                sx={{ mb: 2, borderBottom: "1px solid #eee" }}
              >
                <ListItemText
                  primary={`${msg.from} - ${msg.subject}`}
                  secondary={msg.body}
                />
              </ListItem>
            ))}
          </List>
        )}

        {/* الصادر */}
        {tab === 1 && (
          <List>
            {sentMessages.map((msg, idx) => (
              <ListItem
                key={idx}
                sx={{ mb: 2, borderBottom: "1px solid #eee" }}
              >
                <ListItemText
                  primary={`إلى: ${msg.to.join(", ")} - ${msg.subject}`}
                  secondary={msg.body}
                />
              </ListItem>
            ))}
          </List>
        )}

        {/* رسالة جديدة */}
        {tab === 2 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>اختر الطلاب</InputLabel>
              <Select
                multiple
                value={selectedStudents}
                onChange={(e) => setSelectedStudents(e.target.value)}
                input={<OutlinedInput label="اختر الطلاب" />}
                renderValue={(selected) => selected.join(", ")}
              >
                {/* خيار تحديد الكل */}
                <MenuItem value="all" onClick={handleToggleAll}>
                  <ListItemIcon>
                    <Checkbox checked={isAllSelected} />
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

            <TextField
              label="الموضوع"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              fullWidth
            />
            <TextField
              label="الرسالة"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              multiline
              rows={4}
              fullWidth
            />
            <Button
              variant="contained"
              startIcon={<SendIcon />}
              onClick={handleSend}
              sx={{ backgroundColor: "#e7bc91", color: "black" }}
            >
              إرسال
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default InternalMail;
