import React, { useContext, useEffect } from 'react'
import "../styles.scss"
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { MainContext } from '../context/MainContext'
import Search from './Search'
import logo from "../assests/dwarkaorthologo.png"
import { useAuth0 } from '@auth0/auth0-react'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  const { token, setToken } = useContext(MainContext)
  console.log(location, "loc", params)
  const routes = ["brackets", "bands_and_tubes", "wires_and_springs", "miscellaneous", "orthodontic_pliers", "elastomerics"]
  const { loginWithRedirect, logout , isAuthenticated, user, getAccessTokenSilently} = useAuth0();
  console.log(user, "user")

  // const handleLogout = () => {
  //   localStorage.removeItem("token")
  //   setToken("")
  //   navigate("/")
  // }

  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="logo" id="navbar-logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {routes.includes(params.category) || location.pathname === "/contact" || location.pathname === "/terms_conditions" || location.pathname === "/about" || location.pathname === "/blog" || location.pathname === "/cart" || location.pathname === "/place-order" ? null : <Search />}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item text-capitalize">
              <Link to="/offers" className="nav-link text-capitalize">Offers</Link>
            </li>
            <li className="nav-item text-capitalize">
              <Link to="/cart" className="nav-link">Cart</Link>
            </li>
            {!isAuthenticated ? <li className="nav-item text-capitalize">
              {/* <Link to="/login" className="nav-link">Login</Link> */}
              <button onClick={() => loginWithRedirect()}>Log In</button>
            </li> : <>
              <li className="nav-item text-capitalize nav-link">Welcome {user.nickname} </li>
              <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>
            </>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
