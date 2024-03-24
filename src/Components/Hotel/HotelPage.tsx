import React from "react";
import Hotel from "./Hotel";
import "./HotelPage.css";

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
  return (
    <>
      <div className="list-of-hotels">
        {hotels.map((hotel) => (
          <Hotel key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </>
  );
}

export default HotelPage;
