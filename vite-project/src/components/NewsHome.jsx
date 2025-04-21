import React, { useEffect, useState } from 'react';
import HeroCard from './HeroCard';
import CategorySelector from './CategorySelector';
import { useNavigate } from 'react-router-dom';

function NewsHome() {
    const [articles, setArticles] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('technology');
    const [searchQuery, setSearchQuery] = useState('');
    const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(
                    `https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
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

    const handleArticleClick = (url) => {
        window.open(url, '_blank');
    };

    // Handle Bookmark Toggle: Add or Remove Article from Bookmarks
    const handleBookmark = (article) => {
        if (bookmarkedArticles.some((a) => a.url === article.url)) {
            setBookmarkedArticles(bookmarkedArticles.filter((a) => a.url !== article.url));
        } else {
            setBookmarkedArticles([...bookmarkedArticles, article]);
        }
    };

    const filteredArticles = articles.filter(
        (article) =>
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (article.description && article.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const gridArticles = filteredArticles.slice(3);

    return (
        <div className="p-4">
            <CategorySelector
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />

            {/* Search Bar */}
            <div style={{ display: 'flex', marginBottom: '20px', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        flex: 1,
                        padding: '10px 15px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '30px',
                        outline: 'none',
                        marginRight: '10px',
                    }}
                />
                <button
                    style={{
                        backgroundColor: '#fffacd',
                        color: '#000',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '30px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s ease',
                    }}
                >
                    Search
                </button>
            </div>

            {/* Articles Display */}
            <HeroCard
                articles={filteredArticles.slice(0, 3)}
                category={selectedCategory}
            />

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px',
                    marginTop: '40px',
                    padding: '0 20px',
                }}
            >
                {gridArticles.length === 0 ? (
                    <p style={{ color: '#aaa', fontSize: '18px' }}>
                        No articles match your search. Try a different keyword.
                    </p>
                ) : (
                    gridArticles.map((article, index) => (
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
                                    e.stopPropagation(); // Prevent triggering the article click
                                    handleBookmark(article);
                                }}
                                title={
                                    bookmarkedArticles.some((a) => a.url === article.url)
                                        ? 'Remove Bookmark'
                                        : 'Add Bookmark'
                                }
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
                                {bookmarkedArticles.some((a) => a.url === article.url) ? '❌' : '😍'}
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
                    ))
                )}
            </div>

            {/* Button to navigate to the Bookmarked Articles page */}
            {bookmarkedArticles.length > 0 && (
                <button
                    onClick={() => navigate('/bookmarked')}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        left: '20px',
                        backgroundColor: '#ffcc00',
                        color: 'black',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '30px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        zIndex: 1000,
                    }}
                >
                    See Bookmarks Here
                </button>
            )}
        </div>
    );
}

export default NewsHome;
