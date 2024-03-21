import React from "react";
import "./HotelChain.css";



function HotelChain({ hotelChain }) {
  return (
    <div className="hotel-chain-info">
      <div>
        <img
          className="hotel-chain-image"
          src={hotelChain.image}
          alt={hotelChain.name}
        />
      </div>
      <div className="hotel-chain-details">
        <h2 className="hotel-chain-name">{hotelChain.name}</h2>
        <p className="hotel-chain-email">Email: {hotelChain.email}</p>
        <p className="hotel-chain-numHotels">
          Number of Hotels: {hotelChain.numHotels}
        </p>
        <div className="hotel-chain-phonenumbers">
          <p className="hotel-chain-phonenumber-title">Phone Numbers:</p>
          <ul className="hotel-chain-phonenumber-list">
            {hotelChain.phoneNumbers.length >= 3
              ? hotelChain.phoneNumbers
                  .slice(0, 3)
                  .map((phoneNumber, index) => (
                    <li key={index}>{phoneNumber}</li>
                  ))
              : hotelChain.phoneNumbers.map((phoneNumber, index) => (
                  <li key={index}>{phoneNumber}</li>
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HotelChain;
