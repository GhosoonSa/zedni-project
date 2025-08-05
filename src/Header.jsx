import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Button, Stack, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const [open, setOpen] = useState(false);

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
    navigate("/SignUP");
  };
  return (
    <>
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
              <Button onClick={handleSignIn} style={{ color: "#BC8A5F" }}>
                إنشاء حساب
              </Button>
              <Button onClick={handleLogIn} style={{ color: "#BC8A5F" }}>
                تسجيل دخول
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
          <Button
            onClick={handleSignIn}
            className="block"
            style={{ color: "#BC8A5F" }}
          >
            إنشاء حساب
          </Button>
          <Button
            onClick={handleLogIn}
            className="block"
            style={{ color: "#BC8A5F" }}
          >
            تسجيل دخول
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Header;
