
import React, { useEffect, useState } from 'react';
import HeroCard from './HeroCard';
import CategorySelector from './CategorySelector';

function NewsHome() {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('technology');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]); // State for bookmarks
  const API_KEY = '82d7dbcb9ee94a26a57db14738088f1e';

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}&apiKey=${API_KEY}`
        );
        const data = await response.json();
        if (data.articles) {
          setArticles(data.articles);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchArticles();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleArticleClick = (url) => {
    window.open(url, '_blank');
  };

  const handleBookmark = (article) => {
    if (!bookmarkedArticles.some((a) => a.url === article.url)) {
      setBookmarkedArticles([...bookmarkedArticles, article]);
    }
  };

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.description && article.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const gridArticles = filteredArticles.slice(3);

  return (
    <div className="p-4">
      <CategorySelector
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Search Bar */}
      <div style={{ display: 'flex', marginBottom: '20px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            padding: '10px 15px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '30px',
            outline: 'none',
            marginRight: '10px',
          }}
        />
        <button
          style={{
            backgroundColor: '#fffacd', 
            color: '#000',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '30px',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
          }}
        >
          Search
        </button>
      </div>

      {filteredArticles.length === 0 ? (
        <p>No articles match your search. Try a different keyword.</p>
      ) : (
        <>
          <HeroCard articles={filteredArticles.slice(0, 3)} category={selectedCategory} />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px',
              marginTop: '40px',
              padding: '0 20px',
            }}
          >
            {gridArticles.map((article, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundColor: '#1a1a1a',
                  transition: 'transform 0.2s',
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                    }}
                  />
                )}
                <div style={{ padding: '15px' }}>
                  <h3
                    style={{
                      color: 'white',
                      fontSize: '18px',
                      marginBottom: '10px',
                    }}
                  >
                    {article.title}
                  </h3>
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '14px',
                    }}
                  >
                    {article.description}
                  </p>
                  <button
                    onClick={() => handleBookmark(article)}
                    style={{
                      backgroundColor: '#ffcc00',
                      color: '#000',
                      padding: '8px 15px',
                      border: 'none',
                      borderRadius: '20px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      marginTop: '10px',
                    }}
                  >
                    Bookmark
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default NewsHome;
