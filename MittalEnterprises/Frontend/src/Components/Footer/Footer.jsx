import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>Mittal Enterprises</h2>
          <p>
            Trusted supplier of quality bearings, oil seals, industrial parts,
            and tractor components. Delivering reliability and performance.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/products">Products</Link>
            </li>

            <li>
              <Link to="/brands">Brands</Link>
            </li>

            <li>
              <Link to="/about">About Us</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Products</h3>
          <ul>
            <li>Bearings</li>
            <li>Oil Seals</li>
            <li>O Rings</li>
            <li>Hydraulic Seals</li>
            <li>Industrial Parts</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>📍 Sri Ganganagar, Rajasthan</p>
          <p>📞 +91 XXXXX XXXXX</p>
          <p>✉️ info@mittalenterprises.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Mittal Enterprises. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
