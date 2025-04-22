import React, { useEffect, useState } from 'react';
import HeroCard from './HeroCard';
import CategorySelector from './CategorySelector';
import { useNavigate } from 'react-router-dom';

export default function NewsHome() {
    const [articles, setArticles] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('technology');
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
    const navigate = useNavigate();

    // Fetch from our proxy whenever the category or search query changes
    useEffect(() => {
        async function fetchArticles() {
            const baseUrl = import.meta.env.VITE_BACKEND_URL;
            const url =
                `${baseUrl}/news?country=us&category=${selectedCategory}` +
                (searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : '');
            console.log('Fetching articles from:', url);
            try {
                const res = await fetch(url);
                const data = await res.json();
                console.log('Received data:', data);
                setArticles(Array.isArray(data.articles) ? data.articles : []);
            } catch (err) {
                console.error('Error fetching news:', err);
                setArticles([]);
            }
        }
        fetchArticles();
    }, [selectedCategory, searchQuery]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleSearchClick = () => {
        setSearchQuery(searchInput.trim());
    };

    const handleArticleClick = (url) => {
        window.open(url, '_blank');
    };

    const handleBookmark = (article) => {
        setBookmarkedArticles((prev) =>
            prev.some((a) => a.url === article.url)
                ? prev.filter((a) => a.url !== article.url)
                : [...prev, article]
        );
    };

    // Client-side filter for UI responsiveness
    const filteredArticles = articles.filter(
        (a) =>
            a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (a.description && a.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    const gridArticles = filteredArticles.slice(3);

    return (
        <div className="p-4">
            {/* Category selector */}
            <CategorySelector
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />

            {/* Search input + button */}
            <div style={{ display: 'flex', marginBottom: '20px', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    style={{
                        flex: 1,
                        padding: '10px 15px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '30px',
                        marginRight: '10px',
                        outline: 'none',
                    }}
                />
                <button
                    type="button"
                    onClick={handleSearchClick}
                    style={{
                        backgroundColor: '#fffacd',
                        color: '#000',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        transition: 'all 0.3s ease',
                    }}
                >
                    Search
                </button>
            </div>

            {/* TechDigest page link */}
            <button
                className="tech-digest-button"
                type="button"
                onClick={() => navigate('/techdigest')}
            >
                Tech Digest
            </button>

            {/* Top-3 carousel */}
            <HeroCard articles={filteredArticles.slice(0, 3)} category={selectedCategory} />

            {/* Grid of the rest */}
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
                        No articles match your search.
                    </p>
                ) : (
                    gridArticles.map((article, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleArticleClick(article.url)}
                            style={{
                                position: 'relative',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                backgroundColor: '#1a1a1a',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                            {/* Bookmark icon */}
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
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
                                    backgroundColor: 'rgba(255,255,255,0.85)',
                                    borderRadius: '50%',
                                    padding: '6px 8px',
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
                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
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

            {/* Bookmarks button */}
            {bookmarkedArticles.length > 0 && (
                <button
                    type="button"
                    onClick={() => navigate('/bookmarked')}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        left: '20px',
                        backgroundColor: '#ffcc00',
                        color: '#000',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        zIndex: 1000,
                    }}
                >
                    See Bookmarks Here
                </button>
            )}
        </div>
    );
}
