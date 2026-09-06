import React, {
  useContext,
  useState,
} from "react";

import { Link, useNavigate } from "react-router-dom";

import "./Items.css";

import {
  CartContext,
} from "../../Context/ShopContext";

import toast from "react-hot-toast";

import ConfettiExplosion
  from "react-confetti-explosion";


const Items = (props) => {

  const navigate = useNavigate();

  const {
    addToCart,
    cartItems,

    addToWishlist,
    removeFromWishlist,

    isInWishlist,

    user,
  } = useContext(CartContext);


  const [explode, setExplode] =
    useState(false);

  const [animateCard, setAnimateCard] =
    useState(false);

  const [heartAnimation, setHeartAnimation] =
    useState(false);


  // ======================================================
  // PRODUCT
  // ======================================================

  const product =
    props.product || props;


  // ======================================================
  // CART STATUS
  // ======================================================

  const isAdded =
    cartItems.some(
      (item) =>
        item.id === product.id
    );


  // ======================================================
  // WISHLIST STATUS
  // ======================================================

  const isWishlisted =
    isInWishlist(
      product.id
    );


  // ======================================================
  // ADD TO CART
  // ======================================================

  const handleAddToCart =
    async () => {

      if (!user) {

        toast.error(
          "Please login to add products to cart."
        );

        navigate("/login");

        return;

      }


      if (isAdded) {
        return;
      }


      const result =
        await addToCart(
          product,
          1
        );


      if (
        result?.loginRequired
      ) {

        toast.error(
          "Please login first."
        );

        navigate("/login");

        return;

      }


      if (
        !result?.success
      ) {

        toast.error(
          "Unable to add product to cart."
        );

        return;

      }


      toast.success(
        "🛒 Product Added To Cart!",
        {
          icon: "🎉",
        }
      );


      setExplode(true);

      setAnimateCard(true);


      setTimeout(
        () =>
          setExplode(false),
        1800
      );

      setTimeout(
        () =>
          setAnimateCard(false),
        700
      );

    };


  // ======================================================
  // WISHLIST
  // ======================================================

  const handleWishlist =
    async (e) => {

      e.preventDefault();

      e.stopPropagation();


      if (!user) {

        toast.error(
          "Please login to use wishlist."
        );

        navigate("/login");

        return;

      }


      setHeartAnimation(true);


      setTimeout(
        () =>
          setHeartAnimation(false),
        400
      );


      if (isWishlisted) {

        await removeFromWishlist(
          product.id
        );

        toast.success(
          "Removed from wishlist"
        );

        return;

      }


      const result =
        await addToWishlist(
          product
        );


      if (
        result?.loginRequired
      ) {

        toast.error(
          "Please login first."
        );

        navigate("/login");

        return;

      }


      if (
        result?.success
      ) {

        toast.success(
          "❤️ Added to wishlist"
        );

      } else {

        toast.error(
          "Unable to update wishlist"
        );

      }

    };


  return (

    <div
      className={`item ${
        animateCard
          ? "success-card"
          : ""
      }`}
    >

      {/* ==================================================
          CONFETTI
      ================================================== */}

      {explode && (

        <div className="card-confetti">

          <ConfettiExplosion
            force={0.9}
            duration={2200}
            particleCount={180}
            width={900}
            colors={[
              "#4CAF50",
              "#FFD700",
              "#FF5252",
              "#2196F3",
              "#FF9800",
              "#9C27B0",
            ]}
          />

        </div>

      )}


      {/* ==================================================
          IMAGE
      ================================================== */}

      <div className="item-img">

        <Link
          to={`/product/${product.id}`}
          className="item-link"
        >

          <img
            src={product.image}
            alt={product.name}
          />

          <div className="image-overlay">

            <span className="view-product">
              👁 View Product
            </span>

          </div>

        </Link>


        {/* BADGE */}

        {product.badge && (

          <div className="item-badge">
            {product.badge}
          </div>

        )}


        {/* ==================================================
            WISHLIST
        ================================================== */}

        <button
          type="button"
          className={`wishlist-btn ${
            isWishlisted
              ? "active"
              : ""
          } ${
            heartAnimation
              ? "heart-animation"
              : ""
          }`}
          onClick={handleWishlist}
          title={
            isWishlisted
              ? "Remove from Wishlist"
              : "Add to Wishlist"
          }
        >

          {isWishlisted
            ? "❤️"
            : "🤍"}

        </button>

      </div>


      {/* ==================================================
          TITLE
      ================================================== */}

      <Link
        to={`/product/${product.id}`}
        className="item-title"
      >

        <p>
          {product.name}
        </p>

      </Link>


      {/* ==================================================
          PRICE
      ================================================== */}

      <div className="item-prices">

        <div className="item-price-new">
          ₹{product.new_price}
        </div>

        {product.old_price && (

          <div className="item-price-old">
            ₹{product.old_price}
          </div>

        )}

      </div>


      {/* ==================================================
          CART
      ================================================== */}

      <button
        className={`item-cart ${
          animateCard
            ? "clicked"
            : ""
        } ${
          isAdded
            ? "added-btn"
            : ""
        }`}
        onClick={handleAddToCart}
        disabled={isAdded}
      >

        {isAdded
          ? "✅ Added To Cart"
          : "🛒 Shop Now"}

      </button>

    </div>

  );
};

export default Items;