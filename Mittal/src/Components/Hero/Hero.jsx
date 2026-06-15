import React from "react";
import tractor_img from "../assets/tractor.png";
import "./Hero.css";
import hand_icon from '../assets/hand_icon.png'
import arrow_icon from '../assets/arrow.png'

const Hero = () => {
  return (
    <div className="hero">
      
      <div className="container">
        <div className="row row-cols-2">
          <div className="col">
            <div className="hero-left">
              <h6>NEW ARRIVALS ONLY</h6>
              <p>new</p>
              <img src={hand_icon} alt="" />
              <p>Collections</p>
              <p>for everyone</p>
            </div>
          </div>
          <div className="col d-flex align-items-center">
            <img src={tractor_img} alt="Tractor" className="hero-img-right" />
          </div>
        </div>
      </div>

      <button className="latest-collection-btn">
        <div>Latest Collection</div>
        <img src={arrow_icon} alt="" />
      </button>
    </div>
  );
};

export default Hero;