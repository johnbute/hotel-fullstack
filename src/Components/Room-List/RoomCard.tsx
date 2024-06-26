import React, { useState, useContext } from "react";
import { Link } from "react-router-dom"; // Import Link
import { Rating } from "react-simple-star-rating";
import "./RoomCard.css";
import PaymentScreen from "../PaymentScreen/PaymentScreen"; // Import PaymentScreen component
import image1 from "../Assets/turkish-hotel.jpg";

import {
  FaTv,
  FaWind,
  FaSnowflake,
  FaHotTub,
  FaBed,
  FaTrash,
} from "react-icons/fa";
import BookNow from "../BookNow/BookNow";
import { useIsEmployee } from "../../Context/IsEmployeeContext";

function RoomCard({ room }) {
  const [showBookingScreen, setShowBookingScreen] = useState(false); // State to control visibility of payment screen
  const { isEmployee } = useIsEmployee();
  const categoryIcons = {
    TV: <FaTv />,
    AC: <FaWind />,
    refrigerator: <FaSnowflake />,
    Jacuzzi: <FaHotTub />,
    Extendable: <FaBed />,
  };

  const handleBookNow = () => {
    setShowBookingScreen(true); // Show payment screen when "Book Now" is clicked
  };

  const handleDelete = () => {
    // Implement deletion logic here
    console.log("Deleting room:", room);
  };

  return (
    <>
      <div className="room-card">
        {isEmployee && (
          <div className="delete-room" onClick={handleDelete}>
            <FaTrash onClick={handleDelete} />
          </div>
        )}

        <div className="price">{room.price}$</div>
        <img src={image1} alt="room-image" className="room-card-image"></img>
        <div className="room-details">
          <h2 className="room-number">
            {room.capacity} {room.view_type} view Room {room.room_number}
          </h2>
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
          <button className="book-now" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </div>
      {showBookingScreen && (
        <BookNow onClose={() => setShowBookingScreen(false)} />
      )}{" "}
    </>
  );
}

export default RoomCard;
