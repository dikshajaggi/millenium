import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { categoryWiseProducts } from '../apis';
import ProductCard from '../components/ProductCard';

const categoryBanners = {
  brackets: {
    title: 'Explore our premium',
    highlight: 'Brackets',
    description: 'High-quality orthodontic brackets that ensure comfort and reliability for professionals.',
  },
  wires_and_springs: {
    title: 'Top-grade',
    highlight: 'Wires & Springs',
    description: 'Durable and flexible wires & springs for efficient orthodontic treatment.'
  },
  bands_and_tubes: {
    title: 'Reliable',
    highlight: 'Bands & Tubes',
    description: 'Sturdy bands and tubes built for performance and patient comfort.',
  },
  orthodontic_pliers: {
    title: 'Precision tools:',
    highlight: 'Orthodontic Pliers',
    description: 'Get the best results with our finely crafted orthodontic pliers.'
  },
  elastomerics: {
    title: 'Elastic solutions:',
    highlight: 'Elastomerics',
    description: 'Elastic materials that adapt and perform with consistency.'
  },
  miscellaneous: {
    title: 'Explore',
    highlight: 'Miscellaneous Tools',
    description: 'Supportive tools and items to complete your orthodontic kit.'
  }
};

const SpecificCategory = () => {
  const params = useParams();
  const [route, setRoute] = useState(params.category);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const formattedStr = params.category.replace(/_/g, ' ').replace(/ and /gi, ' & ');
    setRoute(formattedStr);

    const fetchProducts = async () => {
      const response = await categoryWiseProducts(params.category);
      setProducts(response.data);
    };

    fetchProducts();
  }, [params.category]);

  const banner = categoryBanners[params.category];

  return (
    <div className="min-h-screen bg-white py-6 px-14">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center capitalize">
        {route}
      </h1>

      {banner && (
        <div className="bg-gradient-to-r from-[#E4E4FF] to-white rounded-xl shadow-md px-6 py-10 mb-10 grid md:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-grey-800 mb-3">
                {banner.title} <span className="text-[#2D3092]">{banner.highlight}</span>
              </h2>
              <p className="text-gray-600 text-base sm:text-lg mb-4 font-semibold">{banner.description}</p>
            </div>
            <div className="flex justify-center">
              <img src="{bracketsImage}" alt="Brackets" className="h-40 md:h-56 object-contain" />
            </div>  
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-6">
        {products.map((item, index) => (
          <ProductCard key={item.id || index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default SpecificCategory;
