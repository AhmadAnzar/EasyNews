import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import NewsHome from './components/NewsHome';
import OpeningForm from './components/OpeningForm';
import TechDigest from './components/TechDigest';
import BookmarkedArticles from './components/BookmarkedArticles';
import React, { useState } from 'react';

function App() {
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  const handleBookmark = (article) => {
    const updatedBookmarks = bookmarkedArticles.some((a) => a.url === article.url)
      ? bookmarkedArticles.filter((a) => a.url !== article.url)
      : [...bookmarkedArticles, article];
    setBookmarkedArticles(updatedBookmarks);
  };

  const handleArticleClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        {/* Opening Form Route */}
        <Route path="/" element={<OpeningForm />} />

        {/* News Home Route */}
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

        {/* Tech Digest Route */}
        <Route path="/techdigest" element={<TechDigest />} />

        {/* Bookmarked Articles Route */}
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

// Wrap with Router
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
