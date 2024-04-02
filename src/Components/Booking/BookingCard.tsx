import React from "react";
import { useIsEmployee } from "../../Context/IsEmployeeContext";
import { FaTrash } from "react-icons/fa"; // Import FaTrash icon
import { useNavigate } from "react-router";
import "./BookingCard.css";
function BookingCard({ booking }) {
  const { isEmployee } = useIsEmployee(); // Use useIsEmployee hook to get isEmployee value

  const handleDelete = () => {
    // Implement handle delete logic
    console.log("delete booking", booking);
  };
  return (
    <div>
      <div className="booking-card">
        {isEmployee && (
          <div className="delete-booking" onClick={handleDelete}>
            <FaTrash />
          </div>
        )}

        <div className="booking-details">
          <h2 className="booking-customer">{booking.customer}</h2>
          <p className="booking-start-date">Start-Date: {booking.start_date}</p>
          <p className="booking-end-date">End-Date: {booking.end_date}</p>
          <p
            className={`payment-status ${booking.payment_status.toLowerCase()}`}
          >
            {booking.payment_status}
          </p>
        </div>
        {isEmployee && (
          <button className="Check-In Button" onClick={() => {}}>
            Check-in
          </button>
        )}
      </div>
    </div>
  );
}

export default BookingCard;
