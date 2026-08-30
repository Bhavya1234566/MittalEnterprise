import React from "react";
import { Link } from "react-router-dom";
import "./Brands.css";
import brandsData from "../../Components/assets/brandsData";

const Brands = () => {
  return (
    <section className="brands">

      <div className="brands-header">

        <div>
          <h1>Our Brands</h1>
          <hr />
        </div>

        <Link
          to="/brands"
          className="view-all-btn"
        >
          View All →
        </Link>

      </div>

      <div className="brand-slider">

        <div className="brand-track">

          {[...brandsData, ...brandsData].map((brand, index) => (

            <Link
              key={index}
              to={`/products?brand=${encodeURIComponent(brand.name)}`}
              className="logo-box"
            >

              <img
                src={brand.image}
                alt={brand.name}
              />

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Brands;