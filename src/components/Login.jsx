import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Optional: import CSS for styling
import BackButton from './BackButton'; // Import the BackButton

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      // Store the token in local storage
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token); // If you're using this in your app's state
      alert('Login successful!');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="login-container">
      <BackButton /> {/* Add the BackButton here */}
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
