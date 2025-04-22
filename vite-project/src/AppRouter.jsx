// src/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TechDigest from './components/TechDigest'; // Importing your TechDigest component
// Import other components here if you add more routes later

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<TechDigest />} />
        {/* Add more routes as your app grows */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
