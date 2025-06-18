import React, { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  Typography,
  Button,
  Stack,
  TextField,
  Box,
  MenuItem,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { userContext } from "./ContextProvider";
import backgroundLogIn from "../assets/backgroundLogIn.png";

const LogIn = () => {
  const { login } = useContext(userContext);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    console.log("formDataLogin", formData);
    e.preventDefault();
    //with userContext :
    try {
      login(formData);
    } catch (error) {
      console.error("Error:", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <Stack
          direction="column"
          spacing={2}
          sx={{
            backgroundImage: `url(${backgroundLogIn})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            display: "flex",
            padding: "50px",
          }}
          className="w-screen"
        >
          <Typography variant="h5"> مرحباً بعودتك</Typography>

          <TextField
            required
            name="userName"
            id="name"
            label="اسم المستخدم"
            variant="outlined"
            onChange={handleChange}
            color="warning"
            slotProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            name="password"
            id="password-outline"
            label="كلمة المرور"
            type="password"
            variant="outlined"
            onChange={handleChange}
            color="warning"
            helperText="كلمة المرور مطلوبة"
          />
          <Typography>
            <NavLink to="/SignUp" style={{ color: "black" }}>
              هل نسيت كلمة المرور؟
            </NavLink>
          </Typography>

          <Typography>
            <NavLink to="/SignUp" style={{ color: "black" }}>
              ليس لديك حساب؟ أنشئ الآن
            </NavLink>
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            // onClick={handleLogin}
            variant="outlined"
            style={{
              backgroundColor: "#E7BC91",
              color: "black",
              border: "#DAE2ED",
            }}
          >
            تسجيل دخول
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default LogIn;
