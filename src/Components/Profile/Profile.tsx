import React from "react";
import "./Profile.css";
import profile_icon from "../Assets/profile-icon-design-free-vector.jpg";
const hotelChains = [
  {
    id: 1,
    name: "Marriott",
    email: "info@marriott.com",
    numHotels: 10,
    phoneNumbers: ["123-456-7890", "987-654-3210"],
  },
];
const Profile = () => {
  const hotelChain = hotelChains[0];
  return (
    <div className="upc">
      <div className="gradient">
        <div className="profile-down">
          <img src={profile_icon} alt="" />
          <div className="profile-title">Yi Long Ma</div>
          <div className="profile-description">I am a huge fucking penis</div>
          <div className="profile-section">
            <div className="profile-info">SSN: 123-45-6789</div>
            <div className="profile-info">Role/Position: Software Engineer</div>
            <div className="profile-info">Employee ID: 123456</div>
            <div className="profile-info">
              Phone Numbers:
              <ul className="phone-list">
                {hotelChain.phoneNumbers.map((phoneNumber, index) => (
                  <li key={index}>{phoneNumber}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
