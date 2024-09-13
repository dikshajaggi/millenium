import React from 'react'
import ProductsSection from './components/ProductsSection'
import Banner from './components/Banner'

const MainLayout = () => {
  return (
    <div className='main-layout'>
      <Banner />
      <div className='main-layout-products-wrapper'>
        <ProductsSection category="orthodontic_pliers" />
        <ProductsSection category="brackets" />
        <ProductsSection category="bands_and_tubes" />
        <ProductsSection category="wires_and_springs" />
        <ProductsSection category="elastomerics" />
        <ProductsSection category="miscellaneous" />
      </div>
    </div>
  )
}

export default MainLayout
