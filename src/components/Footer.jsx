import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Footer.css'

const Footer = () => {
  return (
    <>
        <div style={{backgroundColor:"#28bf96"}}>
        <footer className="footer ms-auto">
        <div className="footer-content">
        <div className="footer-logo">
          <h2>Doctor-on-Call</h2>
          <p>Get treatment at your home</p>
        </div>
        <div className="footer-social">
            <a href="https://www.gmail.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faEnvelope} />
        </a><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Doctor-on-Call. All rights reserved.</p>
      </div>
    </footer>
    </div>
    </>
  )
}

export default Footer