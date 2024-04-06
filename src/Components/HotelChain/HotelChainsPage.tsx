import React, { useState, useEffect } from "react";
import HotelChain from "./HotelChain";
import image1 from "../Assets/hotelchain_images/exterior-view (1).jpg";
import image2 from "../Assets/hotelchain_images/exterior-view (2).jpg";
import "./HotelChainsPage.css";
import image3 from "../Assets/hotelchain_images/exterior-view.jpg";
import image4 from "../Assets/hotelchain_images/luxury-tent-views.jpg";
import { useIsEmployee } from "../../Context/IsEmployeeContext";
import CreateHotelChain from "../Form/CreateHotelChain";

function HotelChainsPage() {
  const [hotelChains, setHotelChains] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateScreenVisible, setCreateScreenVisible] = useState(false);

  useEffect(() => {
    const fetchHotelChains = async () => {
      const response = await fetch('http://localhost:3001/login/customer'); // Adjust the URL as necessary
      const data = await response.json();
      setHotelChains(data);
    };

    fetchHotelChains();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleAddButtonClick = () => {
    console.log("Add button clicked");
    setCreateScreenVisible(true);
  };

  const filteredHotelChains = hotelChains.filter((chain) =>
    chain.name.toLowerCase().includes(processedQuery.toLowerCase())
  );

  const handleSearch = () => {
    setProcessedQuery(searchQuery.toLowerCase());
  };

  const handleClear = () => {
    setSearchQuery(""); // Clear the search query
    setProcessedQuery(""); // Clear the processed query
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevent default form submission behavior
    handleSearch(); // Process the search query
  };
  const { isEmployee } = useIsEmployee();

  return (
    <>
      <div className="Header">Hotel-Chains</div>
      <div className="SearchbarContainer">
        <form onSubmit={handleSubmit}>
          <input
            className="SearchBar"
            type="text"
            placeholder="Search by hotel chain name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="ActionButton" type="submit">
            Go
          </button>
          <button className="ActionButton" type="button" onClick={handleClear}>
            Clear
          </button>
        </form>
      </div>
      <div className="list-of-hotelchains">
        {filteredHotelChains.map((hotelChain) => (
          <HotelChain key={hotelChain.id} hotelChain={hotelChain} />
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
        <CreateHotelChain onClose={() => setCreateScreenVisible(false)} />
      )}
    </>
  );
}

export default HotelChainsPage;
