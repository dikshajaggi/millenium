import React from 'react'
// import workInProgress from "../../assests/images/workInProgress.png"
import "../styles.scss"
import instagram from "../../assests/icons/instagram.png"
import { WhatsappIcon, FacebookIcon } from "react-share";
import { contactEmail, contactNumber, whatsappUrl, fbPageUrl, instaPageUrl } from "../../assests/static"


const Support = () => {
  return (
    <div className='footer-pages-wrapper'>
      <h3>Contact Us</h3>
      <div className='footer-pages-content'>
        <br></br>
        <p>We'd love to hear from you! Whether you have questions, feedback, or need assistance, feel free to reach out to us.</p>
        <br></br>
        <h5>Email Us:</h5>
        <p><h6>For general inquiries:</h6>{contactEmail}</p>
        <p><h6>For support:</h6> {contactEmail}</p>
        <br></br>
        <h5>Call Us:</h5>
        <p>{contactNumber}</p>
        <br></br>
        <h5>Connect with Us:</h5>
        <p>Follow us on Whatsapp, Facebook, Instagram.</p>
        <div className='follow-icons-support'>
          <a className="follow-icons-support-a" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <WhatsappIcon size={32} round={true} />
          </a>
          <a className="follow-icons-support-a" href={fbPageUrl} target="_blank" rel="noopener noreferrer">
            <FacebookIcon size={32} round={true} />
          </a>
          <a className="follow-icons-support-a" href={instaPageUrl} target="_blank" rel="noopener noreferrer">
            <img
              src={instagram}
              alt="Visit Instagram Page"
              style={{ width: 32, height: 32 }}
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Support
