import React, { useState } from "react";
import Hotel from "./Hotel";
import "./HotelPage.css";
import image2 from "../Assets/hotelchain_images/exterior-view (2).jpg";

function HotelPage() {
  const hotels = [
    {
      id: 1,
      hotel_chain_id: 1,
      email: ["test@gmail.com", "yahoo@gmail.com"],
      phoneNumbers: ["123-456-7890", "987-654-3210"],
      address: "50 Ottawa Avenue",
      name: "The cuba booz expreess",
      rating: 4,
    },
    {
      id: 2,
      hotel_chain_id: 1,
      email: ["test@gmail.com", "yahoo@gmail.com"],
      phoneNumbers: ["123-456-7890", "987-654-3210"],
      address: "50 Ottawa Avenue",
      name: "The Dominican booz expreess",
      rating: 3,
    },
    {
      id: 3,
      hotel_chain_id: 1,
      email: ["test@gmail.com", "yahoo@gmail.com"],
      phoneNumbers: ["123-456-7890", "987-654-3210"],
      address: "50 Ottawa Avenue",
      name: "The bunda booz expreess",
      rating: 1,
    },
    {
      id: 4,
      hotel_chain_id: 3,
      email: ["test@gmail.com", "yahoo@gmail.com"],
      phoneNumbers: ["123-456-7890", "987-654-3210"],
      address: "50 Ottawa Avenue",
      name: "The huhhh expreess",
      rating: 4,
    },
    {
      id: 5,
      hotel_chain_id: 3,
      email: ["test@gmail.com", "yahoo@gmail.com"],
      phoneNumbers: ["123-456-7890", "987-654-3210"],
      address: "50 Ottawa Avenue",
      name: "The expreess",
      rating: 5,
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [minRating, setMinRatng] = useState(0);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRatingChange = (e) => {
    setMinRatng(parseInt(e.target.value, 10));
  };
  const filteredHotels = hotels.filter((hotel) => {
    return (
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      hotel.rating >= minRating
    );
  });

  return (
    <>
      <div className="Header">Hotel-chain name goes here</div>
      <div className="SearchbarContainer">
        <input
          type="text"
          placeholder="Search by hotel name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="SearchBar"
        />
        <select onChange={handleRatingChange} className="Rating-SearchBar">
          <option value="0">Minimum Rating</option>
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
      </div>

      <div className="list-of-hotels">
        {filteredHotels.map((hotel) => (
          <Hotel key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </>
  );
}

export default HotelPage;
