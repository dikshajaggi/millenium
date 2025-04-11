/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ProductsSection from './components/ProductsSection';
import Banner from './components/Banner';
import { BadgePercent, Truck, ShieldCheck } from 'lucide-react';

const offers = [
  {
    icon: <BadgePercent className="w-8 h-8 text-white" />,
    title: "Exclusive Discounts",
    desc: "Get up to 50% off on select orthodontic tools this week.",
    color: "bg-gradient-to-tr from-blue-500 to-indigo-600",
  },
  {
    icon: <Truck className="w-8 h-8 text-white" />,
    title: "Free Shipping",
    desc: "Enjoy free shipping on orders above ₹1999 across India.",
    color: "bg-gradient-to-tr from-green-500 to-emerald-600",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-white" />,
    title: "Quality Guarantee",
    desc: "All products come with a 100% satisfaction guarantee.",
    color: "bg-gradient-to-tr from-rose-500 to-pink-600",
  },
];

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full">
      <Banner />
      
      {/* Container with tighter padding */}
      <div className="w-full max-w-7xl mx-auto space-y-10 py-10">
        <ProductsSection category="orthodontic_pliers" />
        <ProductsSection category="brackets" />
        <ProductsSection category="bands_and_tubes" />

        <div className="bg-[#0094DA] relative overflow-hidden py-10 px-4 sm:px-6 lg:px-8 text-center">
          {/* Hexagon background pattern can be added here with absolute positioned SVGs or background-image */}
          <div className="max-w-7xl mx-auto">
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Trusted by Orthodontists Worldwide
            </h2>
            <p className="text-white text-lg sm:text-xl">
              Join thousands of professionals who trust us for orthodontic product needs
            </p>
          </div>
        </div>

        <ProductsSection category="wires_and_springs" />
        <ProductsSection category="elastomerics" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-6 shadow-lg bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${offer.color}`}>
                {offer.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {offer.title}
              </h3>
              <p className="text-sm text-gray-600">{offer.desc}</p>
            </div>
          ))}
        </div>

        <ProductsSection category="miscellaneous" />
      </div>
    </div>
  );
};

export default MainLayout;
