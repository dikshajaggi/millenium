/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { MainContext } from '../context/MainContext';

const ProductsSection = ({ category }) => {
  const { products } = useContext(MainContext);
  const [cat, setCat] = useState(category);

  useEffect(() => {
    let formattedStr = category.replace(/_/g, ' ');
    formattedStr = formattedStr.replace(/ and /gi, ' & ');
    setCat(formattedStr);
  }, []);

  return (
    <div className="w-full px-4 sm:px-8 py-8">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 capitalize">
        {cat}
      </h2>
      <div className="flex flex-wrap justify-center mt-20">
        {products
          .filter((item) => item.category === category)
          .slice(0, 6)
          .map((item) => (
            <ProductCard key={item.id} data={item} />
          ))}
      </div>
    </div>
  );
};

export default ProductsSection;
