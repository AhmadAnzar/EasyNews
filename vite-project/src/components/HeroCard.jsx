import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HeroCard({ articles, category }) {
    console.log("HeroCard received articles:", articles);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    // Filter articles with valid images and titles
    const validArticles = articles.filter(
        (article) => article.image_url && article.title
    );

    return (
        <div
            style={{
                width: '100%',
                maxWidth: '900px',
                margin: '0 auto', 
                marginTop: '30px',
                border: '2px solid white',
                position: 'relative',
            }}
        >
            <h1
                style={{
                    color: 'white',
                    fontSize: '28px',
                    marginBottom: '20px',
                    textAlign: 'left',
                    paddingLeft: '20px', 
                    position: 'relative',
                    width: '100%',
                }}
            >
                Latest in {category}
            </h1>
            <Slider {...settings}>
                {validArticles.map((article, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                        <img
                            src={article.image_url} // Updated to use NewsData.io's `image_url`
                            alt={article.title}
                            style={{
                                width: '100%',
                                height: '500px',
                                objectFit: 'cover',
                                border: '1px solid #e5e7eb',
                            }}
                        />
                        <div
                            style={{
                                padding: '15px',
                            }}
                        >
                            <h2
                                style={{
                                    color: 'white',
                                    fontSize: '24px',
                                    marginBottom: '10px',
                                    fontWeight: 'bold',
                                }}
                            >
                                {article.title}
                            </h2>
                            <p
                                style={{
                                    color: 'rgba(255,255,255,0.9)',
                                    fontSize: '16px',
                                    margin: 0,
                                }}
                            >
                                {article.description}
                            </p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default HeroCard;

