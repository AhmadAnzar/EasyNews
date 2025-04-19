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
          <HeroCard articles={articles} />
          <div>
            <h1>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} News</h1>
            <div>
              <ul>
                {articles.map((article, index) => (
                  <li key={index}>
                    <h2>{article.title}</h2>
                    <p>{article.description}</p>
                    {article.urlToImage && <img src={article.urlToImage} alt="Article" style={{ width: '100px' }} />}
                    <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NewsHome;
