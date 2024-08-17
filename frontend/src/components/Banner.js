import React from 'react';
import './styles.scss';
import bg from "../assests/background/bg.png"

const Banner = () => {
  return (
    <>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={bg} className="d-block w-100 carousel-image" alt="image1" />
          </div>
          <div className="carousel-item">
            <img src={bg} className="d-block w-100 carousel-image" alt="image2" />
          </div>
          <div className="carousel-item">
            <img src={bg} className="d-block w-100 carousel-image" alt="image3" />
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
