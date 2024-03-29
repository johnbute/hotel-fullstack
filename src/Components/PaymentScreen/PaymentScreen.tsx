import React, { useState } from "react";
import "./PaymentScreen.css";
import { useNavigate } from "react-router";

function PaymentScreen({ onClose }) {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateFormData(formData);
    if (Object.keys(errors).length === 0) {
      navigate(`/confirmation`);
      console.log("Form submitted:", formData);
    } else {
      setErrors(errors);
    }
  };

  const validateFormData = (data) => {
    let errors = {};
    if (!data.cardNumber.trim()) {
      errors.cardNumber = "Card number is required";
    }
    if (!data.expiryDate.trim()) {
      errors.expiryDate = "Expiry date is required";
    }
    if (!data.cvv.trim()) {
      errors.cvv = "CVV is required";
    }
    if (!data.cardholderName.trim()) {
      errors.cardholderName = "Cardholder name is required";
    }
    return errors;
  };

  return (
    <div className="payment-screen">
      <div className="payment-modal">
        <h2>Payment Details</h2>
        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="Enter card number"
              value={formData.cardNumber}
              onChange={handleChange}
            />
            {errors.cardNumber && (
              <span className="error">{errors.cardNumber}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={handleChange}
            />
            {errors.expiryDate && (
              <span className="error">{errors.expiryDate}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="Enter CVV"
              value={formData.cvv}
              onChange={handleChange}
            />
            {errors.cvv && <span className="error">{errors.cvv}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="cardholderName">Cardholder Name</label>
            <input
              type="text"
              id="cardholderName"
              name="cardholderName"
              placeholder="Enter cardholder name"
              value={formData.cardholderName}
              onChange={handleChange}
            />
            {errors.cardholderName && (
              <span className="error">{errors.cardholderName}</span>
            )}
          </div>
          <button type="submit">Submit Payment</button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentScreen;
