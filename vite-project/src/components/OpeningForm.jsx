import React from "react";
import "./LandingPage.css"; 

export default function OpeningForm() {
  return (
    <div className="container">
      {/* Left Side */}
      <div className="left">
        <div className="button-group">
          <button className="btn login">Login</button>
          <button className="btn signup">Sign Up</button>
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

      {/* Right Side */}
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

