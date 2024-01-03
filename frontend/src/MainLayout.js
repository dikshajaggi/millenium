import React, { useContext, useEffect, useState } from 'react'
import Banner from './components/layout_components/Banner'
import Products from './components/Products'
import { MainContext } from './context/MainContext'

const MainLayout = () => {
  const context = useContext(MainContext)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    if (context.searchedProducts !== null) setSearched(true)
    if (context.searched === false) setSearched(false)
    // eslint-disable-next-line
  }, [context.searched])
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      maxWidth: '100vw'
    }}>
      <div style={{ flex: '1' }}> {/* This div ensures that the content takes up the available space */}
        {searched ? null : <Banner />}
        <Products />
      </div>
    </div>
  )
}

export default MainLayout
