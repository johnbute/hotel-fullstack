import React from "react";
import "./HotelChain.css";
import { useIsEmployee } from "../../Context/IsEmployeeContext"; // Import useIsEmployee hook
import { FaTrash } from "react-icons/fa"; // Import FaTrash icon
import { useNavigate } from "react-router";

function HotelChain({ hotelChain }) {
  const { isEmployee } = useIsEmployee(); // Use useIsEmployee hook to get isEmployee value

  const handleDelete = () => {
    // Implement handle delete logic
    console.log("delete hotel chain", hotelChain);
  };
  const navigate = useNavigate()

  return (
    <div className="hotel-chain-link">
      <div className="hotel-chain-card">
        {isEmployee && (
          <div className="delete-hotel-chain" onClick={handleDelete}>
            <FaTrash />
          </div>
        )}
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
      
                        </ul>
          </div>
        </div>
        <button
          className="explore-button"
          onClick={() => {
            console.log(`Explore ${hotelChain.name}`);
            navigate(`/hotel-chains/${hotelChain.id}`); // Navigate to the hotel chain page
          }}
        >
          Explore
        </button>
      </div>
    </div>
  );
}

export default HotelChain;
