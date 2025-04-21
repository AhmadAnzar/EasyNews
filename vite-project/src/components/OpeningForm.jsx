import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./LandingPage.css"; 

export default function OpeningForm() {
  const navigate = useNavigate();

  const handleLoginSignup = () => {
    navigate('/home'); 
  };

  return (
    <div className="container">
      <h1>Welcome to EasyNews</h1>
      <div className="left">
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
        <h2 className="title"></h2>
        <div className="image-placeholder">
          <span>Image here</span>
        </div>
        <h2 className="description">Description goes here</h2>
      </div>
    </div>
  );
}

