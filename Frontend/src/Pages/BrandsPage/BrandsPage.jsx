import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../../Components/Navbar/Navbar";
import Breadcrumb from "../../Components/Breadcrum/Breadcrum";
import Footer from "../../Components/Footer/Footer";

import brandsData from "../../Components/assets/brandsData";

import "./BrandsPage.css";

const BrandsPage = () => {

  return (

    <>

      <Navbar />

      <Breadcrumb currentPage="Brands" />

      <section className="brands-page">

        <div className="brands-page-heading">

          <h1>Our Brands</h1>

          <p>
            Explore premium tractor parts by your preferred brand.
          </p>

          <hr />

        </div>

        <div className="brands-grid">

          {brandsData.map((brand) => (

            <Link
              key={brand.id}
              to={`/products?brand=${encodeURIComponent(brand.name)}`}
              className="brand-card"
            >

              <div className="brand-logo">

                <img
                  src={brand.image}
                  alt={brand.name}
                />

              </div>

              <h3>{brand.name}</h3>

              <span className="brand-btn">
                View Products →
              </span>

            </Link>

          ))}

        </div>

      </section>

      <Footer />

    </>

  );

};

export default BrandsPage;