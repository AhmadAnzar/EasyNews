import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function TechDigest() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const navigate = useNavigate(); // React Router's navigation hook

  async function handleClick() {
    const NEWS_API_KEY = '82d7dbcb9ee94a26a57db14738088f1e';
    const HUGGINGFACE_API_KEY = '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';

    try {
      setLoading(true);
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${NEWS_API_KEY}`
      );
      const data = await response.json();

      if (!data.articles || data.articles.length === 0) {
        throw new Error('No articles found');
      }
      const summarizedArticles = await Promise.all(
        data.articles.map(async (article) => {
          const content = article.description || article.content || article.title;

          const res = await fetch(
            'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ inputs: content }),
            }
          );

          const result = await res.json();
          const summary = result?.[0]?.summary_text || article.title;

          return {
            ...article,
            summary,
          };
        })
      );

      setArticles(summarizedArticles);
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
      backgroundColor: '#f4f4f4',
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
      backgroundColor: 'white',
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
      color: '#007bff',
      textDecoration: 'none',
    },
    summary: {
      fontSize: '14px',
      color: '#333',
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

  // Filter articles based on the search query
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase())
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
            <p style={styles.summary}>{article.summary}</p>
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

