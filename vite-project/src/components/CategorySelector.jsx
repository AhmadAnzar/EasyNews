import React from 'react';

const categories = [
    'technology',
    'business',
    'sports',
    'health',
    'science',
    'entertainment'
];

function CategorySelector({ selectedCategory, onCategoryChange }) {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            gap: '30px', 
            margin: '20px 0',
            flexWrap: 'wrap',
            padding: '10px'
        }}>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    style={{
                        padding: '10px 20px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        minWidth: '120px',
                        textAlign: 'center',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
            ))}
        </div>
    );
}

export default CategorySelector; 