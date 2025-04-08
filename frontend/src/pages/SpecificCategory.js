import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { categoryWiseProducts } from '../apis';
import ProductCard from '../components/ProductCard';

// Banner imports
import bracketsBanner from '../assests/background/bracketsBanner.png';
import bracketsBannerMob from '../assests/background/bracketsBannerMob.png';
import wiresBanner from '../assests/background/wiresBanner.png';
import wiresBannerMob from '../assests/background/wiresBannerMob.png';
import bandsBanner from '../assests/background/bandsBanner.png';
import bandsBannerMob from '../assests/background/bandsBannerMob.png';
import elastomericsBanner from '../assests/background/elastomericsBanner.png';
import elastomericsBannerMob from '../assests/background/elastomericsBannerMob.png';
import miscBanner from '../assests/background/miscBanner.png';
import miscBannerMob from '../assests/background/miscBannerMob.png';
import pliersBanner from '../assests/background/pliersBanner.png';
import pliersBannerMob from '../assests/background/pliersBannerMob.png';

const SpecificCategory = () => {
  const params = useParams();
  const [route, setRoute] = useState(params.category);
  const [products, setProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const categoryBanners = {
    brackets: { desktop: bracketsBanner, mobile: bracketsBannerMob },
    wires_and_springs: { desktop: wiresBanner, mobile: wiresBannerMob },
    orthodontic_pliers: { desktop: pliersBanner, mobile: pliersBannerMob },
    bands_and_tubes: { desktop: bandsBanner, mobile: bandsBannerMob },
    elastomerics: { desktop: elastomericsBanner, mobile: elastomericsBannerMob },
    miscellaneous: { desktop: miscBanner, mobile: miscBannerMob }
  };

  useEffect(() => {
    const formattedStr = params.category.replace(/_/g, ' ').replace(/ and /gi, ' & ');
    setRoute(formattedStr);

    const fetchProducts = async () => {
      const response = await categoryWiseProducts(params.category);
      setProducts(response.data);
    };

    fetchProducts();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [params.category]);

  const bannerImage = categoryBanners[params.category]
    ? isMobile
      ? categoryBanners[params.category].mobile
      : categoryBanners[params.category].desktop
    : '';

  return (
    <div className="min-h-screen bg-white py-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center capitalize">
        {route}
      </h1>

      {bannerImage && (
        <div className="w-full max-h-72 mb-8">
          <img
            src={bannerImage}
            alt={`${route} banner`}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      <div className="flex flex-wrap justify-center mt-20">
        {products.map((item, index) => (
          <ProductCard key={item.id || index} data={item} />
        ))}
      </div>


    </div>
  );
};

export default SpecificCategory;
