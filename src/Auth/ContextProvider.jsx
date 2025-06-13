import React from "react";
import { createContext } from "react";

export const userContext = createContext();

const ContextProvider = ({ children }) => {
  const role = "admin";
  const authenticated = true;
  return (
    <div>
      <userContext.Provider value={{ role, authenticated }}>
        {children}
      </userContext.Provider>
    </div>
  );
};

export default ContextProvider;
