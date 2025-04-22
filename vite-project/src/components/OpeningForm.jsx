import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./LandingPage.css"; 
import globeImage from '../assets/globe.jpg';

export default function OpeningForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // simple patterns: valid email, password at least 6 chars
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  const passwordRegex = /^.{4,}$/;
  const isFormValid = emailRegex.test(email) && passwordRegex.test(password);

  const handleLoginSignup = () => {
    if (!isFormValid) {
      alert('Please enter a valid email and a password of at least 4 characters.');
      return;
    }
    navigate('/home');
  };

  return (
    <div className="container">
      <div className="left">
        <h1>Welcome to EasyNews</h1>
        <div className="button-group">
          <button
            type="button"
            className="btn login"
            onClick={handleLoginSignup}
          >
            Login
          </button>
          <button
            type="button"
            className="btn signup"
            onClick={handleLoginSignup}
          >
            Sign Up
          </button>
        </div>
        <form>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
        </form>
      </div>

      <div className="right">
        <div className="image-placeholder">
          <img src={globeImage} alt="Globe" className="globe-img" />
        </div>

        <h2 className="description">Your one stop source for the latest news</h2>
      </div>
    </div>
  );
}

