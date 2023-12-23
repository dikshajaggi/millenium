import React from 'react'
import Banner from './components/layout_components/Banner'
import Products from './components/Products'

const MainLayout = () => {
  return (
    <div style={{
      maxWidth: "100vw"
    }}>
      <Banner />
      <Products />
    </div >
  )
}

export default MainLayout
