import React from "react";
import HotelChain from "./HotelChain";
const hotelChains = [
  { id: 1, name: "Marriott" },
  { id: 2, name: "Hilton" },
  { id: 3, name: "Hyatt" },
  // Add more hotel chains here...
];

function HotelChainsPage() {
  const hotelChains = [
    {
      id: 1,
      name: "Marriott",
      email: "info@marriott.com",
      numHotels: 10,
      phoneNumbers: ["123-456-7890", "987-654-3210"],
    },
    {
      id: 2,
      name: "Hilton",
      email: "info@hilton.com",
      numHotels: 8,
      phoneNumbers: ["123-456-7890", "987-654-3210", "555-555-5555"],
    },
    {
      id: 3,
      name: "Hyatt",
      email: "info@hyatt.com",
      numHotels: 12,
      phoneNumbers: ["123-456-7890"],
    },
    {
      id: 4,
      name: "Sheraton",
      email: "info@sheraton.com",
      numHotels: 6,
      phoneNumbers: ["123-456-7890", "555-555-5555"],
    },
    {
      id: 5,
      name: "InterContinental",
      email: "info@intercontinental.com",
      numHotels: 15,
      phoneNumbers: ["123-456-7890", "987-654-3210", "555-555-5555"],
    },
  ];
  return (
    <div>
      {hotelChains.map((hotelChain) => (
        <HotelChain key={hotelChain.id} hotelChain={hotelChain} />
      ))}
    </div>
  );
}

export default HotelChainsPage;
