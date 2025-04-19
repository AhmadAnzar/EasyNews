import React from 'react';
import Slider from 'react-slick';

function HeroCard({ articles }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-6">
      <Slider {...settings}>
        {articles.map((article, index) => (
          <div key={index} className="relative">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-[400px] object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white px-4">
              <h2 className="text-2xl font-bold text-center">{article.title}</h2>
              <p className="text-sm mt-2 max-w-2xl text-center">{article.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HeroCard;
