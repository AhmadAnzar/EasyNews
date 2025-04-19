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
        <div className="flex justify-center gap-4 my-5 p-3 flex-wrap">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`
                        px-5 py-2.5 rounded-lg font-medium text-base
                        transition-all duration-300 min-w-[120px] text-center
                        ${selectedCategory === category 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-50 text-black border border-gray-200 hover:bg-gray-100'
                        }
                    `}
                >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
            ))}
        </div>
    );
}

export default CategorySelector; 