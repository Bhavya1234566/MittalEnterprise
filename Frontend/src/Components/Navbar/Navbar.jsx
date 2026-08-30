import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import NavCategory from "../NavCategory/NavCategory";
import logo from "../assets/Mittal tractors.png";
import cart_icon from "../assets/cart_icon.png";

import { CartContext } from "../../Context/ShopContext";

import "./Navbar.css";

const Navbar = () => {

  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const { totalItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Check logged-in user
  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Invalid user data:", error);
        localStorage.removeItem("loggedInUser");
      }
    }
  }, []);

  const handleSearchInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchButtonClicked = () => {
    if (inputValue.trim() !== "") {
      console.log("Searching:", inputValue);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchButtonClicked();
    }
  };

  // Avatar click
  const handleProfileClick = () => {
    setProfileOpen((prev) => !prev);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");

    setUser(null);
    setProfileOpen(false);

    navigate("/");
  };

  // Get first letter of name
  const userInitial = user?.name
    ? user.name.charAt(0).toUpperCase()
    : "";

  return (
    <div className="navbar-wrapper">

      {/* Top Navbar */}
      <div className="navbar">

        {/* Logo */}
        <div className="nav-logo">
          <Link to="/">
            <img
              src={logo}
              alt="Mittal Enterprises"
            />
          </Link>
        </div>

        {/* Search */}
        <div className="nav-login-cart-search">

          <input
            type="text"
            className="form-control"
            placeholder="Search Products..."
            value={inputValue}
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

        {/* Login & Cart */}
        <div className="nav-login-cart-login">

          {/* User Avatar / Login */}
          {user ? (

            <div className="user-profile">

              {/* Avatar */}
              <button
                type="button"
                className="user-avatar"
                title={user.name}
                onClick={handleProfileClick}
              >
                {userInitial}
              </button>

              {/* Dropdown */}
              {profileOpen && (
                <div className="user-dropdown">

                  <div className="user-info">

                    <div className="dropdown-avatar">
                      {userInitial}
                    </div>

                    <div className="user-details">
                      <strong>{user.name}</strong>
                      <small>{user.email}</small>
                    </div>

                  </div>

                  <button
                    type="button"
                    className="logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>

          ) : (

            <Link
              to="/login"
              className="btn btn-outline-success"
            >
              Login
            </Link>

          )}

          {/* Cart */}
          <Link
            to="/cart"
            className="cart-wrapper"
          >

            <img
              src={cart_icon}
              alt="Cart"
            />

            <span className="item-count">
              {totalItems}
            </span>

          </Link>

        </div>

        {/* Mobile Menu */}
        <div className="nav-hamburger-slot">
          <NavCategory mobileInline={true} />
        </div>

      </div>

      {/* Desktop Category */}
      <div className="nav-category-bar">
        <NavCategory mobileInline={false} />
      </div>

    </div>
  );
};

export default Navbar;