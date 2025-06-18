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
      case "cordinator":
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
              }}
              onMouseEnter={(e) => (e.target.style.borderColor = "#434D5B")}
              onMouseLeave={(e) => (e.target.style.borderColor = "#DAE2ED")}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="من طلاب الدورات السابقة"
              name="previous"
            />
            <TextareaAutosize
              maxRows={4}
              placeholder="  الدورات السابقة عندنا"
              style={{
                width: 255,
                height: 37,
                borderRadius: "3px",
                border: "1px solid #DAE2ED",
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
          className="w-screen"
        >
          <Typography variant="h5">إنشاء حساب</Typography>

          <Stack direction="row" spacing={5}>
            <Stack direction="column" spacing={2} sx={{ marginLeft: "550px" }}>
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
              />
              <FormControlLabel
                control={<Checkbox />}
                label="مجازة"
                name="mojaza"
              />

              <Box width="250px">
                <TextField
                  required
                  label="اختاري نوع الحساب"
                  variant="standard"
                  select
                  name="accountType"
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="cordinator">مشرف</MenuItem>
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
              />
            </Stack>
          </Stack>
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            // onClick={handleLogin}
            variant="outlined"
            color="primary"
          >
            إنشاء حساب
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default SignUp;
