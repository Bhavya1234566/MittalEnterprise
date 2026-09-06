import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  CartContext,
} from "../../Context/ShopContext";

import toast from "react-hot-toast";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Breadcrumb from "../../Components/Breadcrum/Breadcrum";

import "./Wishlist.css";


import p1_img
  from "../../Components/assets/oil_seal_and_rubber_parts1.png";

import p2_img
  from "../../Components/assets/oil seal and rubber parts2.png";

import p3_img
  from "../../Components/assets/oil seal and rubber parts3.png";

import p4_img
  from "../../Components/assets/oil seal and rubber parts4.png";

import p5_img
  from "../../Components/assets/gear_part_1.png";

import p6_img
  from "../../Components/assets/rubber_ring1.webp";

import p7_img
  from "../../Components/assets/gear_part_2.png";

import p8_img
  from "../../Components/assets/Hydraulic Pump.jpeg";


const productImages = {

  "oil_seal_and_rubber_parts1.png":
    p1_img,

  "oil seal and rubber parts2.png":
    p2_img,

  "oil seal and rubber parts3.png":
    p3_img,

  "oil seal and rubber parts4.png":
    p4_img,

  "gear_part_1.png":
    p5_img,

  "rubber_ring1.webp":
    p6_img,

  "gear_part_2.png":
    p7_img,

  "Hydraulic Pump.jpeg":
    p8_img,

};


const Wishlist = () => {

  const navigate =
    useNavigate();


  // ======================================================
  // CONTEXT
  // ======================================================

  const {
    user: contextUser,
    wishlistItems,
    removeFromWishlist,
    addToCart,
  } = useContext(
    CartContext
  );


  // ======================================================
  // USER
  // ======================================================

  const [user, setUser] =
    useState(contextUser || null);


  // ======================================================
  // AUTH CHECK
  // ======================================================

  useEffect(() => {

    const savedUser =
      localStorage.getItem(
        "loggedInUser"
      );


    if (savedUser) {

      try {

        setUser(
          JSON.parse(savedUser)
        );

      } catch (error) {

        console.error(
          "User parse error:",
          error
        );

        setUser(null);

      }

    } else {

      setUser(null);

    }

  }, [contextUser]);


  // ======================================================
  // REMOVE
  // ======================================================

  const handleRemove = async (
    productId
  ) => {

    await removeFromWishlist(
      productId
    );

    toast.success(
      "Removed from Wishlist"
    );

  };


  // ======================================================
  // ADD TO CART
  // ======================================================

  const handleAddToCart = async (
    product
  ) => {

    const result =
      await addToCart(
        product,
        1
      );


    if (
      result?.loginRequired
    ) {

      toast.error(
        "Please login first"
      );

      navigate("/login");

      return;
    }


    if (
      result?.success
    ) {

      toast.success(
        "🛒 Added to Cart!"
      );

    } else {

      toast.error(
        "Unable to add product to cart."
      );

    }

  };


  // ======================================================
  // NOT LOGGED IN
  // ======================================================

  if (!user) {

    return (

      <>

        <Navbar />

        <Breadcrumb
          currentPage="Wishlist"
        />


        <div className="wishlist-page">

          <div className="wishlist-empty">

            <div className="wishlist-empty-icon">
              ❤️
            </div>

            <h2>
              Login to view your Wishlist
            </h2>

            <p>
              Save your favourite tractor
              parts and access them anytime.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/login")
              }
            >
              Login
            </button>

          </div>

        </div>


        <Footer />

      </>

    );

  }


  // ======================================================
  // EMPTY WISHLIST
  // ======================================================

  if (
    wishlistItems.length === 0
  ) {

    return (

      <>

        <Navbar />

        <Breadcrumb
          currentPage="Wishlist"
        />


        <div className="wishlist-page">

          <div className="wishlist-empty">

            <div className="wishlist-empty-icon">
              ♡
            </div>

            <h2>
              Your Wishlist is Empty
            </h2>

            <p>
              You haven't added any products
              to your wishlist yet.
            </p>


            {/* ==================================================
                NAVIGATION BUTTONS
            ================================================== */}

            <div className="wishlist-empty-actions">

              <Link
                to="/products"
              >
                Browse Products
              </Link>


              <Link
                to="/"
              >
                🏠 Home
              </Link>


              <Link
                to="/cart"
              >
                🛒 Cart
              </Link>

            </div>

          </div>

        </div>


        <Footer />

      </>

    );

  }


  // ======================================================
  // MAIN WISHLIST
  // ======================================================

  return (

    <>

      <Navbar />

      <Breadcrumb
        currentPage="Wishlist"
      />


      <div className="wishlist-page">


        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="wishlist-header">


          <div>

            <h1>
              My Wishlist
            </h1>

            <p>
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1
                ? "Product"
                : "Products"}
            </p>

          </div>


          <div className="wishlist-header-actions">


            <Link
              to="/"
              className="wishlist-home-btn"
            >
              🏠 Home
            </Link>


            <Link
              to="/cart"
              className="wishlist-cart-top-btn"
            >
              🛒 Go to Cart
            </Link>


            <div className="wishlist-heart">
              ❤️
            </div>

          </div>

        </div>


        {/* ==================================================
            PRODUCTS
        ================================================== */}

        <div className="wishlist-grid">

          {wishlistItems.map(
            (product) => {

              const image =
                productImages[
                  product.image
                ] ||
                product.image;


              return (

                <div
                  className="wishlist-card"
                  key={product.id}
                >


                  {/* PRODUCT IMAGE */}

                  <Link
                    to={`/product/${product.id}`}
                    className="wishlist-image"
                  >

                    <img
                      src={image}
                      alt={product.name}
                    />

                  </Link>


                  {/* PRODUCT DETAILS */}

                  <div className="wishlist-details">


                    <Link
                      to={`/product/${product.id}`}
                      className="wishlist-name"
                    >
                      {product.name}
                    </Link>


                    {product.brand && (

                      <div className="wishlist-brand">
                        {product.brand}
                      </div>

                    )}


                    {/* PRICE */}

                    <div className="wishlist-price">

                      ₹{product.new_price}


                      {product.old_price && (

                        <span>
                          ₹{product.old_price}
                        </span>

                      )}

                    </div>


                    {/* BUTTONS */}

                    <div className="wishlist-actions">


                      <button
                        type="button"
                        className="wishlist-cart-btn"
                        onClick={() =>
                          handleAddToCart(
                            product
                          )
                        }
                      >
                        🛒 Add to Cart
                      </button>


                      <button
                        type="button"
                        className="wishlist-remove-btn"
                        onClick={() =>
                          handleRemove(
                            product.id
                          )
                        }
                      >
                        🗑 Remove
                      </button>

                    </div>

                  </div>

                </div>

              );

            }
          )}

        </div>

      </div>


      <Footer />

    </>

  );

};


export default Wishlist;
