// import React, { useState, useEffect } from 'react';
// import './styles.scss';
// import banner1 from "../assests/background/banner1.png";
// import banner2 from "../assests/background/banner2.png";
// import banner3 from "../assests/background/banner3.png";
// import banner4 from "../assests/background/banner4.png";

// import banner1mob from "../assests/background/banner1mob.png";
// import banner2mob from "../assests/background/banner2mob.png";
// import banner3mob from "../assests/background/banner3mob.png";
// import banner4mob from "../assests/background/banner4mob.png";


// const Banner = () => {
//   const [isMobile, setIsMobile] = useState(false);

//   // Detect screen size
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768); // Mobile view if screen width <= 768px
//     };

//     handleResize(); // Initial check
//     window.addEventListener("resize", handleResize); // Listen for window resize
//     return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
//   }, []);

//   // Choose banners based on screen size
//   const banners = isMobile
//     ? [banner1mob, banner2mob, banner3mob, banner4mob]
//     : [banner1, banner2, banner3, banner4];

//   return (
//     <div id="carouselExample" className="carousel slide" data-bs-interval="2500" data-bs-ride="carousel" style={{ margin: "25px 0" }}>
//       <div className="carousel-inner">
//         {banners.map((banner, index) => (
//           <div
//             className={`carousel-item ${index === 0 ? "active" : ""}`}
//             key={index}
//           >
//             <img src={banner} className="d-block w-100 carousel-image" alt={`banner-${index + 1}`} />
//           </div>
//         ))}
//       </div>

//       <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
//         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//         <span className="visually-hidden">Previous</span>
//       </button>
//       <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
//         <span className="carousel-control-next-icon" aria-hidden="true"></span>
//         <span className="visually-hidden">Next</span>
//       </button>
//     </div>
//   );
// };

// export default Banner;

import React, { useEffect, useState } from 'react';
import faceMaskBanner from "../assests/facemask.png";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const banners = [
  {
    title: 'Special Offer on Face Masks',
    description: 'Protect yourself and your loved ones with top-quality face masks. Grab discounts while they last!',
    image: faceMaskBanner,
    link: '/products/face-masks',
    buttonText: 'Shop Now',
    highlight: 'Face Masks',
  },
  {
    title: 'Best Deals on Orthodontic Pliers',
    description: 'Get precision and quality with our orthodontic pliers collection. Perfect for dental professionals.',
    image: faceMaskBanner,
    link: '/products/orthodontic-pliers',
    buttonText: 'Explore Collection',
    highlight: 'Orthodontic Pliers',
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const delay = 5000; // 5 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, delay);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-screen-xl mx-auto py-6">
      <Carousel
        showThumbs={true}
        infiniteLoop
        autoPlay
        interval={2000}
        showStatus={false}
        showArrows={false}
      >
        {banners.map((banner, index) => (
          <div key={index} className="grid md:grid-cols-2 items-center gap-6 px-4 py-10 sm:px-6 md:px-12 bg-gradient-to-r from-white to-indigo-50 rounded-xl shadow-lg">
            {/* Text Section */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
                {banner.title.replace(banner.highlight, '')}
                <span className="text-indigo-600">{banner.highlight}</span>
              </h2>
              <p className="text-gray-600 mb-6 text-base sm:text-lg">
                {banner.description}
              </p>
              <a
                href={banner.link}
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full transition"
              >
                {banner.buttonText}
              </a>
            </div>

            {/* Image Section */}
            <div className="w-full h-48 sm:h-60 md:h-72 lg:h-80 flex justify-center">
              <img
                src={banner.image}
                alt={banner.highlight}
                className="h-full object-contain rounded-md"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;


