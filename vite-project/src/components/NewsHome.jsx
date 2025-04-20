// NewsHome.jsx
import React, { useEffect, useState } from 'react';
import HeroCard from './HeroCard';
import CategorySelector from './CategorySelector';

function NewsHome() {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('technology');
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
  const gridArticles = articles.slice(3);

  return (
    <div className="p-4">
      <CategorySelector 
        selectedCategory={selectedCategory} 
        onCategoryChange={handleCategoryChange} 
      />
      {articles.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <HeroCard articles={articles.slice(0, 3)} category={selectedCategory} />
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            marginTop: '40px',
            padding: '0 20px'
          }}>
            {gridArticles.map((article, index) => (
              <div 
                key={index} 
                onClick={() => handleArticleClick(article.url)}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundColor: '#1a1a1a',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                {article.urlToImage && (
                  <img 
                    src={article.urlToImage} 
                    alt={article.title}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                  />
                )}
                <div style={{ padding: '15px' }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '18px',
                    marginBottom: '10px'
                  }}>
                    {article.title}
                  </h3>
                  <p style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '14px'
                  }}>
                    {article.description}
                  </p>
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
