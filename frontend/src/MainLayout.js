import React from 'react'
import Header from './components/layout_components/Header'
import Banner from './components/layout_components/Banner'
import Categories from './components/Categories'
import Products from './components/Products'
import Footer from './components/layout_components/Footer'

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
