import React from "react";
import { createContext, useState } from "react";
import axios from "axios";

export const userContext = createContext();

const ContextProvider = ({ children }) => {
  const [role, setRole] = useState("Admin");
  const [authenticated, setAuthenticated] = useState(true);

  const login = (formData) => {
    setAuthenticated(true);
  };
  const signup = (formData) => {
    setAuthenticated(true);
  };
  const logout = () => {
    setAuthenticated(false);
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
