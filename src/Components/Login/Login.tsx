// Login.js
import { useState } from "react";
import "./Login.css";
import image1 from "../Assets/login_images/person.png";
import HotelChain from "../HotelChain/HotelChain"; // Import HotelChain component
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [employeeSSN, setEmployeeSSN] = useState(""); // State to manage employee SSN input
  const [loggedIn, setLoggedIn] = useState(false); // State to manage login status
  const navigate = useNavigate();

  const handleLogin = () => {
    // Check if employeeSSN is "12345"
    if (employeeSSN === "12345") {
      setLoggedIn(true); // Set loggedIn to true
    } else {
      alert("Invalid employee SSN. Please try again."); // Show an alert for invalid SSN
    }
  };

  if (loggedIn) {
    // If logged in, render HotelChain component
    navigate("/hotel-chains");
  }

  return (
    <div className="container">
      <div className="header">
        <div className="inputs">
          <div className="input">
            <img src={image1} alt="" />
            <input
              type="text" // Changed type to text for employeeSSN input
              placeholder="Employee SSN"
              value={employeeSSN} // Bind value to state
              onChange={(e) => setEmployeeSSN(e.target.value)} // Handle input change
            />
          </div>
        </div>
        <div className="submit-container">
          <div className="submit" onClick={handleLogin}>
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
