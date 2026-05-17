import React from "react";
import './Offers.css'
import tractor from "../Assets/tractor.png";
import gear from "../Assets/gear.png";
import oilseal from "../Assets/oilseal.png";
import nuts from "../Assets/nuts.png";

const Offers = () => {

  const handleViewProducts = () => {
    const collectionsSection = document.getElementById("collections");
    collectionsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="offers">
      <div className="offers-left">
        <span className="tagline">🚜 Trusted Wholesale Tractor Parts Supplier</span>

        <h1>
          Mittal <br /> Enterprise
        </h1>

        <p>
          All Types of Tractor Parts <br />
          <span>Gears • Oil Seals • Rubber Parts • Nuts & Bolts</span>
        </p>

        <div className="offer-buttons">
          <button className="btn-primary" onClick={handleViewProducts}>
            View Products
          </button>
          <button className="btn-outline">Bulk Order</button>
        </div>
      </div>

      <div className="offers-right">
        <img src={tractor} alt="Tractor" className="tractor-img" />

        <div className="parts-icons">
          <img src={gear} alt="Gear" />
          <img src={oilseal} alt="Oil Seal" />
          <img src={nuts} alt="Bolts" />
        </div>
      </div>
    </div>
  );
};

export default Offers;
