import React, { useEffect, useState } from 'react';
import faceMaskBanner from "../assests/facemask.png";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';

const banners = [
  {
    title: 'Special Offer on Face Masks',
    description: 'Protect yourself and your loved ones with top-quality face masks. Grab discounts while they last!',
    image: faceMaskBanner,
    link: '/category/miscellaneous',
    buttonText: 'Shop Now',
    highlight: 'Face Masks',
  },
  {
    title: 'Best Deals on Orthodontic Pliers',
    description: 'Get precision and quality with our orthodontic pliers collection. Perfect for dental professionals.',
    image: faceMaskBanner,
    link: '/category/orthodontic_pliers',
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
                <span className="text-[#2D3092]">{banner.highlight}</span>
              </h2>
              <p className="text-gray-600 mb-6 text-base sm:text-lg">
                {banner.description}
              </p>
              <Link to = {banner.link} className="no-underline inline-block bg-[#2D3092] hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full transition "> {banner.buttonText}</Link>
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


