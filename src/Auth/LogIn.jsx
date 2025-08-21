import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Typography, Button, Stack, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { userContext } from "./ContextProvider";
import backgroundLogIn from "../assets/backgroundLogIn4.png";
import Header from "../Header";

const LogIn = () => {
  const { login } = useContext(userContext);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    //with userContext :
    try {
      const error = await login(formData);
      if (error) {
        setError("حدث خطأ ما , أعد المحاولة !");
      } else {
        setError("");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <>
      <Header />
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
        >
          <Typography variant="h5"> مرحباً بعودتك</Typography>

          <TextField
            required
            name="email"
            id="email"
            label="البريد الالكتروني "
            variant="outlined"
            onChange={handleChange}
            color="warning"
            size="small"
            slotProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            sx={{ direction: "ltr", width: "250px" }}
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
            size="small"
            helperText="كلمة المرور مطلوبة"
            sx={{ direction: "ltr", width: "250px" }}
          />

          <Typography>
            <NavLink
              to="/SignUp"
              style={{ color: "black", textDecoration: "none" }}
            >
              ليس لديك حساب؟ أنشئ الآن
            </NavLink>
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
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
