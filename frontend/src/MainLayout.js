import React, { useState, useEffect } from 'react';
import ProductsSection from './components/ProductsSection';
import Banner from './components/Banner';
import adv1 from "./assests/background/adv1.png";
import mainbanner from "./assests/background/mainbanner.png";
import shipping from "./assests/background/shipping.png";
import satisfaction from "./assests/background/satisfaction.png";
import products1k from "./assests/background/products1k.png"
import trustmob from "./assests/background/trustmob.png"
// Import Bootstrap Carousel
// import Carousel from 'react-bootstrap/Carousel'; // Assuming you're using react-bootstrap

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect if the screen size is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Set mobile view for screen width <= 768px
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Listen for window resize
    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, []);

  return (
    <div className="main-layout">
      <Banner />
      <div className="main-layout-products-wrapper">
        <ProductsSection category="orthodontic_pliers" />
        <ProductsSection category="brackets" />
        <ProductsSection category="bands_and_tubes" />

        {isMobile ? (
          <img src={trustmob} className="d-block w-100" alt="main banner" />
          // Mobile carousel
        ) : (
          <>
            <img src={mainbanner} className="d-block w-100" alt="main banner" />
          </>
        )}

        <ProductsSection category="wires_and_springs" />
        <ProductsSection category="elastomerics" />

        {isMobile ? <div id="carouselExample" className="carousel slide" data-bs-interval="2500" data-bs-ride="carousel" style={{ margin: "25px 0" }}>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={shipping} className="d-block w-100 carousel-image" alt="banner" />
            </div>
            <div className="carousel-item">
              <img src={products1k} className="d-block w-100 carousel-image" alt="banner" />
            </div>
            <div className="carousel-item">
              <img src={satisfaction} className="d-block w-100 carousel-image" alt="banner" />
            </div>
          </div>
        </div> : (
          <img src={adv1} className="d-block w-100" alt="advertisement banner" />
        )}

        <ProductsSection category="miscellaneous" />
      </div>
    </div>
  );
};

export default MainLayout;
