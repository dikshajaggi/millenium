import React, {useEffect, useRef, useState } from 'react'
import "../styles.scss"
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()
  console.log(location, "loc")

  return (
    <div>
      <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link to="/" className="navbar-brand">Millenium Orthodontics</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="position-relative">
              <form className="d-flex mx-auto" role="search">
                <input className="form-control me-2 search-width" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline search-btn" type="submit">Search</button>
              </form>
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item text-capitalize">
                <Link to="/offers" className="nav-link text-capitalize">Offers</Link>
              </li>
              <li className="nav-item text-capitalize">
                <Link to="/cart" className="nav-link">Cart</Link>
              </li>
              <li className="nav-item text-capitalize">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
