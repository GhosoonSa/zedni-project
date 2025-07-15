import React, { useState, useEffect, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { userContext } from "../../Auth/ContextProvider";

const SubAdminHeader = () => {
  const { logout } = useContext(userContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredC, setIsHoveredC] = useState(false);
  const [isHoveredP, setIsHoveredP] = useState(false);
  const [isHoveredM, setIsHoveredM] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const scroll = window.scrollY;
    setIsScrolled(scroll > 100);
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //naviget to / for logout
  const handleLogOut = () => {
    try {
      logout();
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  return (
    <>
      <nav
        className={`grid grid-cols-4 mx-auto fixed top-0 left-0 right-0 z-50 transition-all ease-linear ${
          isScrolled ? "bg-amber-100 py-1 h-14" : "py-2"
        }`}
      >
        <Stack className="col-span-1 h-6 w-xl flex pt-6 mr-20">
          <img src="/small-logo.png" alt="logo" className="w-24 ml-28" />
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          className="gap-4 items-center h-6 w-xl flex col-span-2 pt-8 mr-40"
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

        <Stack
          direction="row"
          spacing={2}
          className="col-span-1 items-center h-8 w-xl flex pt-8 mr-24"
        >
          <Button onClick={handleLogOut} style={{ color: "#BC8A5F" }}>
            تسجيل خروج
          </Button>
        </Stack>
      </nav>
    </>
  );
};

export default SubAdminHeader;
