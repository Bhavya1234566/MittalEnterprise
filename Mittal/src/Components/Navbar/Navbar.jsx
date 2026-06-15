import { useState } from "react";
import NavCategory from "../NavCategory/NavCategory";
import logo from "../assets/Mittal tractors.png";
import cart_icon from "../assets/cart_icon.png";
import "./Navbar.css";

const Navbar = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSearchInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchButtonClicked = () => {
    if (inputValue === "Gear") {
      console.log("searched");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchButtonClicked();
    }
  };

  return (
    <div className="navbar-wrapper">
      {/* ── Top bar: Logo + Search + Login/Cart ── */}
      <div className="navbar">
        <div className="nav-logo">
          <img src={logo} alt="Mittal Enterprises" />
        </div>

        <div className="nav-login-cart-search">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            onChange={handleSearchInput}
            onKeyDown={handleKeyDown}
          />
          <button
            className="btn btn-outline-success"
            onClick={handleSearchButtonClicked}
          >
            Search
          </button>
        </div>

        <div className="nav-login-cart-login">
          <button className="btn btn-outline-success">login</button>
          <div className="cart-wrapper">
            <img src={cart_icon} alt="cart" />
            <div className="item-count">0</div>
          </div>
        </div>

        {/* Hamburger slot — sirf ≤991px pe visible */}
        <div className="nav-hamburger-slot">
          <NavCategory mobileInline={true} />
        </div>
      </div>

      {/* Category bar — sirf ≥992px pe visible */}
      <div className="nav-category-bar">
        <NavCategory mobileInline={false} />
      </div>
    </div>
  );
};

export default Navbar;