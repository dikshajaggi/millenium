import React from 'react'
import Banner from './components/layout_components/Banner'
import Products from './components/Products'

const MainLayout = () => {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      maxWidth: '100vw'
    }}>
      <div style={{ flex: '1' }}> {/* This div ensures that the content takes up the available space */}
        <Banner />
        <Products />
      </div>
    </div>
  )
}

export default MainLayout
