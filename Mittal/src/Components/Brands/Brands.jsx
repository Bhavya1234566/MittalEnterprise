import React from "react";
import "./Brands.css";

import mahindra from "../assets/brands/mahindra.png";
import johndeere from "../assets/brands/johndeere.png";
import sonalika from "../assets/brands/sonalika.png";
import newholland from "../assets/brands/newholland.png";
import swaraj from "../assets/brands/swaraj.png";
// import tafe from "../../assets/brands/tafe.png";

const Brands = () => {
  const brands = [
    mahindra,
    johndeere,
    sonalika,
    newholland,
    swaraj,
    // tafe,
  ];

  return (
    <div className="brands">
      <h1>Brands</h1>
      <hr />

      <div className="brand-slider">
        <div className="brand-track">
          {[...brands, ...brands].map((logo, index) => (
            <div className="logo-box" key={index}>
              <img src={logo} alt="brand" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;