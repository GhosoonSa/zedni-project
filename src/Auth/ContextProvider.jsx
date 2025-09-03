import React from "react";
import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const userContext = createContext();

const ContextProvider = ({ children }) => {
  // const [role, setRole] = useState("admin");
  // const [authenticated, setAuthenticated] = useState(true);

  const [role, setRole] = useState(() => localStorage.getItem("role") || "");
  const [authenticated, setAuthenticated] = useState(
    () => !!localStorage.getItem("authToken")
  );
  console.log(authenticated);
  const navigate = useNavigate();

  const login = async (formData) => {
    try {
      const response = await axios.post(
        " http://localhost:8000/api/login",
        formData
      );
      const access_token = response.data.access_token;
      localStorage.setItem("authToken", access_token);
      setAuthenticated(true);
      console.log(access_token);

      const account = response.data.user.role;
      setRole(account);
      localStorage.setItem("role", account);

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
          case "subadmin":
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
    const account = formData.role;
    setRole(account);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        formData
      );

      const access_token = response.data.access_token;
      localStorage.setItem("authToken", access_token);
      setAuthenticated(true);

      setRole(account);
      localStorage.setItem("role", account);

      if (response.status === 201 || response.status === 200) {
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
          case "subadmin":
            navigate("/CoursesSA", { state: { account, access_token } });
            break;
          default:
            break;
        }
      }
      return null;
    } catch (error) {
      console.error("Error registering user:", error);
      return error;
    }
  };

  const logout = async () => {
    setAuthenticated(false);
    try {
      const response = await axios.delete("http://localhost:8000/api/logout", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (response.status === 200) {
        navigate("/");
        localStorage.removeItem("authToken");
        localStorage.removeItem("role");
        setRole("");
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
