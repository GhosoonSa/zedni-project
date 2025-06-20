import React, { useState, useEffect } from "react";
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
const SubAdminHeader = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredC, setIsHoveredC] = useState(false);
  const [isHoveredP, setIsHoveredP] = useState(false);
  const [isHoveredM, setIsHoveredM] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const scroll = window.scrollY;
    setIsScrolled(scroll > 200);
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navigate = useNavigate();
  //navigate to login
  const handleLogIn = () => {
    navigate("/LogIn");
  };
  //naviget to sign in
  const handleSignIn = () => {
    navigate("/SignUp");
  };
  return (
    <>
      <nav
        className={`grid grid-cols-4 mx-auto fixed top-0 left-0 right-0 z-50 transition-all ease-linear ${
          isScrolled ? "bg-amber-100 py-1 h-14" : "py-2"
        }`}
      >
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
          className="gap-4 items-center h-6 w-xl flex col-span-2 pt-8 ml-40"
        >
          <NavLink
            to="/CoursesSA"
            style={{
              paddingLeft: "4px",
              paddingRight: "4px",
              color: isHoveredC ? "#8B5E34" : "#BC8A5F",
              textDecoration: "none",
            }}
            onMouseEnter={() => setIsHoveredC(true)}
            onMouseLeave={() => setIsHoveredC(false)}
          >
            الدورات
          </NavLink>
          <NavLink
            to="/ProfileSA"
            style={{
              paddingLeft: "4px",
              paddingRight: "4px",
              color: isHoveredP ? "#8B5E34" : "#BC8A5F",
              textDecoration: "none",
            }}
            onMouseEnter={() => setIsHoveredP(true)}
            onMouseLeave={() => setIsHoveredP(false)}
          >
            الملف الشخصي
          </NavLink>
          <NavLink
            to="/MailsSA"
            style={{
              paddingLeft: "4px",
              paddingRight: "4px",
              color: isHoveredM ? "#8B5E34" : "#BC8A5F",
              textDecoration: "none",
            }}
            onMouseEnter={() => setIsHoveredM(true)}
            onMouseLeave={() => setIsHoveredM(false)}
          >
            البريد
          </NavLink>
          <NavLink
            to="/MailsSA"
            style={{
              paddingLeft: "4px",
              paddingRight: "4px",
              color: isHovered ? "#8B5E34" : "#BC8A5F",
              textDecoration: "none",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            الطلاب
          </NavLink>
        </Stack>
        <Stack className="col-span-1 h-6 w-xl flex pt-6 ml-16">
          <img src="/small-logo.png" alt="logo" className="w-24 ml-28" />
        </Stack>
      </nav>
    </>
  );
};

export default SubAdminHeader;
