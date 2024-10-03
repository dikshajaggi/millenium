import React from 'react';
import './styles.scss';
import banner1 from "../assests/background/banner1.png"
import banner2 from "../assests/background/banner2.png"
import banner3 from "../assests/background/banner3.png"
import banner4 from "../assests/background/banner4.png"

const Banner = () => {
  return (
    <>
      <div id="carouselExample" className="carousel slide" data-bs-interval="2500" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={banner1} className="d-block w-100 carousel-image" alt="image1" />
          </div>
          <div className="carousel-item">
            <img src={banner2} className="d-block w-100 carousel-image" alt="image2" />
          </div>
          <div className="carousel-item">
            <img src={banner3} className="d-block w-100 carousel-image" alt="image3" />
          </div>
          <div className="carousel-item">
            <img src={banner4} className="d-block w-100 carousel-image" alt="image3" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default Banner;
