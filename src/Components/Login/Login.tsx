import React, { useState } from "react";
import "./Login.css";
import image1 from "../Assets/login_images/person.png";
import HotelChain from "../HotelChain/HotelChain"; // Import HotelChain component
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginType, setLoginType] = useState("employee"); // State to manage login type (employee/customer)
  const [employeeID, setEmployeeID] = useState(""); // State to manage employee ID input
  const [employeeSSN, setEmployeeSSN] = useState(""); // State to manage employee SSN input
  const [customerEmail, setCustomerEmail] = useState(""); // State to manage customer email input
  const [customerPassword, setCustomerPassword] = useState(""); // State to manage customer password input
  const [loggedIn, setLoggedIn] = useState(false); // State to manage login status
  const navigate = useNavigate();

  const handleEmployeeLogin = () => {
    // Check if employeeID is not empty and employeeSSN is valid (e.g., "12345")
    if (employeeID.trim() !== "" && employeeSSN === "12345") {
      setLoggedIn(true); // Set loggedIn to true
    } else {
      alert("Invalid employee ID or SSN. Please try again."); // Show an alert for invalid input
    }
  };

  const handleCustomerLogin = () => {
    // Check if customerEmail and customerPassword are not empty
    if (customerEmail.trim() !== "" && customerPassword.trim() !== "") {
      setLoggedIn(true); // Set loggedIn to true
    } else {
      alert("Please enter a valid email and password."); // Show an alert for empty fields
    }
  };

  if (loggedIn) {
    // If logged in, render HotelChain component
    navigate("/hotel-chains");
  }

  return (
    <div className="login-container">
      <div className="header">
        <label htmlFor="switch">
          <div className="login-categories">
            <p
              className={loginType === "employee" ? "active" : ""}
              onClick={() => setLoginType("employee")}
            >
              Employee Login
            </p>
            <p
              className={loginType === "customer" ? "active" : ""}
              onClick={() => setLoginType("customer")}
            >
              Customer Login
            </p>
          </div>
        </label>
        <div className="inputs">
          {loginType === "employee" && (
            <>
              <div className="input">
                <img src={image1} alt="" />
                <input
                  type="text"
                  placeholder="Employee ID"
                  value={employeeID}
                  onChange={(e) => setEmployeeID(e.target.value)}
                />
              </div>
              <div className="input">
                <img src={image1} alt="" />
                <input
                  type="text"
                  placeholder="Employee SSN"
                  value={employeeSSN}
                  onChange={(e) => setEmployeeSSN(e.target.value)}
                />
              </div>
            </>
          )}
          {loginType === "customer" && (
            <>
              <div className="input">
                <img src={image1} alt="" />
                <input
                  type="email"
                  placeholder="Customer Email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>
              <div className="input">
                <img src={image1} alt="" />
                <input
                  type="password"
                  placeholder="Customer Password"
                  value={customerPassword}
                  onChange={(e) => setCustomerPassword(e.target.value)}
                />
              </div>
            </>
          )}
        </div>
        <div className="submit-container">
          {loginType === "employee" && (
            <div className="submit" onClick={handleEmployeeLogin}>
              Employee Login
            </div>
          )}
          {loginType === "customer" && (
            <div className="submit" onClick={handleCustomerLogin}>
              Customer Login
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
