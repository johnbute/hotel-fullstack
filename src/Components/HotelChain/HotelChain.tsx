import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "./HotelChain.css";

function HotelChain({ hotelChain }) {
  return (
    <Link to={`/hotel-chains/${hotelChain.id}`} className="hotel-chain-link">
      <div className="hotel-chain-card">
        <img
          className="hotel-chain-image"
          src={hotelChain.image}
          alt={hotelChain.name}
        />
        <div className="hotel-chain-details">
          <h2 className="hotel-chain-name">{hotelChain.name}</h2>
          <p className="hotel-chain-info">Email: {hotelChain.email}</p>
          <p className="hotel-chain-info">
            Number of Hotels: {hotelChain.numHotels}
          </p>
          <div className="hotel-chain-info">
            <p className="hotel-chain-phonenumber-title">Phone Numbers:</p>
            <ul className="phone-list">
              {hotelChain.phoneNumbers.map((phoneNumber, index) => (
                <li key={index}>{phoneNumber}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HotelChain;
