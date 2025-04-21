import React, { useState } from 'react';

function TechDigest() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

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
          const summary = result?.[0]?.summary_text || article.title ;

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
      backgroundColor: '#007bff',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      marginBottom: '20px',
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
  };

  return (
    <div style={styles.container}>
      <button onClick={handleClick} style={styles.button}>
        {loading ? 'Loading...' : 'Fetch Tech Headlines'}
      </button>

      {articles.map((article, index) => (
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

      {articles.length === 0 && !loading && <p>No articles to show yet. Click the button above.</p>}
    </div>
  );
}

export default TechDigest;

