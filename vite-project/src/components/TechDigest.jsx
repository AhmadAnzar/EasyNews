import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



function TechDigest() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.style.backgroundColor = 'black';
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
  
    return () => {
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);
  
  

  async function handleClick() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
      );
      const data = await response.json();

      if (!data.articles || data.articles.length === 0) {
        throw new Error('No articles found');
      }

      setArticles(data.articles);
    } catch (err) {
      console.error('Error:', err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '900px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#1a1a1a',
      color: '#fff', 
      borderRadius: '10px',
    },
    button: {
      backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '12px 28px',
      border: 'none',
      borderRadius: '30px',
      fontSize: '17px',
      fontWeight: '600',
      letterSpacing: '0.5px',
      cursor: 'pointer',
      marginBottom: '20px',
      boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
      transition: 'all 0.3s ease',
    },
    searchBar: {
      display: 'flex',
      marginBottom: '20px',
      alignItems: 'center',
    },
    searchInput: {
      flex: 1,
      padding: '10px 15px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '30px',
      outline: 'none',
      marginRight: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    searchButton: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '30px',
      fontSize: '16px',
      cursor: 'pointer',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      transition: 'all 0.3s ease',
    },
    article: {
      display: 'flex',
      backgroundColor: '#333', 
      padding: '15px',
      marginBottom: '15px',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    image: {
      width: '150px',
      height: '100px',
      objectFit: 'cover',
      borderRadius: '8px',
      marginRight: '15px',
    },
    content: {
      flex: 1,
    },
    title: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '8px',
      color: '#ffcc00', 
      textDecoration: 'none',
    },
    summary: {
      fontSize: '14px',
      color: '#ccc',
    },
    returnButton: {
      backgroundColor: '#ff4d4d',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '30px',
      fontSize: '16px',
      cursor: 'pointer',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      transition: 'all 0.3s ease',
      marginTop: '20px',
    },
  };

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <button onClick={handleClick} style={styles.button}>
        {loading ? 'Loading...' : 'Fetch Tech Headlines'}
      </button>

      {/* Search Bar */}
      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
        <button style={styles.searchButton}>Search</button>
      </div>

      {/* Articles */}
      {filteredArticles.map((article, index) => (
        <div key={index} style={styles.article}>
          <img
            src={article.urlToImage || 'https://via.placeholder.com/150'}
            alt="news"
            style={styles.image}
          />
          <div style={styles.content}>
            <a href={article.url} target="_blank" rel="noopener noreferrer" style={styles.title}>
              {article.title}
            </a>
            <p style={styles.summary}>{article.description}</p>
          </div>
        </div>
      ))}

      {filteredArticles.length === 0 && !loading && (
        <p>No articles match your search. Try a different keyword.</p>
      )}

      {/* Return Home Button */}
      <button onClick={() => navigate('/home')} style={styles.returnButton}>
        Return Home
      </button>
    </div>
  );
}

export default TechDigest;

