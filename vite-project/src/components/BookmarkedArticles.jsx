import React from 'react';

function BookmarkedArticles({ bookmarkedArticles, handleArticleClick, handleBookmark }) {
  return (
    <div className="p-4">
      <h2 style={{ color: 'white', marginBottom: '20px' }}>Bookmarked Articles</h2>

      {bookmarkedArticles.length === 0 ? (
        <p style={{ color: '#aaa', fontSize: '18px' }}>
          No articles have been bookmarked yet.
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            marginTop: '20px',
          }}
        >
          {bookmarkedArticles.map((article, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                border: '1px solid #ddd',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#1a1a1a',
                transition: 'transform 0.2s',
                cursor: 'pointer',
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              onClick={() => handleArticleClick(article.url)}
            >
              {/* Dynamic Bookmark Icon */}
              <div
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering article click
                  handleBookmark(article);
                }}
                title="Remove Bookmark"
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  borderRadius: '50%',
                  padding: '6px 8px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              >
                🔖
              </div>

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
                <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '10px' }}>
                  {article.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                  {article.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookmarkedArticles;