import React from 'react'
import ProductsSection from './components/ProductsSection'
import Banner from './components/Banner'

const MainLayout = () => {
  return (
    <div className='main-layout'>
      <Banner />
      <div className='main-layout-products-wrapper'>
        <ProductsSection category="orthodontic_pliers" />
      </div>
    </div>
  )
}

export default MainLayout
