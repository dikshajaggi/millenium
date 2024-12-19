/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./styles.scss";
// import SearchCategoryHeader from '../components/SearchCategoryHeader'
import { categoryWiseProducts } from '../apis';
import ProductCard from '../components/ProductCard';

import bracketsBanner from "../assests/background/bracketsBanner.png"
import bracketsBannerMob from "../assests/background/bracketsBannerMob.png"

import wiresBanner from "../assests/background/wiresBanner.png"
import wiresBannerMob from "../assests/background/wiresBannerMob.png"

import bandsBanner from "../assests/background/bandsBanner.png"
import bandsBannerMob from "../assests/background/bandsBannerMob.png"

import elastomericsBanner from "../assests/background/elastomericsBanner.png"
import elastomericsBannerMob from "../assests/background/elastomericsBannerMob.png"

import miscBanner from "../assests/background/miscBanner.png"
import miscBannerMob from "../assests/background/miscBannerMob.png"

import pliersBanner from "../assests/background/pliersBanner.png"
import pliersBannerMob from "../assests/background/pliersBannerMob.png"


const SpecificCategory = () => {
  const params = useParams()
  const [route, setRoute] = useState(params.category)
  console.log(params.category, "check params")
  const [products, setProducts] = useState([])
  const [isMobile, setIsMobile] = useState(false);

  const categoryBanners = {
    brackets: { desktop: bracketsBanner, mobile: bracketsBannerMob },
    wires_and_springs: { desktop: wiresBanner, mobile: wiresBannerMob },
    orthodontic_pliers: { desktop: pliersBanner, mobile: pliersBannerMob },
    bands_and_tubes: { desktop: bandsBanner, mobile: bandsBannerMob },
    elastomerics: { desktop: elastomericsBanner, mobile: elastomericsBannerMob },
    miscellaneous: { desktop: miscBanner, mobile: miscBannerMob }
  };

  const fetchProducts = async () => {
    const response = await categoryWiseProducts(params.category)
    setProducts(response.data)
  }
  useEffect(() => {
    // remove underscore
    let formattedStr = params.category.replace(/_/g, ' ')
    // replace and with &
    formattedStr = formattedStr.replace(/ and /gi, ' & ');
    setRoute(formattedStr)
    fetchProducts()

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Assuming mobile is below 768px width
    };

    // Initial check and add event listener for resize
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup event listener
    return () => window.removeEventListener('resize', handleResize);

  }, [params.category])

  console.log(categoryBanners[params.category], "categoryBanners[params.category]")

 const bannerImage = categoryBanners[params.category]
    ? isMobile
      ? categoryBanners[params.category].mobile
      : categoryBanners[params.category].desktop
    : "";
    
  return (
    <div className='specific-cat-wrapper'>
      <h4>{route}</h4>
      {/* <Banner /> */}
      {/* Conditionally render the category banner */}
      {bannerImage && <img src={bannerImage} alt={`${route} banner`} className="category-banner" />}
      {/* <SearchCategoryHeader category={route} /> */}
      <div className="products-section-wrapper">
        {products.map((item, index) => {
          return (
            <ProductCard key={item.id || index} data={item} />
          )
        })}
      </div>
    </div>
  )
}

export default SpecificCategory
