import React, { useState } from "react";
import RoomCard from "./RoomCard";
import "./RoomPage.css";
import { FaTv, FaWind, FaSnowflake, FaHotTub, FaBed } from "react-icons/fa";
import { Slider } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useIsEmployee } from "../../Context/IsEmployeeContext";
import CreateRoom from "../Form/CreateRoom";

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
    capacity: "Single",
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
    capacity: "Double",
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
    capacity: "Single",
  },
];

function RoomPage() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [isCreateScreenVisible, setCreateScreenVisible] = useState(false);

  const handleAddButtonClick = () => {
    setCreateScreenVisible(true);
  };

  const { isEmployee } = useIsEmployee();
  const handleFilterClick = (filter: string) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter((prevFilter) => prevFilter !== filter);
      } else {
        return [...prevFilters, filter];
      }
    });
  };

  const handlePriceChange = (value: number, index: number) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = value;
    setPriceRange(newPriceRange);
  };

  const filteredRooms = rooms.filter((room) => {
    const filterMatches = selectedFilters.every((filter) => room[filter]);
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
          max={500}
          value={priceRange[0]}
          onChange={(value) => handlePriceChange(value, 0)}
        />

        <label htmlFor="maxPriceRange">Max Price:</label>
        <Slider
          min={0}
          max={500}
          value={priceRange[1]}
          onChange={(value) => handlePriceChange(value, 1)}
        />
      </div>

      <div className="date-picker">
        <DatePicker
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          selectsStart
          startDate={checkInDate}
          endDate={checkOutDate}
          placeholderText="Check-in Date"
          className="date-picker-input"
          minDate={new Date()}
        />
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          selectsEnd
          startDate={checkInDate}
          endDate={checkOutDate}
          minDate={checkInDate}
          placeholderText="Check-out Date"
          className="date-picker-input"
        />
      </div>

      <div className="list-of-rooms">
        {filteredRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
      {isEmployee && (
        <div className="button-container">
          <button className="add-button" onClick={handleAddButtonClick}>
            <span>+</span>
          </button>
        </div>
      )}
      {isCreateScreenVisible && (
        <div className="create">
          <CreateRoom onClose={() => setCreateScreenVisible(false)} />
        </div>
      )}
    </>
  );
}

export default RoomPage;
