import { useState } from "react";
import NavCategory from "../NavCategory/NavCategory";
import logo from "../assets/Mittal tractors.png";
import cart_icon from "../assets/cart_icon.png";
import "./Navbar.css";

const Navbar = () => {
  const [InputValue , setInputValue] = useState();

  const handleSearchInput = (event) =>{
    setInputValue(event.target.value);
  }

  const handleSearchButtonClicked = () => {
    if(InputValue == "Gear"){
      console.log("searched");
      
    }
  }

   const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchButtonClicked();
    }
  };
  return (
    <>
      <div className="navbar">
        <div className="nav-logo">
          <img src={logo} alt="" />
        </div>

        <div className="nav-login-cart-search">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            onChange={handleSearchInput}
            onKeyDown={handleKeyDown}
          />
          <button className="btn btn-outline-success" onClick={handleSearchButtonClicked}>Search</button>
        </div>
        <div className="nav-login-cart-login">
          <button className="btn btn-outline-success">login</button>
          <img src={cart_icon} alt="" />
          <div className="item-count">0</div>
        </div>
        <div className="navbar-categories">
        <NavCategory />
        </div>
      </div>
    </>
  );
};

export default Navbar;
