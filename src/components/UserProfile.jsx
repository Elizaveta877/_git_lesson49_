import React, { useState, useEffect } from "react";
import "./UserProfile.css";


const UserProfile = () => {

const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);


useEffect(() => {

const fetchUserData = async () => {
  try {
    setLoading(true);
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    setUser(data);
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
  }
};

fetchUserData();
}, []);

if (loading) {
  return <div className="loading">Loading...</div>;
}

if (error) {
  return <div className="error" style={{ color: "red" }}>Error: {error.message}</div>;
}

return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            {user.name.charAt(0)}
          </div>
          <h2>{user.name}</h2>
          <p className="username">@{user.username || 'user1'}</p>
        </div>
        
        <div className="profile-body">
          <div className="info-item">
            <span className="label">Email:</span>
            <span className="value">{user.email}</span>
          </div>
          <div className="info-item">
            <span className="label">Phone:</span>
            <span className="value">{user.phone}</span>
          </div>
          <div className="info-item">
            <span className="label">Company:</span>
            <span className="value">{user.company?.name}</span>
          </div>
        </div>
        
        <button className="profile-button">Написати повідомлення</button>
      </div>
    </div>
  );
};

export default UserProfile;