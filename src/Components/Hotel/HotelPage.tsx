import React, { useState, useEffect } from "react";
import Hotel from "./Hotel";
import "./HotelPage.css";
import image2 from "../Assets/hotelchain_images/exterior-view (2).jpg";
import { useIsEmployee } from "../../Context/IsEmployeeContext";
import CreateHotel from "../Form/CreateHotel";
import axios from 'axios';

function HotelPage() {
  const [isCreateScreenVisible, setCreateScreenVisible] = useState(false);
  const handleAddButtonClick = () => {
    console.log("Add button clicked");
    setCreateScreenVisible(true);
  }
  const [hotels, setHotels] = useState([]);
  
  useEffect(() => {
    const fetchHotels = async () => {
      const response = await axios.get('http://localhost:3001/api/hotels');
      setHotels(response.data);
    };
    fetchHotels();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [minRating, setMinRatng] = useState(0);

  const handleSearchChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(e.target.value);
  };

  const handleRatingChange = (e: { target: { value: string } }) => {
    setMinRatng(parseInt(e.target.value, 10));
  };
  const filteredHotels = hotels.filter((hotel) => {
    return (
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      hotel.rating >= minRating
    );
  });
  
  const { isEmployee } = useIsEmployee();

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
      {isEmployee && (
        <div className="button-container">
          <button className="add-button" onClick={handleAddButtonClick}>
            <span>+</span>
          </button>
        </div>
      )}

      {isCreateScreenVisible && (
        <CreateHotel onClose={() => setCreateScreenVisible(false)} />
      )}
    </>
  );
}

export default HotelPage;
