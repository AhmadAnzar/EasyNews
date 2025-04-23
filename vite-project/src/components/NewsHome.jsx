import React, { useEffect, useState } from 'react';
import HeroCard from './HeroCard';
import Scroll from './Scroll'
import CategorySelector from './CategorySelector';
import { useNavigate } from 'react-router-dom';

export default function NewsHome() {
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [articles, setArticles] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('technology');
    const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
    const [nextPageToken, setNextPageToken] = useState('');
    const navigate = useNavigate();

    const baseUrl = 'https://newsdata.io/api/1/news';
    const apiKey = import.meta.env.VITE_NEWSDATA_API_KEY || 'pub_815901eef37963a75598c07056ce9ee8d8ce4';

    useEffect(() => {
        fetchArticles(true); // fresh fetch on category/search change
    }, [selectedCategory, searchQuery]);

    async function fetchArticles(isNew = false) {
        try {
            const validCategories = [
                'business', 'entertainment', 'environment', 'food', 'health',
                'politics', 'science', 'sports', 'technology', 'top', 'tourism', 'world'
            ];
            if (!validCategories.includes(selectedCategory)) {
                throw new Error(`Invalid category: ${selectedCategory}`);
            }
    
            const queryParams = new URLSearchParams({
                apikey: apiKey,
                language: 'en'
            });
    
            if (searchQuery) {
                queryParams.append('q', searchQuery);
            } else {
                queryParams.append('category', selectedCategory);
            }
    
            if (!isNew && nextPageToken) {
                queryParams.append('page', nextPageToken);
            }
    
            const endpoint = `${baseUrl}?${queryParams.toString()}`;
            console.log('Fetching from:', endpoint);
    
            const res = await fetch(endpoint);
            const json = await res.json();
    
            if (json.results && Array.isArray(json.results)) {
                // Filter articles with valid images
                const articlesWithImages = json.results.filter(
                    (article) => article.image_url && article.image_url !== 'None'
                );
                const articlesWithTrimmedDescriptions = articlesWithImages.map((article) => ({
                    ...article,
                    description: article.description ? article.description.substring(0, 30) + '...' : ''
                }));
    
                setArticles((prev) => isNew ? articlesWithTrimmedDescriptions : [...prev, ...articlesWithTrimmedDescriptions]);
                setNextPageToken(json.nextPage || '');
            } else {
                console.error('Invalid response structure:', json);
                if (isNew) setArticles([]);
            }
        } catch (err) {
            console.error('Error fetching articles:', err);
            if (isNew) setArticles([]);
        }
    }
    
    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        setArticles([]);
        setNextPageToken('');
        setSearchQuery('');
    };

    const handleSearchClick = (e) => {
        e.preventDefault();
        console.log('Search button clicked, but it is a dummy button.');
    };

    const handleArticleClick = (url) => window.open(url, '_blank');

    const handleBookmark = (article) => {
        setBookmarkedArticles((prev) =>
            prev.some((a) => a.link === article.link)
                ? prev.filter((a) => a.link !== article.link)
                : [...prev, article]
        );
    };

    const loadMoreArticles = () => {
        if (nextPageToken) fetchArticles(false);
    };

    const filtered = articles.filter(
        (a) =>
            a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (a.description || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    const heroArticles = filtered.slice(0, 3);
    const gridArticles = filtered.slice(0, 13); 

    return (
        <div className="p-4">
            <CategorySelector
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />

            <div style={{ display: 'flex', marginBottom: 20 }}>
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    style={{
                        flex: 1,
                        padding: '10px 15px',
                        borderRadius: 30,
                        border: '1px solid #ccc',
                        marginRight: 10,
                    }}
                />
                <button
                    type="button"
                    onClick={handleSearchClick} 
                    style={{
                        backgroundColor: 'black',
                        color: 'white', 
                        borderRadius: 30,
                        border: 'none',
                        padding: '10px 20px',
                        cursor: 'pointer',
                    }}
                >
                    Search
                </button>
            </div>

            <HeroCard articles={heroArticles} category={selectedCategory} />

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 20,
                    marginTop: 40,
                }}
            >
                {gridArticles.length === 0 ? (
                    <p style={{ color: '#888' }}>No articles found.</p>
                ) : (
                    gridArticles.map((a, i) => (
                        <div
                            key={i}
                            onClick={() => handleArticleClick(a.link)}
                            style={{
                                position: 'relative',
                                border: '1px solid #444',
                                borderRadius: 8,
                                cursor: 'pointer',
                                overflow: 'hidden',
                            }}
                        >
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleBookmark(a);
                                }}
                                title={
                                    bookmarkedArticles.some((b) => b.link === a.link)
                                        ? 'Remove Bookmark'
                                        : 'Add Bookmark'
                                }
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 10,
                                    background: 'rgba(255,255,255,0.85)',
                                    borderRadius: '50%',
                                    padding: '5px 8px',
                                    cursor: 'pointer',
                                }}
                            >
                                {bookmarkedArticles.some((b) => b.link === a.link) ? '❌' : '😍'}
                            </div>

                            {a.image_url && (
                                <img
                                    src={a.image_url}
                                    alt={a.title}
                                    className="no-invert"
                                    style={{
                                        width: '100%',
                                        height: '160px',
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                    }}
                                />
                            )}
                            <div style={{ padding: 12 }}>
                                <h3 style={{ color: 'white', marginBottom: 8 }}>{a.title}</h3>
                                <p style={{ color: '#ddd' }}>{a.description}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {nextPageToken && (
                <button
                    type="button"
                    onClick={loadMoreArticles}
                    style={{
                        backgroundColor: '#333300',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: 30,
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        marginTop: 20,
                    }}
                >
                    Load More Articles
                </button>
            )}

            {bookmarkedArticles.length > 0 && (
                <button
                    type="button"
                    onClick={() => navigate('/bookmarked')}
                    style={{
                        position: 'fixed',
                        bottom: 20,
                        left: 20,
                        backgroundColor: '#ffcc00',
                        padding: '10px 20px',
                        borderRadius: 30,
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    See Bookmarks Here
                </button>
            )}

    <Scroll/>

        </div>
    );
}
