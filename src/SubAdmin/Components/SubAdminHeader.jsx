import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Button, Stack, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { userContext } from "../../Auth/ContextProvider";

const SubAdminHeader = () => {
  const { logout } = useContext(userContext);
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHoveredC, setIsHoveredC] = useState(false);
  const [isHoveredP, setIsHoveredP] = useState(false);
  const [isHoveredM, setIsHoveredM] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = () => {
    try {
      logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 items-center justify-between  ${
        isScrolled || open ? "bg-amber-100 h-20" : "h-20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          <div className="flex-shrink-0">
            <img
              src="/logo.png"
              alt="logo"
              className={`w-16 h-20 ${
                isScrolled || open ? "pt-1 mr-0 " : "pt-2 sm:mr-10"
              } `}
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex space-x-14 items-center  pt-2">
            <NavLink
              to="/CoursesSA"
              style={{
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
                color: isHoveredM ? "#8B5E34" : "#BC8A5F",
                textDecoration: "none",
              }}
              onMouseEnter={() => setIsHoveredM(true)}
              onMouseLeave={() => setIsHoveredM(false)}
            >
              البريد
            </NavLink>
            <NavLink
              to="/PeopleSA"
              style={{
                color: isHovered ? "#8B5E34" : "#BC8A5F",
                textDecoration: "none",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              الطلاب
            </NavLink>
          </div>
          <div className="hidden sm:flex space-x-14 items-center ml-10 pt-2">
            <Button onClick={handleLogOut} style={{ color: "#BC8A5F" }}>
              تسجيل خروج
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <div className="sm:hidden">
            <IconButton onClick={() => setOpen(!open)}>
              <MenuIcon />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden transition-all ${
          open ? "block" : "hidden"
        } bg-amber-100 px-4 pt-2 pb-4`}
      >
        <NavLink
          to="/CoursesSA"
          className="block py-1"
          style={{
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
          className="block py-1 "
          style={{
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
          className="block py-1"
          style={{
            color: isHoveredM ? "#8B5E34" : "#BC8A5F",
            textDecoration: "none",
          }}
          onMouseEnter={() => setIsHoveredM(true)}
          onMouseLeave={() => setIsHoveredM(false)}
        >
          البريد
        </NavLink>
        <NavLink
          to="/PeopleSA"
          style={{
            color: isHovered ? "#8B5E34" : "#BC8A5F",
            textDecoration: "none",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          الطلاب
        </NavLink>
        <hr />
        <Button onClick={handleLogOut} style={{ color: "#BC8A5F" }}>
          تسجيل خروج
        </Button>
      </div>
    </nav>
  );
};

export default SubAdminHeader;
