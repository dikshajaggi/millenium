import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ data }) => {
  return (
    <Link to={`/product/${data.name_id}`} key={data.id} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-2 no-underline">
      <div className="bg-white rounded-lg hover:shadow-lg transition-transform hover:-translate-y-1 hover:scale-105 duration-300">
        <div className="h-36 sm:h-40 md:h-48 bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-lg">
          <img
            src={`${process.env.REACT_APP_BASE_URL}/images/${data.image}`}
            alt={data.name}
            className="object-contain h-full max-w-full"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
        <div className="p-2">
          <h6 className="text-sm font-medium text-center text-gray-800 truncate md:text-lg">{data.name}</h6>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
