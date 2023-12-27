import React, { useContext, useEffect, useState } from 'react'
import "../styles.scss"
import { Link } from 'react-router-dom'
import { MainContext } from '../../context/MainContext'
import { useCart } from '../../context/cartContext'

const Header = () => {
  const context = useContext(MainContext)
  const name =  localStorage.getItem('user') ? localStorage.getItem('user').name : null
  const [user, setUser] = useState(name)
  const { cartState } = useCart()
  const [cart, setCart] = useState()

  const getCart = async () => {
    const data = await fetch(`http://localhost:8000/api/cart/all-products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': context.userLoginToken,
      }
    })
    if (data.ok) {
      const jsondata = await data.json();
      console.log(jsondata.cartProducts, "jsondata.cartProducts");
      setCart(jsondata.cartProducts)
    }
  }

  useEffect(() => {
    getCart()
  }, [cartState.cart])
  console.log(cart, "cart all ", cartState)

  useEffect(() => {
    setUser(context.user)
  }, [context.userLoginToken])
  return (
    <div>
      <nav class="navbar sticky-top navbar-expand-lg bg-body-tertiary">
        <div class="container">
          <Link to="/" class="navbar-brand" >Navbar</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="d-flex mx-auto" role="search">
              <input class="form-control me-2 search-width" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline search-btn" type="submit">Search</button>
            </form>
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item text-capitalize">
                <Link to="/offers" class="nav-link text-capitalize" >Offers</Link>
              </li>
              {/* <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> */}
              <li class="nav-item text-capitalize">
                <Link to="/cart" class="nav-link">Cart</Link>
              </li>
              <li class="nav-item text-capitalize">
                <Link to="/login" class="nav-link" >{user !== undefined ? user : "Login"}</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
