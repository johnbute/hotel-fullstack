import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import "./BookNow.css";
import PaymentScreen from "../PaymentScreen/PaymentScreen"; // Import PaymentScreen component

function BookNow({ onClose }) {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [showPaymentScreen, setShowPaymentScreen] = useState(false); // State to control visibility of payment screen
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateDates(checkInDate, checkOutDate);
    if (Object.keys(errors).length === 0) {
      console.log("Dates submitted:", checkInDate, checkOutDate);
      setShowPaymentScreen(true); // Show payment screen when form is submitted
    } else {
      setErrors(errors);
    }
  };

  const validateDates = (checkInDate, checkOutDate) => {
    let errors = {};
    if (!checkInDate) {
      errors.checkInDate = "Check-in date is required";
    }
    if (!checkOutDate) {
      errors.checkOutDate = "Check-out date is required";
    }
    if (checkInDate && checkOutDate && checkInDate >= checkOutDate) {
      errors.checkOutDate = "Check-out date must be after check-in date";
    }
    return errors;
  };

  return (
    <div className="booking-screen">
      <div className="booking-modal">
        <h2>Book a Room</h2>
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="checkInDate">Check-in Date</label>
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              selectsStart
              startDate={checkInDate}
              endDate={checkOutDate}
              placeholderText="Select check-in date"
              className="date-picker-input"
              minDate={new Date()}
            />
            {errors.checkInDate && (
              <span className="error">{errors.checkInDate}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="checkOutDate">Check-out Date</label>
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              selectsEnd
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={checkInDate}
              placeholderText="Select check-out date"
              className="date-picker-input"
            />
            {errors.checkOutDate && (
              <span className="error">{errors.checkOutDate}</span>
            )}
          </div>
          <button type="submit">Book Room</button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
      {showPaymentScreen && (
        <PaymentScreen onClose={() => setShowPaymentScreen(false)} />
      )}{" "}
    </div>
  );
}

export default BookNow;
