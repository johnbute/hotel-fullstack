import React, { useState } from "react";
import "./CreateRoom.css"; // Ensure this CSS path is correct

function CreateHotel({ onClose }) {
  const [formData, setFormData] = useState({
    hotelName: "",
    hotelAddress: "",
    hotelEmails: [],
    phoneNumbers: [],
    rating: 1,
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Use the right value based on the input type
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    return;
  };

  const handleInputEnter = (e, field) => {
    const value = e.target.value.trim();
    if (e.key === "Enter" && value) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value],
      }));
      e.target.value = "";
    }
  };

  const handleRemovePill = (index, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="create-screen">
      <div className="create-screen-modal">
        <form className="create-form" onSubmit={handleSubmit}>
          <label>Hotel Name:</label>

          <div>
            <input
              type="text"
              name="hotelName"
              value={formData.hotelName}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <label>Hotel Address:</label>

          <div>
            <input
              type="text"
              name="hotelAddress"
              value={formData.hotelAddress}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <label>Email Addresses</label>

          <div>
            {formData.hotelEmails.map((email, index) => (
              <div key={index} className="pill">
                <span>{email}</span> {/* Text part of the pill */}
                <button
                  onClick={() => handleRemovePill(index, "phoneNumbers")}
                  className="pill-close-btn"
                >
                  X
                </button>
              </div>
            ))}
            <input
              type="text"
              onKeyDown={(e) => handleInputEnter(e, "hotelEmails")}
              placeholder="Add email and press Enter"
            />
          </div>

          <label>Phone Numbers</label>
          <div>
            {formData.phoneNumbers.map((number, index) => (
              <div key={index} className="pill">
                <span>{number}</span> {/* Text part of the pill */}
                <button
                  onClick={() => handleRemovePill(index, "phoneNumbers")}
                  className="pill-close-btn"
                >
                  X
                </button>
              </div>
            ))}
            <input
              type="text"
              onKeyDown={(e) => handleInputEnter(e, "phoneNumbers")}
              placeholder="Add phone number and press Enter"
            />
          </div>

          <div>
            <label>Rating:</label>
            <select
              name="rating"
              value={formData.rating}
              onChange={(e) =>
                setFormData({ ...formData, rating: e.target.value })
              }
            >
              {[1, 2, 3, 4, 5].map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Create Hotel</button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateHotel;
