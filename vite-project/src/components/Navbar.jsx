
import React from 'react';

function Navbar() {
  return (
    <nav style={{
      padding: '20px 0',
      top: 0,
      
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <h1 style={{
          color: 'white',
          margin: 0,
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          Easy News
        </h1>
      </div>
    </nav>
  );
}

export default Navbar;