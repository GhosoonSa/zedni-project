import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  Typography,
  Button,
  Stack,
  TextField,
  Box,
  MenuItem,
  Checkbox,
  TextareaAutosize,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";
const StudentHeader = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredC, setIsHoveredC] = useState(false);
  const [isHoveredP, setIsHoveredP] = useState(false);
  const [isHoveredM, setIsHoveredM] = useState(false);

  const navigate = useNavigate();
  //navigate to login
  const handleLogIn = () => {
    navigate("/LogIn");
  };
  //naviget to sign in
  const handleSignIn = () => {
    navigate("/SignUP");
  };

  return (
    <>
      <nav className="grid grid-cols-4 mx-auto fixed top-0 left-0 right-0 py-2 z-50">
        <Stack
          direction="row"
          spacing={2}
          className="col-span-1 gap-4 items-center h-8 w-xl flex pt-8 ml-24"
        >
          <Button onClick={handleSignIn} style={{ color: "#BC8A5F" }}>
            إنشاء حساب
          </Button>
          <Button onClick={handleLogIn} style={{ color: "#BC8A5F" }}>
            تسجيل دخول
          </Button>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          className="gap-16 items-center h-6 w-xl flex col-span-2 pt-8 ml-40"
        >
          <NavLink
            to="/Student/CoursesS"
            style={{
              paddingLeft: "4px",
              paddingRight: "4px",
              color: isHoveredC ? "#8B5E34" : "#BC8A5F",
            }}
            onMouseEnter={() => setIsHoveredC(true)}
            onMouseLeave={() => setIsHoveredC(false)}
          >
            Courses
          </NavLink>
          <NavLink
            to="/Student/ProfileS"
            style={{
              paddingLeft: "4px",
              paddingRight: "4px",
              color: isHoveredP ? "#8B5E34" : "#BC8A5F",
            }}
            onMouseEnter={() => setIsHoveredP(true)}
            onMouseLeave={() => setIsHoveredP(false)}
          >
            Profile
          </NavLink>
          <NavLink
            to="/Student/MailsS"
            style={{
              paddingLeft: "4px",
              paddingRight: "4px",
              color: isHoveredM ? "#8B5E34" : "#BC8A5F",
            }}
            onMouseEnter={() => setIsHoveredM(true)}
            onMouseLeave={() => setIsHoveredM(false)}
          >
            Mails
          </NavLink>
        </Stack>
        <Stack className="col-span-1 h-6 w-xl flex pt-6 ml-16">
          <img src="/small-logo.png" alt="logo" className="w-24 ml-28" />
        </Stack>
      </nav>
    </>
  );
};

export default StudentHeader;
