import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Breadcrumb from "../Breadcrum/Breadcrum";
import Footer from "../Footer/Footer";
import "./Contact.css";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

const Contact = () => {

  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#contact-form") {
      const form = document.getElementById("contact-form");

      if (form) {
        setTimeout(() => {
          form.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    }
  }, [location]);

  return (
    <section className="contact-page">

      {/* Hero */}
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>
          Have questions about tractor spare parts? We'd love to hear from you.
        </p>
      </div>

      <Breadcrumb currentPage="Contact Us" />

      {/* Contact Section */}
      <div className="contact-container">

        {/* Left */}
        <div className="contact-info">

          <h2>Get In Touch</h2>

          <div className="info-box">
            <FaMapMarkerAlt className="icon" />
            <div>
              <h4>Address</h4>
              <p>Sri Ganganagar, Rajasthan, India</p>
            </div>
          </div>

          <div className="info-box">
            <FaPhoneAlt className="icon" />
            <div>
              <h4>Phone</h4>
              <p>+91 8302408557</p>
            </div>
          </div>

          <div className="info-box">
            <FaEnvelope className="icon" />
            <div>
              <h4>Email</h4>
              <p>info@mittalenterprise.com</p>
            </div>
          </div>

          <div className="info-box">
            <FaClock className="icon" />
            <div>
              <h4>Business Hours</h4>
              <p>Mon - Sat : 9 AM - 7 PM</p>
            </div>
          </div>

        </div>

        {/* Right */}
        <div className="contact-form" id="contact-form">

          <h2>Send Message</h2>

          <form>

            <input
              type="text"
              placeholder="Your Name"
            />

            <input
              type="email"
              placeholder="Email Address"
            />

            <input
              type="text"
              placeholder="Phone Number"
            />

            <input
              type="text"
              placeholder="Subject"
            />

            <textarea
              rows="6"
              placeholder="Write your message..."
            />

            <button type="submit">
              Send Message
            </button>

          </form>

        </div>

      </div>

      {/* Google Map */}
      <div className="map">
        <iframe
          title="map"
          src="https://www.google.com/maps?q=Sri%20Ganganagar%20Rajasthan&output=embed"
          loading="lazy"
        ></iframe>
      </div>

      <Footer />

    </section>
  );
};

export default Contact;