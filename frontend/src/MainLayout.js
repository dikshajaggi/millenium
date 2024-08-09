import React from 'react'
import ProductsSection from './components/ProductsSection'

const MainLayout = () => {
  return (
    <div className='main-layout'>
      <div className='main-layout-products-wrapper'>
        <ProductsSection />
      </div>
    </div>
  )
}

export default MainLayout
