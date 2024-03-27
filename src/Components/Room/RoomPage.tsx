import React, { useState } from "react";
import RoomCard from "./RoomCard";
import "./RoomPage.css";
import { FaTv, FaWind, FaSnowflake, FaHotTub, FaBed } from "react-icons/fa";
import { Slider } from "antd";
const rooms = [
  {
    id: 1,
    room_number: 100,
    price: 200.5,
    problemsdamages: "minor",
    view_type: "Sea",
    TV: true,
    AC: true,
    refrigerator: true,
    Jacuzzi: true,
    Extendable: true,
  },
  {
    id: 2,
    room_number: 101,
    price: 110.5,
    problemsdamages: "major",
    view_type: "Mountain",
    TV: true,
    AC: true,
    refrigerator: false,
    Jacuzzi: false,
    Extendable: false,
  },
  {
    id: 3,
    room_number: 102,
    price: 450.5,
    problemsdamages: "none",
    view_type: "City",
    TV: false,
    AC: false,
    refrigerator: false,
    Jacuzzi: true,
    Extendable: true,
  },
];

function RoomPage() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]); // Initial price range

  const handleFilterClick = (filter) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(filter)) {
        // If the filter is already selected, remove it
        return prevFilters.filter((prevFilter) => prevFilter !== filter);
      } else {
        // If the filter is not selected, add it
        return [...prevFilters, filter];
      }
    });
  };

  const handlePriceChange = (value, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = value;
    setPriceRange(newPriceRange);
  };

  const filteredRooms = rooms.filter((room) => {
    // Check if room matches all selected filters
    const filterMatches = selectedFilters.every((filter) => room[filter]);

    // Check if room price is within selected price range
    const priceInRange =
      room.price >= priceRange[0] && room.price <= priceRange[1];

    return filterMatches && priceInRange;
  });

  return (
    <>
      <div className="Header">Hotel name goes here</div>
      <div className="filter-icons-bar">
        <div
          className={`filter-icons ${
            selectedFilters.includes("TV") ? "active" : ""
          }`}
          onClick={() => handleFilterClick("TV")}
        >
          <FaTv />
          <p>TV</p>
        </div>
        <div
          className={`filter-icons ${
            selectedFilters.includes("Jacuzzi") ? "active" : ""
          }`}
          onClick={() => handleFilterClick("Jacuzzi")}
        >
          <FaHotTub />
          <p>Jacuzzi</p>
        </div>
        <div
          className={`filter-icons ${
            selectedFilters.includes("AC") ? "active" : ""
          }`}
          onClick={() => handleFilterClick("AC")}
        >
          <FaWind />
          <p>AC</p>
        </div>
        <div
          className={`filter-icons ${
            selectedFilters.includes("refrigerator") ? "active" : ""
          }`}
          onClick={() => handleFilterClick("refrigerator")}
        >
          <FaSnowflake />
          <p>Refrigerator</p>
        </div>
        <div
          className={`filter-icons ${
            selectedFilters.includes("Extendable") ? "active" : ""
          }`}
          onClick={() => handleFilterClick("Extendable")}
        >
          <FaBed />
          <p>Extendable</p>
        </div>
      </div>

      <div className="price-slider">
        <label htmlFor="minPriceRange">Min Price:</label>
        <Slider
          min={0}
          max={2000}
          value={priceRange[0]}
          onChange={(value) => handlePriceChange(value, 0)}
        />

        <label htmlFor="maxPriceRange">Max Price:</label>
        <Slider
          min={0}
          max={2000}
          value={priceRange[1]}
          onChange={(value) => handlePriceChange(value, 1)}
        />
      </div>

      <div className="list-of-rooms">
        {filteredRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </>
  );
}

export default RoomPage;
