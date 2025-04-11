import React, { useEffect, useState } from 'react';
import faceMaskBanner from "../assests/facemask.png";
import pliers from "../assests/pliers.png";
import brackets from "../assests/brackets.png"
import wires from "../assests/wires.png";
import bandstubes from "../assests/bandstubes.png"
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
    image: pliers,
    link: '/category/orthodontic_pliers',
    buttonText: 'Explore Collection',
    highlight: 'Orthodontic Pliers',
  },
  {
    title: 'Premium Orthodontic Brackets',
    description: 'Enhance treatment outcomes with our high-quality dental brackets. Reliable, durable, and designed for precision.',
    image: brackets,
    link: '/category/brackets',
    buttonText: 'Shop Brackets',
    highlight: 'Orthodontic Brackets',
  },
  {
    highlight: 'Wires & Springs',
    title: 'Top-grade Wires & Springs',
    image: wires,
    description: 'Durable and flexible wires & springs for efficient orthodontic treatment.',
    link: '/category/wires_and_springs',
    buttonText: 'Shop Wires & Springs',
  },
  {
    title: 'Reliable Bands & Tubes',
    highlight: 'Bands & Tubes',
    image: bandstubes,
    description: 'Sturdy bands and tubes built for performance and patient comfort.',
    link: '/category/bands_and_tubes',
    buttonText: 'Explore Bands & Tubes',
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
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;


