import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./LandingPage.css"; 
import globeImage from '../assets/globe.jpg';

export default function OpeningForm() {
  const navigate = useNavigate();

  const handleLoginSignup = () => {
    navigate('/home'); 
  };

  return (
    <div className="container">
  <div className="left">
    <h1>Welcome to EasyNews</h1>
    <div className="button-group">
      <button className="btn login" onClick={handleLoginSignup}>Login</button>
      <button className="btn signup" onClick={handleLoginSignup}>Sign Up</button>
    </div>
    <form>
      <input
        type="email"
        placeholder="Email"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        required
        className="input"
      />
      <input
        type="password"
        placeholder="Password"
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

