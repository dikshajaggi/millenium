import React from 'react'
import "./styles.scss"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div className='w-100 mt-auto d-flex flex-sm-row flex-column align-items-center justify-content-space-between res-footer-wrapper'>
        <div className='footer-div'>
          <Link className='nav-link' to="/about">ABOUT</Link>
        </div>
        <div className='footer-div'>
          <Link className='nav-link' to="/contact">CONTACT</Link>
        </div>
        <div className='footer-div'>
          <Link className='nav-link' to="/terms_conditions">TERMS AND CONDITIONS</Link>
        </div>
        <div className='footer-div'>
          <Link className='nav-link' to="/blog">BLOG</Link>
        </div>
      </div>
    </>
  )
}

export default Footer
