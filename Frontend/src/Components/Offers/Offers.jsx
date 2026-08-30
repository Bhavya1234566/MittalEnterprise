import React from "react";
import { useNavigate } from "react-router-dom";

import "./Offers.css";

import tractor from "../Assets/tractor.png";
import gear from "../Assets/gear.png";
import oilseal from "../Assets/oilseal.png";
import nuts from "../Assets/nuts.png";

const Offers = () => {

  const navigate = useNavigate();

  const handleViewProducts = () => {

    const section = document.getElementById("collections");

    if (section) {

      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    }

  };

  const handleBulkOrder = () => {

    navigate("/contact#contact-form");

  };

  return (

    <div className="offers">

      <div className="offers-left">

        <span className="tagline">
          🚜 Trusted Wholesale Tractor Parts Supplier
        </span>

        <h1>
          Mittal
          <br />
          Enterprise
        </h1>

        <p>
          All Types of Tractor Parts
          <br />
          <span>
            Gears • Oil Seals • Rubber Parts • Nuts & Bolts
          </span>
        </p>

        <div className="offer-buttons">

          <button
            className="btn-primary"
            onClick={handleViewProducts}
          >
            View Products
          </button>

          <button
            className="btn-outline"
            onClick={handleBulkOrder}
          >
            Bulk Order
          </button>

        </div>

      </div>

      <div className="offers-right">

        <img
          src={tractor}
          alt="Tractor"
          className="tractor-img"
        />

        <div className="parts-icons">

          <img src={gear} alt="" />

          <img src={oilseal} alt="" />

          <img src={nuts} alt="" />

        </div>

      </div>

    </div>

  );
};

export default Offers;