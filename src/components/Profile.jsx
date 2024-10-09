import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'; 
import BackButton from './BackButton'; 
import Logout from './Logout'; 
const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); 
      try {
        const response = await axios.get('http://localhost:5000/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        setError('Could not fetch user data.');
      }
    };
    fetchUserData();
  }, []);
  return (
    <div className="profile-container">
      <BackButton />
      <h2>User Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {user ? (
        <div className="user-details">
          <p><strong>Full Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Username:</strong> {user.username}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
      <Logout /> 
    </div>
  );
};
export default Profile;
