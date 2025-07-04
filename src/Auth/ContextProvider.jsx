import React from "react";
import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const userContext = createContext();

const ContextProvider = ({ children }) => {
  const [role, setRole] = useState("admin");
  const [authenticated, setAuthenticated] = useState(true);

  // const [role, setRole] = useState(() => localStorage.getItem("role") || "");
  // const [authenticated, setAuthenticated] = useState(
  //   () => !!localStorage.getItem("authToken")
  // );

  const navigate = useNavigate();

  const login = async (formData) => {
    try {
      console.log("formdata from login function:" + formData);

      const response = await axios.post(
        " http://localhost:8000/api/login",
        formData
      );
      console.log("response :" + response.data);

      const access_token = response.data.access_token;
      localStorage.setItem("authToken", access_token);
      console.log("token from login:  " + access_token);
      setAuthenticated(true);

      const account = response.data.user.role;
      console.log(account);
      setRole(account);
      localStorage.setItem("role", account);
      console.log(role);

      if (response.status === 200) {
        switch (account) {
          case "admin":
            navigate("/Courses", { state: { account, access_token } });
            break;
          case "student":
            navigate("/CoursesS", { state: { account, access_token } });
            break;
          case "teacher":
            navigate("/CoursesT", { state: { account, access_token } });
            break;
          case "subAdmin":
            navigate("/CoursesSA", { state: { account, access_token } });
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return error;
    }
    setAuthenticated(true);
  };

  const signup = async (formData) => {
    setAuthenticated(true);
    console.log("formData in reg", formData);
    const account = formData.role;
    console.log(account);
    setRole(account);
    console.log(role);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        formData
      );
      console.log("response", response);

      const access_token = response.data.access_token;
      localStorage.setItem("authToken", access_token);
      setAuthenticated(true);
      console.log(access_token);

      setRole(account);
      localStorage.setItem("role", account);
      console.log(role);

      if (response.status === 201 || 200) {
        switch (account) {
          case "admin":
            navigate("/Courses", { state: { account, access_token } });
            break;
          case "student":
            navigate("/CoursesS", { state: { account, access_token } });
            break;
          case "teacher":
            navigate("/CoursesT", { state: { account, access_token } });
            break;
          case "subAdmin":
            navigate("/CoursesSA", { state: { account, access_token } });
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.error("Error registering user:", error);
      return error;
    }
  };

  const logout = async () => {
    setAuthenticated(false);
    console.log(
      "i am out of the application " + localStorage.getItem("authToken")
    );
    try {
      const response = await axios.delete("http://localhost:8000/api/logout", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (response.status === 200) {
        console.log(
          "i am out of the application " + localStorage.getItem("authToken")
        );
        localStorage.removeItem("authToken");
        localStorage.removeItem("role");
        setAuthenticated(false);
        setRole("");
        navigate("/");
      }
    } catch (error) {
      console.error("Error loging out user:", error);
    }
  };

  return (
    <div>
      <userContext.Provider
        value={{ role, authenticated, signup, login, logout }}
      >
        {children}
      </userContext.Provider>
    </div>
  );
};

export default ContextProvider;
