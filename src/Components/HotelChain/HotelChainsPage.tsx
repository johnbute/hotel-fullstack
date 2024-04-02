import React, { useState } from "react";
import HotelChain from "./HotelChain";
import image1 from "../Assets/hotelchain_images/exterior-view (1).jpg";
import image2 from "../Assets/hotelchain_images/exterior-view (2).jpg";
import "./HotelChainsPage.css";
import image3 from "../Assets/hotelchain_images/exterior-view.jpg";
import image4 from "../Assets/hotelchain_images/luxury-tent-views.jpg";
import { useIsEmployee } from "../../Context/IsEmployeeContext";
import CreateHotelChain from "../Form/CreateHotelChain";

function HotelChainsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [processedQuery, setProcessedQuery] = useState("");
  const [isCreateScreenVisible, setCreateScreenVisible] = useState(false);
  const handleAddButtonClick = () => {
    console.log("Add button clicked");
    setCreateScreenVisible(true);
  };
  const hotelChains = [
    {
      id: 1,
      name: "Marriott",
      email: "info@marriott.com",
      numHotels: 10,
      phoneNumbers: ["123-456-7890", "987-654-3210"],
      image: image1,
    },
    {
      id: 2,
      name: "Hilton",
      email: "info@hilton.com",
      numHotels: 8,
      phoneNumbers: ["123-456-7890", "987-654-3210", "555-555-5555"],
      image: image2,
    },
    {
      id: 3,
      name: "Hyatt",
      email: "info@hyatt.com",
      numHotels: 12,
      phoneNumbers: ["123-456-7890"],
      image: image3,
    },
    {
      id: 4,
      name: "Sheraton",
      email: "info@sheraton.com",
      numHotels: 6,
      phoneNumbers: ["123-456-7890", "555-555-5555"],
      image: image4,
    },
    {
      id: 5,
      name: "InterContinental",
      email: "info@intercontinental.com",
      numHotels: 15,
      phoneNumbers: ["123-456-7890", "987-654-3210", "555-555-5555"],
      image: image1,
    },
    {
      id: 9,
      name: "Marriott",
      email: "info@marriott.com",
      numHotels: 10,
      phoneNumbers: ["123-456-7890", "987-654-3210"],
      image: image1,
    },
    {
      id: 10,
      name: "Marriott",
      email: "info@marriott.com",
      numHotels: 10,
      phoneNumbers: ["123-456-7890", "987-654-3210"],
      image: image1,
    },
  ];

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
