import BookingCard from "./BookingCard";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const bookings = [
  {
    id: 1,
    image: "https://via.placeholder.com/100",
    name: "Sunset Resort",
    customer: "John Doe",
    start_date: "2023-04-10",
    end_date: "2023-04-15",
    payment_status: "Paid",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/100",
    name: "Mountain View Hotel",
    customer: "Jane Smith",
    start_date: "2023-05-01",
    end_date: "2023-05-05",
    payment_status: "Unpaid",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/100",
    name: "Beachside Bungalow",
    customer: "Alice Johnson",
    start_date: "2023-06-15",
    end_date: "2023-06-20",
    payment_status: "Paid",
  },
];

function MyBooking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null);

  // Filter bookings based on search term and selected start date
  const filteredBookings = bookings.filter((booking) => {
    const matchesCustomer = booking.customer
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStartDate = startDate
      ? booking.start_date === startDate.toISOString().split("T")[0]
      : true;

    return matchesCustomer && matchesStartDate;
  });

  return (
    <div>
      <div className="Header">Bookings</div>
      <div className="search-field">
        <input
          type="text"
          placeholder="Search by customer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select start date"
        />
      </div>
      {filteredBookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}

export default MyBooking;
