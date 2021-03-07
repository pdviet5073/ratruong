import React from 'react';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";
import Slider from "react-slick";
import image1 from "../../../images/homeImages/anhkhachsan1.jpg";
import image2 from "../../../images/homeImages/anhkhachsan2.jpg";
import image3 from "../../../images/homeImages/anhkhachsan3.jpg";



function SlideShow() {
   

   
    
   
    const settings = {
      
      dots: true,
      infinite: true,
      speed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:true,
      swipe: true,
      arrows: true,
      autoplaySpeed: 4000,
      cssEase: "ease-in-out"
      
    };
  return (
    <div className= "SlideShow">
      <Slider {...settings}>
        <div   >
          <img className="slideShow-img"
            src={image1} 
            alt="anh khach san"></img>
        </div>
        <div   >
          <img className="slideShow-img"
            src={image2} 
            alt="anh khach san"></img>
        </div>
        <div   >
          <img className="slideShow-img"
            src={image3} 
            alt="anh khach san"></img>
        </div>
      </Slider>

    </div>
  );
}

export default SlideShow;
