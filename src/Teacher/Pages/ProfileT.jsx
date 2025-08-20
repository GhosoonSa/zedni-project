import React, { useState } from "react";
import TeacherHeader from "../Components/TeacherHeader";
import { Avatar, Typography, Box, Paper } from "@mui/material";
import backgroundTabs from "/backgroundTabs.jpg";

const ProfileT = () => {
  const [user, setUser] = useState({
    userName: "John Doe",
    userImage: "/tabtab.jpg",
  });

  return (
    <>
      <TeacherHeader />
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: `url('${backgroundTabs}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          zIndex: -1,
          backdropFilter: "blur(2px)",
        }}
      />
      <Box
        sx={{
          flex: 1,
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            height: { xs: 150, sm: 250 },
            position: "relative",
            mb: { xs: 6, sm: 8 },
            boxShadow: "0 4px 20px rgba(210, 180, 140, 0.3)",
            backgroundImage: user.userImage
              ? `url(${user.userImage})`
              : "linear-gradient(45deg, #d4a017 30%, #e6c35c 90%)",
            backgroundSize: user.userImage ? "cover" : "auto",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: "inherit",
            },
          }}
        >
          <Avatar
            sx={{
              width: { xs: 80, sm: 140 },
              height: { xs: 80, sm: 140 },
              position: "absolute",
              bottom: { xs: -40, sm: -60 },
              left: { xs: 20, sm: 80 },
              border: "4px solid white",
              fontSize: { xs: "2rem", sm: "5rem" },
            }}
          >
            {user.userName?.charAt(0) || "G"}
          </Avatar>
        </Box>

        <Box
          sx={{
            pr: { xs: 0, sm: 4 },
            mt: { xs: 4, sm: 0 },
            textAlign: { xs: "center", sm: "Right" },
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: "1.8rem", sm: "2.4rem" } }}
          >
            {user.userName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            @{user.email}Ahmad
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 3,
              mt: 3,
              ml: 3,
            }}
          >
            <Paper sx={{ p: 2, flex: 1 }}>Stats{user.fatherName}</Paper>
            <Paper sx={{ p: 2, flex: 1 }}>Achievements{user.birthDate}</Paper>
            <Paper sx={{ p: 2, flex: 1 }}>Achievements{user.phoneNumber}</Paper>
            <Paper sx={{ p: 2, flex: 1 }}>Activity{user.address}</Paper>
            <Paper sx={{ p: 2, flex: 1 }}>
              Achievements{user.studyOrCarrier}
            </Paper>
            <Paper sx={{ p: 2, flex: 1 }}>Achievements{user.mojazh}</Paper>
            <Paper sx={{ p: 2, flex: 1 }}>
              Achievements{user.studyOrCarrier}
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfileT;
