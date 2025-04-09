import React, { useContext, useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { MainContext } from '../context/MainContext';
import { Link } from 'react-router-dom';

const ProductsSection = ({ category }) => {
  const { products } = useContext(MainContext);
  const [cat, setCat] = useState(category);

  useEffect(() => {
    let formattedStr = category.replace(/_/g, ' ');
    formattedStr = formattedStr.replace(/ and /gi, ' & ');
    setCat(formattedStr);
  }, [category]);

  return (
    <div className="w-full px-4 sm:px-8 py-8">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#2D3092] mb-6 capitalize">
        {cat}
      </h2>

      <div className="flex flex-wrap justify-center mt-10">
        {products
          .filter((item) => item.category === category)
          .slice(0, 5)
          .map((item) => (
            <ProductCard key={item.id} data={item} />
          ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-6">
        <Link
          to={`/products/${category}`}
          className="inline-block bg-[#2D3092] text-white px-6 py-3 rounded-full text-sm sm:text-base hover:bg-[#1f236b] transition-all duration-300 no-underline"
        >
          View All <span className='text-capitalize'>{cat}</span>
        </Link>
      </div>
    </div>
  );
};

export default ProductsSection;
