import React, { useState, useEffect } from 'react';
import './styles.scss';
import banner1 from "../assests/background/banner1.png";
import banner2 from "../assests/background/banner2.png";
import banner3 from "../assests/background/banner3.png";
import banner4 from "../assests/background/banner4.png";

import banner1mob from "../assests/background/banner1mob.png";
import banner2mob from "../assests/background/banner2mob.png";
import banner3mob from "../assests/background/banner3mob.png";
import banner4mob from "../assests/background/banner4mob.png";


const Banner = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile view if screen width <= 768px
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Listen for window resize
    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, []);

  // Choose banners based on screen size
  const banners = isMobile
    ? [banner1mob, banner2mob, banner3mob, banner4mob]
    : [banner1, banner2, banner3, banner4];

  return (
    <div id="carouselExample" className="carousel slide" data-bs-interval="2500" data-bs-ride="carousel" style={{ margin: "25px 0" }}>
      <div className="carousel-inner">
        {banners.map((banner, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            key={index}
          >
            <img src={banner} className="d-block w-100 carousel-image" alt={`banner-${index + 1}`} />
          </div>
        ))}
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
  );
};

export default Banner;
