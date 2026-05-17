import React from "react";
import tractor_img from "../assets/tractor.png";
import "./Hero.css";
import hand_icon from '../assets/hand_icon.png'
import arrow_icon from '../assets/arrow.png'

const Hero = () => {
  return (
    <>
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
            <div className="col">
              <img src={tractor_img} alt="" className="hero-img-right" />
            </div>
          </div>
        </div>
        <div className="latest-collection-btn">
         <div>Latest Collecton</div>
         <img src={arrow_icon} alt="" />
        </div>
      </div>
    </>
  );
};

export default Hero;
