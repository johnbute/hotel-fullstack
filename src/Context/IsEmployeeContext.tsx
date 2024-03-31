// IsEmployeeContext.js
import React, { createContext, useContext, useState } from "react";

const IsEmployeeContext = createContext(false);

export const IsEmployeeProvider = ({ children }) => {
  const [isEmployee, setIsEmployee] = useState(false);

  return (
    <IsEmployeeContext.Provider value={{ isEmployee, setIsEmployee }}>
      {children}
    </IsEmployeeContext.Provider>
  );
};

export const useIsEmployee = () => useContext(IsEmployeeContext);
