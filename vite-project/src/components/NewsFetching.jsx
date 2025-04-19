import React, { useEffect, useState } from 'react';

function NewsFetching() {
    const [articles, setArticles] = useState([]);

    // Function to fetch news from NewsAPI
    const fetchNews = async () => {
        const API_KEY = '82d7dbcb9ee94a26a57db14738088f1e';  // Use your actual NewsAPI key
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.articles && data.articles.length > 0) {
                setArticles(data.articles);  // Set articles in state
            } else {
                console.log('No articles found');
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    // Use useEffect to fetch data when component mounts
    useEffect(() => {
        fetchNews();  // Call the function to fetch news
    }, []);  // Empty dependency array means it runs only once on component mount

    return (
        <div>
            <h1>Business News</h1>
            <div>
                {articles.length > 0 ? (
                    <ul>
                        {articles.map((article, index) => (
                            <li key={index}>
                                <h2>{article.title}</h2>
                                <p>{article.description}</p>
                                {article.urlToImage && <img src={article.urlToImage} alt="Article" style={{ width: '100px' }} />}
                                <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading news...</p>
                )}
            </div>
        </div>
    );
}

export default NewsFetching;
