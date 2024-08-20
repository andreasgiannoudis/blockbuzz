import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-logo">
        <a href="/"><h2>BlockBuzz</h2></a>
        </div>
        
        <nav className="footer-nav">
          <ul>
            <Link to="/blockbuzz/about" className="footer-link"><li>About us</li></Link>
            <Link to="/blockbuzz/contact" className="footer-link"><li>Contact</li></Link>
            <Link to="/blockbuzz/privacy-policy" className="footer-link"><li>Privacy Policy</li></Link>
          </ul>
        </nav>
        <div className="footer-social">
          <a href="https://www.linkedin.com/in/andreas-giannoudis/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/andreasgiannoudis" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} BlockBuzz. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
