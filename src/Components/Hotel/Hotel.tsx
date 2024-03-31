import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import "./Hotel.css";
import image1 from "../Assets/turkish-hotel.jpg";
import { useIsEmployee } from "../../Context/IsEmployeeContext";
import { FaTrash } from "react-icons/fa";

function Hotel({ hotel }) {
  const [rating, setRating] = useState(hotel.rating);
  const navigate = useNavigate();
  const isEmployee = useIsEmployee();

  const handleDelete = () => {
    console.log("delete hotel", hotel);
  };

  return (
    <div className="hotel-card">
      {isEmployee && (
        <div className="delete-hotel-chain" onClick={handleDelete}>
          <FaTrash />
        </div>
      )}
      <img src={image1} alt="" className="hotel-image" />
      <div className="hotel-rating">
        <Rating className="rating" initialValue={rating} readonly={true} />{" "}
        {/* Pass 'rating' as 'ratingValue' prop */}
      </div>
      <div className="hotel-details">
        <h2 className="hotel-name">{hotel.name}</h2>
        <p className="hotel-info">Address: {hotel.address}</p>
        <div className="hotel-chain-info">
          <p className="hotel-chain-phonenumber-title">Phone Numbers:</p>
          <ul className="phone-list">
            {hotel.phoneNumbers.map((phoneNumber, index) => (
              <li key={index}>{phoneNumber}</li>
            ))}
          </ul>
        </div>
        <div className="hotel-chain-info">
          <p className="hotel-chain-phonenumber-title">Emails:</p>
          <ul className="phone-list">
            {hotel.email.map((email, index) => (
              <li key={index}>{email}</li>
            ))}
          </ul>
        </div>
        <button
          className="explore-button"
          onClick={() => {
            console.log(`Explore ${hotel.name}`);
            navigate(`/hotel/${hotel.id}`); // Navigate to the hotel chain page
          }}
        >
          Explore
        </button>
      </div>
    </div>
  );
}

export default Hotel;
