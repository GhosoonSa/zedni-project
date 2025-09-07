import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { Axios } from "../../Api/axios";
import { SENTMESSAGES } from "../../Api/api";

const SentMessagesSubAdmin = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchSent = async () => {
      try {
        const res = await Axios.get(SENTMESSAGES);
        setMessages(res.data.sent || []);
      } catch (err) {
        console.error("خطأ في جلب الرسائل المرسلة:", err);
      }
    };
    fetchSent();
  }, []);

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
        📤 الرسائل الصادرة
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {messages.length === 0 ? (
        <Typography color="text.secondary">لا توجد رسائل مرسلة.</Typography>
      ) : (
        messages.map((msg) => (
          <Card
            key={msg.id}
            sx={{
              mb: 2,
              borderRadius: 2,
              backgroundColor: "#fdf7f3",
              boxShadow: 1,
            }}
          >
            <CardContent>
              <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                📩 إلى: {msg.to}{" "}
                <Typography
                  component="span"
                  color="text.secondary"
                  sx={{ fontSize: "0.9rem" }}
                >
                  ({msg.receiverRole})
                </Typography>
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{ fontStyle: "italic", mb: 1 }}
              >
                {msg.subject}
              </Typography>

              <Typography sx={{ mb: 2 }}>{msg.content}</Typography>

              <Divider sx={{ my: 1 }} />

              <Typography variant="caption" color="text.secondary">
                🕒 بتاريخ: {msg.sentAt}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Paper>
  );
};

export default SentMessagesSubAdmin;
