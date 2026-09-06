import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import NavCategory from "../NavCategory/NavCategory";
import logo from "../assets/Mittal tractors.png";
import cart_icon from "../assets/cart_icon.png";

import { CartContext } from "../../Context/ShopContext";

import "./Navbar.css";

// Product Images
import p1_img from "../assets/oil_seal_and_rubber_parts1.png";
import p2_img from "../assets/oil seal and rubber parts2.png";
import p3_img from "../assets/oil seal and rubber parts3.png";
import p4_img from "../assets/oil seal and rubber parts4.png";
import p5_img from "../assets/gear_part_1.png";
import p6_img from "../assets/rubber_ring1.webp";
import p7_img from "../assets/gear_part_2.png";
import p8_img from "../assets/Hydraulic Pump.jpeg";

// ======================================================
// IMAGE MAPPING
// ======================================================

const productImages = {
  "oil_seal_and_rubber_parts1.png": p1_img,
  "oil seal and rubber parts2.png": p2_img,
  "oil seal and rubber parts3.png": p3_img,
  "oil seal and rubber parts4.png": p4_img,
  "gear_part_1.png": p5_img,
  "rubber_ring1.webp": p6_img,
  "gear_part_2.png": p7_img,
  "Hydraulic Pump.jpeg": p8_img,
};

const Navbar = () => {
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const [allProducts, setAllProducts] = useState([]);

  const [suggestions, setSuggestions] = useState([]);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const { totalItems, wishlistItems = [] } = useContext(CartContext);

  const navigate = useNavigate();

  const searchRef = useRef(null);

  // ======================================================
  // LOAD USER
  // ======================================================

  const loadUser = () => {
    const savedUser = localStorage.getItem("loggedInUser");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Invalid user data:", error);

        localStorage.removeItem("loggedInUser");

        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  // ======================================================
  // CHECK USER + AUTH CHANGE
  // ======================================================

  useEffect(() => {
    loadUser();

    const handleAuthChanged = () => {
      loadUser();
    };

    window.addEventListener("authChanged", handleAuthChanged);

    return () => {
      window.removeEventListener(
        "authChanged",
        handleAuthChanged
      );
    };
  }, []);

  // ======================================================
  // FETCH PRODUCTS
  // ======================================================

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/products/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Navbar Products:", data);

        if (data.success) {
          setAllProducts(data.products || []);
        }
      })
      .catch((error) => {
        console.error(
          "Navbar Product API Error:",
          error
        );
      });
  }, []);

  // ======================================================
  // SEARCH INPUT
  // ======================================================

  const handleSearchInput = (event) => {
    const value = event.target.value;

    setInputValue(value);

    const searchTerm = value.trim().toLowerCase();

    if (searchTerm === "") {
      setSuggestions([]);

      setShowSuggestions(false);

      return;
    }

    const matchingProducts = allProducts
      .filter((item) => {
        const productText = `
          ${item.name || ""}
          ${item.brand || ""}
          ${item.category || ""}
          ${item.description || ""}
          ${item.keywords || ""}
          ${item.model || ""}
          ${item.sku || ""}
        `.toLowerCase();

        return productText.includes(searchTerm);
      })
      .slice(0, 6);

    setSuggestions(matchingProducts);

    setShowSuggestions(true);
  };

  // ======================================================
  // SEARCH
  // ======================================================

  const handleSearchButtonClicked = () => {
    const searchTerm = inputValue.trim();

    if (searchTerm !== "") {
      setShowSuggestions(false);

      navigate(
        `/products?search=${encodeURIComponent(searchTerm)}`
      );
    }
  };

  // ======================================================
  // ENTER / ESCAPE
  // ======================================================

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchButtonClicked();
    }

    if (event.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  // ======================================================
  // PRODUCT SUGGESTION CLICK
  // ======================================================

  const handleSuggestionClick = (productId) => {
    setShowSuggestions(false);

    setInputValue("");

    navigate(`/product/${productId}`);
  };

  // ======================================================
  // CLICK OUTSIDE
  // ======================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ======================================================
  // PROFILE
  // ======================================================

  const handleProfileClick = () => {
    setProfileOpen((prev) => !prev);
  };

  // ======================================================
  // LOGOUT
  // ======================================================

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");

    setUser(null);

    setProfileOpen(false);

    window.dispatchEvent(
      new Event("authChanged")
    );

    navigate("/");
  };

  // ======================================================
  // USER INITIAL
  // ======================================================

  const userInitial = user?.name
    ? user.name.charAt(0).toUpperCase()
    : "";

  return (
    <div className="navbar-wrapper">

      {/* ==================================================
          TOP NAVBAR
      ================================================== */}

      <div className="navbar">

        {/* LOGO */}

        <div className="nav-logo">
          <Link to="/">
            <img
              src={logo}
              alt="Mittal Enterprises"
            />
          </Link>
        </div>

        {/* ==================================================
            SEARCH
        ================================================== */}

        <div
          className="nav-login-cart-search"
          ref={searchRef}
        >
          <div className="search-input-wrapper">

            <input
              type="text"
              className="form-control"
              placeholder="Search Products..."
              value={inputValue}
              onChange={handleSearchInput}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (inputValue.trim() !== "") {
                  setShowSuggestions(true);
                }
              }}
            />

            {/* SEARCH SUGGESTIONS */}

            {showSuggestions &&
              inputValue.trim() !== "" && (
                <div className="search-suggestions">

                  {suggestions.length > 0 ? (
                    suggestions.map((item) => {
                      const image =
                        productImages[item.image] ||
                        item.image;

                      return (
                        <div
                          className="search-suggestion-item"
                          key={item.id}
                          onClick={() =>
                            handleSuggestionClick(
                              item.id
                            )
                          }
                        >
                          <div className="suggestion-image">
                            <img
                              src={image}
                              alt={item.name}
                            />
                          </div>

                          <div className="suggestion-details">

                            <div className="suggestion-name">
                              {item.name}
                            </div>

                            <div className="suggestion-brand">
                              {item.brand}
                            </div>

                            <div className="suggestion-price">
                              ₹{item.new_price}
                            </div>

                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="no-search-results">
                      <strong>
                        No products found
                      </strong>

                      <span>
                        Try another product name
                      </span>
                    </div>
                  )}

                </div>
              )}

          </div>

          {/* SEARCH BUTTON */}

          <button
            type="button"
            className="btn btn-outline-success"
            onClick={handleSearchButtonClicked}
          >
            Search
          </button>

        </div>

        {/* ==================================================
            LOGIN + CART
        ================================================== */}

        <div className="nav-login-cart-login">

          {user ? (
            <div className="user-profile">

              {/* AVATAR */}

              <button
                type="button"
                className="user-avatar"
                title={user.name}
                onClick={handleProfileClick}
              >
                {userInitial}
              </button>

              {/* DROPDOWN */}

              {profileOpen && (
                <div className="user-dropdown">

                  {/* USER INFO */}

                  <div className="user-info">

                    <div className="dropdown-avatar">
                      {userInitial}
                    </div>

                    <div className="user-details">

                      <strong>
                        {user.name}
                      </strong>

                      <small>
                        {user.email}
                      </small>

                    </div>

                  </div>

                  {/* WISHLIST */}

                  <Link
                    to="/wishlist"
                    className="profile-menu-link"
                    onClick={() =>
                      setProfileOpen(false)
                    }
                  >
                    <span>❤️</span>

                    <span>
                      My Wishlist
                    </span>

                    <span className="wishlist-count">
                      {wishlistItems.length}
                    </span>
                  </Link>

                  {/* LOGOUT */}

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

          {/* CART */}

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

        {/* MOBILE MENU */}

        <div className="nav-hamburger-slot">
          <NavCategory mobileInline={true} />
        </div>

      </div>

      {/* DESKTOP CATEGORY */}

      <div className="nav-category-bar">
        <NavCategory mobileInline={false} />
      </div>

    </div>
  );
};

export default Navbar;