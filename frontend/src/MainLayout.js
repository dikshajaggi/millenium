import React from 'react'
import ProductsSection from './components/ProductsSection'
import Banner from './components/Banner'
import adv1 from "./assests/background/adv1.png"
import mainbanner from "./assests/background/mainbanner.png"

const MainLayout = () => {
  return (
    <div className='main-layout'>
      <Banner />
      <div className='main-layout-products-wrapper'>
        <ProductsSection category="orthodontic_pliers" />
        <ProductsSection category="brackets" />
        <ProductsSection category="bands_and_tubes" />
        <img src={mainbanner} className="d-block w-100 carousel-image" alt="image2" />
        <ProductsSection category="wires_and_springs" />
        <ProductsSection category="elastomerics" />
        <ProductsSection category="miscellaneous" />
      </div>
      <img src={adv1} className="d-block w-100 carousel-image" alt="image2" />
    </div>
  )
}

export default MainLayout
