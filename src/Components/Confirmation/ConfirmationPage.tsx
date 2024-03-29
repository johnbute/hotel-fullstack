import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ConfirmationPage() {
  const navigate = useNavigate();

  const [seconds, setSeconds] = useState(5);
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      navigate("/hotel-chains");
    }
  }, [seconds, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Confirmation Page</h2>
      <p>Your booking has been confirmed!</p>
      <p>Redirecting to Hotel Chains Page in {seconds} seconds...</p>
      <Link to="/hotel-chains">Go back to Hotel Chains Page</Link>
    </div>
  );
}

export default ConfirmationPage;
