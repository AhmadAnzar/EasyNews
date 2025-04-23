import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation(); // Get the current route

  const styles = {
   
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      textDecoration: 'none',
    },
    title: {
      color: 'white',
      margin: 0,
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      cursor: 'pointer',
      transition: 'opacity 0.3s ease',
    },
    buttons: {
      display: 'flex',
      gap: '10px',
    },
    techDigestButton: {
      backgroundColor: '#6a11cb',
      color: 'white',
      padding: '10px 40px',
      borderRadius: '30px',
      fontSize: '26px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        {/* Easy News title on the left */}
        <h1
          style={{
            color: 'white',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            margin: 0,
            cursor: 'pointer',
          }}
          onClick={() => (window.location.href = '/')}
        >
          Easy News
        </h1>

        {/* Tech Digest button on the right */}
        {location.pathname !== '/' && (
          <button
            onClick={() => (window.location.href = '/techdigest')}
            style={{
              background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '30px',
              fontSize: '16px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            Tech Digest
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;