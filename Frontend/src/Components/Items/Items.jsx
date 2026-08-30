import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Items.css";

import { CartContext } from "../../Context/ShopContext";
import all_products from "../assets/all_products";

import toast from "react-hot-toast";
import ConfettiExplosion from "react-confetti-explosion";

const Items = (props) => {
  const { addToCart, cartItems } = useContext(CartContext);

  const [explode, setExplode] = useState(false);
  const [animateCard, setAnimateCard] = useState(false);

  const product = all_products.find(
    (item) => item.id === props.id
  );

  // Check if already added in cart
  const isAdded = cartItems.some(
    (item) => item.id === props.id
  );

  const handleAddToCart = () => {

    if (isAdded) return;

    addToCart(product, 1);

    toast.success("🛒 Product Added To Cart!", {
      icon: "🎉",
    });

    setExplode(true);
    setAnimateCard(true);

    setTimeout(() => {
      setExplode(false);
    }, 1800);

    setTimeout(() => {
      setAnimateCard(false);
    }, 700);
  };

  return (
    <div
      className={`item ${
        animateCard ? "success-card" : ""
      }`}
    >

      {/* Confetti */}

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

      {/* Product Image */}

      <Link
        to={`/product/${props.id}`}
        className="item-link"
      >
        <div className="item-img">

          <img
            src={props.image}
            alt={props.name}
          />

          {/* Hover Overlay */}

          <div className="image-overlay">
    <span className="view-product">
        👁 View Product
    </span>
</div>

          {props.badge && (
            <div className="item-badge">
              {props.badge}
            </div>
          )}

        </div>
      </Link>

      {/* Product Name */}

      <Link
        to={`/product/${props.id}`}
        className="item-title"
      >
        <p>{props.name}</p>
      </Link>

      {/* Price */}

      <div className="item-prices">

        <div className="item-price-new">
          ₹{props.new_price}
        </div>

        <div className="item-price-old">
          ₹{props.old_price}
        </div>

      </div>

      {/* Button */}

      <button
        className={`item-cart ${
          animateCard ? "clicked" : ""
        } ${
          isAdded ? "added-btn" : ""
        }`}
        onClick={handleAddToCart}
        disabled={isAdded}
      >
        {isAdded ? (
          <>
            ✅ Added To Cart
          </>
        ) : (
          <>
            🛒 Shop Now
          </>
        )}
      </button>

    </div>
  );
};

export default Items;