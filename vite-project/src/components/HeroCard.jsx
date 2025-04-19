import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HeroCard({ articles }) {
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
    const validArticles = articles.filter(
      (article) => article.urlToImage && article.title
    );
  
    return (
      <div className="w-full max-w-6xl mx-auto my-6">
        <Slider {...settings}>
          {validArticles.map((article, index) => (
            <div key={index} className="relative h-[500px]">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h2 className="text-2xl font-bold text-white mb-2">{article.title}</h2>
                <p className="text-white/90 text-sm line-clamp-2">{article.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
  


  export default HeroCard;