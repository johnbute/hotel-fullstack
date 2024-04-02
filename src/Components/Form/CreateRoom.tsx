import React, { useState } from "react";
import "./CreateRoom.css";
function CreateRoom({ onClose }) {
  // State to hold the form data
  const [formData, setFormData] = useState({
    roomNumber: "", // Initialize as an empty string, but will be validated as a number > 0
    viewType: "Sea", // Default to 'Sea', assuming it's the most common or preferred option
    tv: false,
    ac: false,
    refrigerator: false,
    jacuzzi: false,
  });

  // Function to handle changes to the form inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Use the right value based on the input type
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submit action

    // Implement what you want to do with the formData upon form submission
    // For example, sending it to a backend or displaying it on the screen
    console.log(formData);
    onClose()
    // You can also include validation here, e.g., to ensure roomNumber is > 0
    if (formData.roomNumber <= 0) {
      alert("Room number must be greater than 0");
      return;
    }
  };

  return (
    <div className="create-screen">
      <div className="create-screen-modal">
        <form className="create-form" onSubmit={handleSubmit}>
          <div>
            <label>
              Room Number:
              <input
                type="number"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                min="1" // Ensure the number is greater than 0
              />
            </label>
          </div>

          <div>
            <label>
              View Type:
              <select
                name="viewType"
                value={formData.viewType}
                onChange={handleChange}
              >
                <option value="Sea">Sea</option>
                <option value="Mountain">Mountain</option>
                <option value="City">City</option>
              </select>
            </label>
          </div>

          <div className="checkbox-container">
            <label>TV:</label>
            <input
              type="checkbox"
              name="tv"
              checked={formData.tv}
              onChange={handleChange}
            />
          </div>

          <div className="checkbox-container">
            <label>AC:</label>
            <input
              type="checkbox"
              name="ac"
              checked={formData.ac}
              onChange={handleChange}
            />
          </div>

          <div className="checkbox-container">
            <label>Refrigerator:</label>
            <input
              type="checkbox"
              name="refrigerator"
              checked={formData.refrigerator}
              onChange={handleChange}
            />
          </div>

          <div className="checkbox-container">
            <label>Jacuzzi: </label>
            <input
              type="checkbox"
              name="jacuzzi"
              checked={formData.jacuzzi}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Create Room</button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateRoom;
