import React from 'react';
import { WhatsappIcon, FacebookIcon } from 'react-share';
import { Link } from 'react-router-dom';
import { whatsappUrl, fbPageUrl, instaPageUrl } from '../assests/static';
import instagram from '../assests/icons/instagram.png';

const Footer = () => {
  const categories = [
    { id: 0, cat_id: 'brackets', name: 'Brackets' },
    { id: 1, cat_id: 'bands_and_tubes', name: 'Bands & Tubes' },
    { id: 2, cat_id: 'wires_and_springs', name: 'Wires & Springs' },
    { id: 3, cat_id: 'elastomerics', name: 'Elastomerics' },
    { id: 4, cat_id: 'orthodontic_pliers', name: 'Orthodontic Pliers' },
    { id: 5, cat_id: 'miscellaneous', name: 'Miscellaneous' }
  ];

  const footerPages = [
    { id: 1, url: '/about', name: 'About' },
    { id: 2, url: '/terms_conditions', name: 'Terms & Conditions' },
    { id: 3, url: '/privacy_policy', name: 'Privacy Policy' },
    { id: 4, url: '/support', name: 'Support' }
  ];

  return (
    <footer className="bg-neutral-800 text-white pt-10 pb-6 mt-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-5 sm:grid-cols-2 gap-8 text-sm">
          {/* Company */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold mb-4">Dwarka Orthodontics</h2>
            <p className="text-gray-300">
              We provide high-quality orthodontic products tailored for dental professionals.
              From brackets to pliers, we deliver reliability and innovation.
              From brackets and wires to elastics and pliers, our extensive product range combines durability with precision, ensuring reliable solutions for 
              orthodontic treatments. Committed to supporting dental practices, 
              we offer competitive pricing, exceptional customer service, and innovative products that help create confident smiles.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            {categories.map((item) => (
              <Link
                key={item.id}
                to={`/category/${item.cat_id}`}
                className="block text-gray-400 hover:text-white transition"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Footer Pages */}
          <div>
            <h3 className="font-semibold mb-4">Pages</h3>
            {footerPages.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                className="block text-gray-400 hover:text-white transition"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Contact & Socials */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <p className="text-gray-300 mb-1">Dwarka, New Delhi, India</p>
            <p className="text-gray-300 mb-1">intmillenium@gmail.com</p>
            <p className="text-gray-300 mb-1">+91 9811704446</p>
            <p className="text-gray-300 mb-4">+91 8920570339</p>

            <div className="flex gap-3 items-center">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsappIcon size={32} round />
              </a>
              <a href={fbPageUrl} target="_blank" rel="noopener noreferrer">
                <FacebookIcon size={32} round />
              </a>
              <a href={instaPageUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={instagram}
                  alt="Instagram"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400 text-xs">
          © 2025 Dwarka Orthodontics. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
