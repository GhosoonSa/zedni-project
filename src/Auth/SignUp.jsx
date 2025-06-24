import React, { useContext, useState } from "react";
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
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Face6Icon from "@mui/icons-material/Face6";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import { userContext } from "./ContextProvider";
import background from "../assets/backgroundSignUp.png";
import AdminHeader from "../Admin/Components/AdminHeader";

const SignUp = () => {
  const { signup } = useContext(userContext);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    fatherName: "",
    phoneNumber: "",
    address: "",
    birthdate: "",
    study: "",
    mojaza: "",
    previous: "",
    accountType: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = (e) => {
    console.log("formDataLogin", formData);
    e.preventDefault();
    //with userContext :
    try {
      signup(formData);
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong: ", error, " ,Please try again. ");
    }
  };

  const renderAdditionalFields = () => {
    switch (formData.accountType) {
      case "subAdmin":
        return (
          <>
            <TextareaAutosize
              maxRows={4}
              placeholder="خبرات سابقة"
              style={{
                width: 255,
                height: 37,
                borderRadius: "3px",
                border: "1px solid #DAE2ED",
                "&:focus": {
                  border: "1px solid #fb8c00",
                },
              }}
              onMouseEnter={(e) => (e.target.style.borderColor = "#434D5B")}
              onMouseLeave={(e) => (e.target.style.borderColor = "#DAE2ED")}
              onChange={handleChange}
            />
          </>
        );
      case "teacher":
        return (
          <>
            <TextareaAutosize
              maxRows={4}
              placeholder="خبرات سابقة"
              style={{
                width: 255,
                height: 37,
                borderRadius: "3px",
                border: "1px solid #DAE2ED",
                "&:focus": {
                  border: "1px solid #fb8c00",
                },
              }}
              onMouseEnter={(e) => (e.target.style.borderColor = "#434D5B")}
              onMouseLeave={(e) => (e.target.style.borderColor = "#DAE2ED")}
              onChange={handleChange}
            />
          </>
        );
      case "student":
        return (
          <>
            <TextareaAutosize
              maxRows={4}
              placeholder="  دورات سابقة"
              style={{
                width: 255,
                height: 37,
                borderRadius: "3px",
                border: "1px solid #DAE2ED",
                "&:focus": {
                  border: "1px solid #fb8c00",
                },
              }}
              onMouseEnter={(e) => (e.target.style.borderColor = "#434D5B")}
              onMouseLeave={(e) => (e.target.style.borderColor = "#DAE2ED")}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="من طلاب الدورات السابقة"
              name="previous"
              color="warning"
            />
            <TextareaAutosize
              maxRows={4}
              placeholder="  الدورات السابقة عندنا"
              style={{
                width: 255,
                height: 37,
                borderRadius: "3px",
                border: "1px solid #DAE2ED",
                "&:focus": {
                  border: "1px solid #fb8c00",
                },
              }}
              onMouseEnter={(e) => (e.target.style.borderColor = "#434D5B")}
              onMouseLeave={(e) => (e.target.style.borderColor = "#DAE2ED")}
              onChange={handleChange}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <AdminHeader />
      <form onSubmit={handleSignUp}>
        <Stack
          direction="column"
          spacing={5}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            display: "flex",
          }}
        >
          <Typography variant="h5" style={{ marginTop: "60px" }}>
            إنشاء حساب
          </Typography>

          <Stack direction="row" spacing={0}>
            <Stack direction="column" spacing={2}>
              <TextField
                required
                name="userName"
                id="userName"
                label="اسم المستخدم"
                variant="outlined"
                size="small"
                onChange={handleChange}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ direction: "ltr", marginRight: 2 }}
                color="warning"
              />
              <TextField
                required
                name="fatherName"
                id="fatherName"
                label="اسم الأب"
                variant="outlined"
                size="small"
                onChange={handleChange}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <Face6Icon />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ direction: "ltr" }}
                color="warning"
              />
              <TextField
                required
                name="email"
                id="email"
                label=" البريد الالكتروني"
                variant="outlined"
                size="small"
                onChange={handleChange}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ direction: "ltr" }}
                color="warning"
              />
              <TextField
                required
                name="phoneNumber"
                id="phone"
                label="رقم الموبايل"
                variant="outlined"
                size="small"
                onChange={handleChange}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <LocalPhoneOutlinedIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ direction: "ltr" }}
                color="warning"
              />
              <TextField
                required
                name="address"
                id="address"
                label="عنوان السكن"
                variant="outlined"
                size="small"
                onChange={handleChange}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <HomeOutlinedIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ direction: "ltr" }}
                color="warning"
              />
              <TextField
                required
                name="birthdate"
                id="birthdate"
                label="تاريخ الميلاد "
                variant="outlined"
                size="small"
                onChange={handleChange}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarMonthIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ direction: "ltr" }}
                color="warning"
              />
            </Stack>
            <Stack direction="column" spacing={2}>
              <TextField
                required
                name="study"
                id="study"
                label=" الشهادة/العمل "
                variant="outlined"
                size="small"
                onChange={handleChange}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <SchoolIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ direction: "ltr" }}
                color="warning"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="مجازة"
                name="mojaza"
                color="warning"
              />

              <Box width="250px">
                <TextField
                  required
                  label="اختاري نوع الحساب"
                  variant="standard"
                  select
                  defaultValue=""
                  name="accountType"
                  onChange={handleChange}
                  fullWidth
                  color="warning"
                >
                  <MenuItem value="subAdmin">مشرف</MenuItem>
                  <MenuItem value="teacher">أستاذ</MenuItem>
                  <MenuItem value="student">طالب</MenuItem>
                </TextField>
              </Box>

              {renderAdditionalFields()}

              <TextField
                required
                name="password"
                id="password-outline"
                label="كلمة المرور"
                type="password"
                variant="outlined"
                size="small"
                onChange={handleChange}
                helperText="كلمة المرور مطلوبة"
                sx={{ direction: "ltr" }}
                color="warning"
              />
            </Stack>
          </Stack>
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            // onClick={handleLogin}
            variant="outlined"
            color="warning"
          >
            إنشاء حساب
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default SignUp;
