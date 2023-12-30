import React from 'react'
import "../styles.scss"

const Footer = () => {
  return (
    <div>
      <div className='mt-auto d-flex flex-sm-row flex-column align-items-center justify-content-space-between' style={{ width: "100%", height: "20vh", backgroundColor: "#464646", color: "white", padding: "0 2vw" }}>
        <div style={{ width: "33.33%", textAlign: "center" }}>
          ABOUT
        </div>
        <div style={{ width: "33.33%", textAlign: "center" }}>
          CONTACT
        </div>
        <div style={{ width: "33.33%", textAlign: "center" }}>
          TERMS AND CONDITIONS
        </div>
        <div style={{ width: "33.33%", textAlign: "center" }}>
          BLOG
        </div>
      </div>
    </div>
  )
}

export default Footer
