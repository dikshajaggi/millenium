import React, { useContext, useEffect, useRef, useState } from 'react'
import "../styles.scss"
import { Link, useLocation } from 'react-router-dom'
import { MainContext } from '../../context/MainContext'
import _ from "lodash"

const Header = () => {
  const context = useContext(MainContext)
  const location = useLocation()
  console.log(location, "loc")
  const [user, setUser] = useState(context.user)
  const [qty, setQty] = useState()

  const handleSignOut = () => {
    localStorage.removeItem('user')
    window.location.reload()
  }

  useEffect(() => {
    setUser(context.user)
  }, [context.userLoginToken])

  const [searchTerm, setSearchTerm] = useState('')
  const [debounceTimeout, setDebounceTimeout] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchedProduct, setSearchedProduct] = useState()
  const searchInputRef = useRef(null)


  const handleClick = () => {
    context.setSearched(false)
  }

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
    clearTimeout(debounceTimeout)

    const timeoutId = setTimeout(() => {
      if (event.target.value.trim() === '') {
        // Clear suggestions when the input is empty
        setShowSuggestions(false)
        context.setSearched(false)
      } else {
        performSearch()
      }
    }, 200)
    setDebounceTimeout(timeoutId)
  };

  const performSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/search?name=${searchTerm}`)
      const products = await response.json()
      console.log(products, "searching products")
      setSearchResults(products)
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleSuggestionClick = (selectedProduct) => {
    // Handle the click on a suggestion (e.g., navigate to the product details page)
    console.log(`Clicked on suggestion: ${selectedProduct.name}`)
    if (location.pathname === "/brackets") { context.setCategorySearch(true) }
    setSearchTerm(selectedProduct.name)
    setSearchedProduct(selectedProduct)
    setShowSuggestions(false)
    context.setSearchedProducts(selectedProduct)
    context.setSearched(true)
  };

  const handleDocumentClick = (event) => {
    // Close suggestions if clicked outside the search input and suggestions
    if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
      setShowSuggestions(false)
    }
  }
  useEffect(() => {
    return () => {
      clearTimeout(debounceTimeout)
    };
  }, [searchTerm])

  const handleSearch = (event) => {
    event.preventDefault()
    context.setSearchedProducts(searchedProduct)
    context.setSearched(true)
  }
  useEffect(() => {
    // Add a click event listener to the document to close suggestions
    document.addEventListener('click', handleDocumentClick)

    return () => {
      // Remove the click event listener on component unmount
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])
  // useEffect(() => {
  //   const cartItems = JSON.parse(localStorage.getItem('cart'))
  //   // const quantity = cartItems.cartProducts.map(item => item.quantity)
  //   // setQty(_.sum(quantity))
  //   // console.log(quantity,_.sum(quantity), "quantity array")
  // }, [localStorage.getItem('cart'), context.qtyUpdated])


  return (
    <div>
      <nav class="navbar sticky-top navbar-expand-lg bg-body-tertiary">
        <div class="container">
          <Link to="/" class="navbar-brand" onClick={handleClick}>Navbar</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div style={{ position: "relative" }}>
              <form class="d-flex mx-auto" role="search">
                <input ref={searchInputRef} class="form-control me-2 search-width" type="search" placeholder="Search" aria-label="Search" value={searchTerm} onChange={handleInputChange} />
                <button class="btn btn-outline search-btn" type="submit" onClick={handleSearch}>Search</button>
              </form>
              {showSuggestions && searchResults.length > 0 && (
                <ul className="suggestion-list" style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1 }}>
                  {searchResults.map((product) => (
                    <li key={product._id} onClick={() => handleSuggestionClick(product)}>
                      {product.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item text-capitalize">
                <Link to="/offers" class="nav-link text-capitalize" >Offers</Link>
              </li>
              <li class="nav-item text-capitalize">
                <Link to="/cart" class="nav-link">Cart</Link>
              </li>
              {user !== undefined ? <li class="nav-item dropdown text-capitalize">
                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {user}
                </Link>
                <ul class="dropdown-menu" style={{ minWidth: 'auto', maxHeight: '40px', fontSize: "14px" }}>
                  <li><Link class="dropdown-item" href="#" to="/" onClick={handleSignOut}>Sign out</Link></li>
                </ul>
              </li> : <li class="nav-item text-capitalize">
                <Link to="/login" class="nav-link" >Login</Link>
              </li>}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
