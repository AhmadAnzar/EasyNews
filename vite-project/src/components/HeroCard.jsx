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
    const validArticles = articles.filter(
      (article) => article.urlToImage && article.title
    );
  
    return (
      <div style={{ 
        width: '1000px',
        marginTop: '30px',
        marginLeft: '1px',
        marginRight : '300px',
        border: '2px solid white',
        position: 'relative'
      }}>
        <h1 style={{
          color: 'white',
          fontSize: '28px',
          marginBottom: '20px',
          textAlign: 'left',
          paddingLeft: '100px',
          position: 'relative',
         
          width: '100%'
        }}>
          Latest in {category}
        </h1>
        <Slider {...settings}>
          {validArticles.map((article, index) => (
            <div key={index} style={{ position: 'relative' }}>
              <img
                src={article.urlToImage}
                alt={article.title}
                style={{
                  width: '1000px',
                  height: '500px',
                  objectFit: 'fit',
                  border: '1px solid #e5e7eb'
                }}
              />
              <div style={{
              }}>
                <h2 style={{
                  color: 'white',
                  fontSize: '24px',
                  marginBottom: '10px',
                  fontWeight: 'bold'
                }}>
                  {article.title}
                </h2>
                <p style={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '16px',
                  margin: 0
                }}>
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