import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Divider,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Axios } from "../../Api/axios";
import { RECEIVEDMESSAGES, OPENMESSAGE } from "../../Api/api";

const ReceivedMessagesT = () => {
  const [messages, setMessages] = useState([]);
  const [tab, setTab] = useState(0); // 0 = غير مقروءة, 1 = مقروءة
  const [openDialog, setOpenDialog] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(null);

  useEffect(() => {
    const fetchReceived = async () => {
      try {
        const res = await Axios.get(RECEIVEDMESSAGES);
        setMessages(res.data.received || []);
      } catch (err) {
        console.error("خطأ في جلب الرسائل الواردة:", err);
      }
    };
    fetchReceived();
  }, []);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentMessage(null);
  };

  const filteredMessages = messages.filter((msg) =>
    tab === 0 ? msg.open === 0 : msg.open === 1
  );

  const handleOpenMessage = async (msg) => {
    try {
      // استدعاء API لتعليم الرسالة كمقروءة
      const res = await Axios.get(`${OPENMESSAGE}/${msg.id}`);

      // تحديث الحالة محليًا
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, open: 1 } : m))
      );

      setCurrentMessage({ ...msg, open: 1 });
      setOpenDialog(true);
    } catch (err) {
      // إذا الرسالة مفتوحة مسبقًا، لا تعيد خطأ
      if (
        err.response &&
        err.response.data.message === "message is already opened"
      ) {
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, open: 1 } : m))
        );
        setCurrentMessage({ ...msg, open: 1 });
        setOpenDialog(true);
      } else {
        console.error("خطأ عند فتح الرسالة:", err);
      }
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        backgroundColor: "#fffaf5",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        📥 الرسائل الواردة
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="غير مقروءة" />
        <Tab label="مقروءة" />
      </Tabs>

      {filteredMessages.length === 0 ? (
        <Typography color="text.secondary">
          لا توجد رسائل في هذا القسم.
        </Typography>
      ) : (
        filteredMessages.map((msg) => (
          <Card
            key={msg.id}
            onClick={() => handleOpenMessage(msg)}
            sx={{
              mb: 2,
              borderRadius: 2,
              backgroundColor: msg.isRead ? "#e0e0e0" : "#f5f9ff",
              boxShadow: 1,
              cursor: "pointer",
            }}
          >
            <CardContent>
              <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                👤 من: {msg.from}{" "}
                <Typography
                  component="span"
                  color="text.secondary"
                  sx={{ fontSize: "0.9rem" }}
                >
                  ({msg.senderRole})
                </Typography>
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{ fontStyle: "italic", mb: 1 }}
              >
                {msg.subject}
              </Typography>

              <Typography sx={{ mb: 2 }}>
                {msg.content.length > 50
                  ? msg.content.substring(0, 50) + "..."
                  : msg.content}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Typography variant="caption" color="text.secondary">
                🕒 بتاريخ: {msg.receivedAt}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}

      {currentMessage && (
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>تفاصيل الرسالة</DialogTitle>
          <DialogContent dividers>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              👤 من: {currentMessage.from} ({currentMessage.senderRole})
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {currentMessage.subject}
            </Typography>
            <Typography sx={{ mb: 2 }}>{currentMessage.content}</Typography>
            <Divider />
            <Typography variant="caption" color="text.secondary">
              🕒 بتاريخ: {currentMessage.receivedAt}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>إغلاق</Button>
          </DialogActions>
        </Dialog>
      )}
    </Paper>
  );
};

export default ReceivedMessagesT;
