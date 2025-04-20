import React from 'react';

function Navbar() {
  const styles = {
    navbar: {
      backgroundColor: '#1a1a1a',
      padding: '20px 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      width: '100%'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      color: 'white',
      margin: 0,
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '2px'
    },
    buttons: {
      display: 'flex',
      gap: '10px'
    },
    loginBtn: {
      padding: '8px 20px',
      backgroundColor: 'transparent',
      border: '1px solid white',
      color: 'white',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '1rem',
      fontWeight: '500'
    },
    signupBtn: {
      padding: '8px 20px',
      backgroundColor: 'white',
      border: 'none',
      color: '#1a1a1a',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '1rem',
      fontWeight: '500'
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <h1 style={styles.title}>Easy News</h1>
        <div style={styles.buttons}>
          <button 
            style={styles.loginBtn}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = '#1a1a1a';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'white';
            }}
          >
            Login
          </button>
          <button 
            style={styles.signupBtn}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#e0e0e0';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 