import React from "react";
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

const AdminHeader = () => {
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
      <nav className="grid grid-cols-4">
        <Stack direction="row" spacing={2} className="col-span-1">
          <Button onClick={handleSignIn}>إنشاء حساب</Button>
          <Button onClick={handleLogIn}>تسجيل دخول</Button>
        </Stack>

        <Stack direction="row" spacing={2} className="col-span-2">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "font-semibold px-4 IoT"
                : "nav-item nav-navbar text-white font-semibold px-4"
            }
            to="/Admin/Courses"
          >
            Courses
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "font-semibold px-4 IoT"
                : "nav-item nav-navbar text-white font-semibold px-4"
            }
            to="/Admin/Profile"
          >
            Profile
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "font-semibold px-4 IoT"
                : "nav-item nav-navbar text-white font-semibold px-4"
            }
            to="/Admin/Mails"
          >
            Mails
          </NavLink>
        </Stack>
        <Stack className="col-span-1">
          <img src="/small-logo.png" alt="logo" className="w-24 ml-28" />
        </Stack>
      </nav>
    </>
  );
};

export default AdminHeader;
