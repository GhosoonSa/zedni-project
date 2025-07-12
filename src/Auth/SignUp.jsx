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
import Header from "../Header";

const SignUp = () => {
  const { signup } = useContext(userContext);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    role: "",
    firstAndLastName: "",
    email: "",
    fatherName: "",
    phoneNumber: "",
    address: "",
    birthDate: "",
    studyOrCareer: "",
    magazeh: false,
    PreviousExperience: "",
    isPreviousStudent: false,
    PreviousCoursesInOtherPlace: "",
    perviousCourses: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheck = (e) => {};
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
    switch (formData.role) {
      case "subadmin":
        return (
          <>
            <TextareaAutosize
              maxRows={4}
              name="PreviousExperience"
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
              name="PreviousExperience"
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
              name="PreviousCoursesInOtherPlace"
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
              name="isPreviousStudent"
              color="warning"
              onChange={handleCheck}
            />
            <TextareaAutosize
              maxRows={4}
              name="perviousCourses"
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
      <Header />
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

          <Stack
            direction="row"
            sx={{
              display: "flex",
              gap: "40px", // 5 * 8px
              flexWrap: "wrap", // optional, in case screen is narrow
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Stack direction="column" spacing={2}>
              <TextField
                required
                name="firstAndLastName"
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
                name="birthDate"
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
                name="studyOrCareer"
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
                name="magazeh"
                color="warning"
              />

              <Box width="250px">
                <TextField
                  required
                  label="اختاري نوع الحساب"
                  variant="standard"
                  select
                  defaultValue=""
                  name="role"
                  onChange={handleChange}
                  fullWidth
                  color="warning"
                >
                  <MenuItem value="subadmin">مشرف</MenuItem>
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
                helperText="كلمة المرور يجب ان تكون 8حروف على الأقل"
                sx={{ direction: "ltr" }}
                color="warning"
              />
              <TextField
                required
                name="password_confirmation"
                id="password-outline"
                label="كلمة المرور"
                type="password"
                variant="outlined"
                size="small"
                onChange={handleChange}
                helperText="كلمة المرور للتحقق"
                sx={{ direction: "ltr" }}
                color="warning"
              />
            </Stack>
          </Stack>
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            variant="outlined"
            color="warning"
            sx={{ marginBottom: "20px" }}
          >
            إنشاء حساب
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default SignUp;
