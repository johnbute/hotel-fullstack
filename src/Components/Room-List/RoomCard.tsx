import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import { Rating } from "react-simple-star-rating";
import "./RoomCard.css";
import image1 from "../Assets/turkish-hotel.jpg";
import { FaTv, FaWind, FaSnowflake, FaHotTub, FaBed } from "react-icons/fa";

function RoomCard({ room }) {
  const categoryIcons = {
    TV: <FaTv />,
    AC: <FaWind />,
    refrigerator: <FaSnowflake />, // You can use the same icon for multiple categories if needed
    Jacuzzi: <FaHotTub />,
    Extendable: <FaBed />,
    // Add more categories and corresponding icons as needed
  };

  return (
    <Link to={`/hotel/${room.id}`} className="room-link">
      <div className="room-card">
        <img src={image1} alt="room-image" className="room-card-image"></img>
        <div className="room-details">
          <h2 className="room-number">
            {room.view_type} view Room {room.room_number}
          </h2>
          <p className="price">{room.price}$</p>
          <ul className="amenities-list">
            {Object.entries(room).map(([key, value]) => {
              if (typeof value === "boolean" && value) {
                return (
                  <li key={key}>
                    {categoryIcons[key]}
                    {key}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </div>
    </Link>
  );
}

export default RoomCard;
