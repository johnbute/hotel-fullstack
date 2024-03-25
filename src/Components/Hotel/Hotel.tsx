import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import { Rating } from "react-simple-star-rating";
import "./Hotel.css";
import image1 from "../Assets/turkish-hotel.jpg";
function Hotel({ hotel }) {
  const [rating, setRating] = useState(hotel.rating);

  return (
    <Link to={`/hotel/${hotel.id}`} className="hotel-link">
      <div className="hotel-card">
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
        </div>
      </div>
    </Link>
  );
}

export default Hotel;
