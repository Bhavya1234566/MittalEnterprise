import React from "react";
import "./About.css";
import Breadcrumb from "../Breadcrum/Breadcrum"
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const About = () => {
  return (
    <div className="about">
      <Navbar/>
       <Breadcrumb currentPage="About Us" />
      <section className="about-hero">
        <h1>About Mittal Enterprises</h1>
        <p>
          Your Trusted Partner for Bearings, Oil Seals, Tractor Parts &
          Industrial Solutions.
        </p>
      </section>

      <section className="about-company">
        <div className="about-content">
          <h2>Who We Are</h2>
          <p>
            Mittal Enterprises is a trusted supplier of high-quality bearings,
            oil seals, hydraulic seals, O-rings, tractor parts, and industrial
            components. We are committed to providing genuine products, reliable
            service, and competitive prices to our customers.
          </p>

          <p>
            With years of experience in the industry, we have built strong
            relationships with leading brands and customers across various
            sectors including agriculture, automotive, and industrial
            machinery.
          </p>
        </div>
      </section>

      <section className="mission-vision">
        <div className="card">
          <h3>Our Mission</h3>
          <p>
            To deliver premium quality products and exceptional customer
            service while building long-term relationships based on trust and
            reliability.
          </p>
        </div>

        <div className="card">
          <h3>Our Vision</h3>
          <p>
            To become the most preferred supplier of industrial and tractor
            components by consistently exceeding customer expectations.
          </p>
        </div>
      </section>

      <section className="why-choose">
        <h2>Why Choose Us?</h2>

        <div className="features">
          <div className="feature">
            <h3>✔ Genuine Products</h3>
            <p>We supply only trusted and quality products.</p>
          </div>

          <div className="feature">
            <h3>✔ Best Pricing</h3>
            <p>Competitive prices with excellent value.</p>
          </div>

          <div className="feature">
            <h3>✔ Wide Product Range</h3>
            <p>Bearings, oil seals, O-rings, tractor parts and more.</p>
          </div>

          <div className="feature">
            <h3>✔ Customer Support</h3>
            <p>Dedicated assistance and quick response.</p>
          </div>
        </div>
      </section>
    <Footer/>
    </div>
  );
};

export default About;