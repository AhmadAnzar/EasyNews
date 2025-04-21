import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewsHome from './components/NewsHome';
import OpeningForm from './components/OpeningForm';
import TechDigest from './components/TechDigest';
import BookmarkedArticles from './components/BookmarkedArticles';
import React, { useState } from 'react';

function App() {
  const navigate = useNavigate(); // React Router's navigation hook
  const location = useLocation(); // Get the current route
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  const isTechDigestPage = location.pathname === '/techdigest'; // Check if on TechDigest page

  // Function to handle bookmarking/unbookmarking articles
  const handleBookmark = (article) => {
    if (bookmarkedArticles.some((a) => a.url === article.url)) {
      // Remove the article if it's already bookmarked
      setBookmarkedArticles(bookmarkedArticles.filter((a) => a.url !== article.url));
    } else {
      // Add the article to bookmarks
      setBookmarkedArticles([...bookmarkedArticles, article]);
    }
  };

  // Function to handle article click (open in a new tab)
  const handleArticleClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className={isTechDigestPage ? 'inverted-colors' : ''}>
      <Navbar />
      {/* Button to toggle between TechDigest and Home */}
      <button
        onClick={() => navigate(isTechDigestPage ? '/home' : '/techdigest')}
        className="tech-digest-button"
      >
        {isTechDigestPage ? 'Return Home' : 'Open Tech Digest'}
      </button>

      {/* Routes for different pages */}
      <Routes>
        {/* OpeningForm is the default route */}
        <Route path="/" element={<OpeningForm />} />

        {/* NewsHome is displayed after login/signup */}
        <Route
          path="/home"
          element={
            <NewsHome
              bookmarkedArticles={bookmarkedArticles}
              handleBookmark={handleBookmark}
              handleArticleClick={handleArticleClick}
            />
          }
        />

        {/* TechDigest is displayed when navigating to /techdigest */}
        <Route
          path="/techdigest"
          element={
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                zIndex: 1000,
                overflowY: 'auto',
              }}
            >
              <div style={{ padding: '20px' }}>
                <TechDigest />
              </div>
            </div>
          }
        />

        {/* BookmarkedArticles is displayed when navigating to /bookmarked */}
        <Route
          path="/bookmarked"
          element={
            <BookmarkedArticles
              bookmarkedArticles={bookmarkedArticles}
              handleBookmark={handleBookmark}
              handleArticleClick={handleArticleClick}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
