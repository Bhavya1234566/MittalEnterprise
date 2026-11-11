import { getProductImageUrl } from "../../utils/productImage.js";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Breadcrumb from "../../Components/Breadcrum/Breadcrum";

import { CartContext } from "../../Context/ShopContext";

import "./Cart.css";

// ======================================================
// PRODUCT IMAGES
// ======================================================

// ======================================================
// IMAGE MAPPING
// ======================================================

// ======================================================
// CART COMPONENT
// ======================================================

const Cart = () => {
  const navigate = useNavigate();

  // ====================================================
  // CART CONTEXT
  // ====================================================

  const {
    user,
    cartItems,
    removeFromCart,
    updateQuantity,
    totalAmount,
    cartLoading,
  } = useContext(CartContext);

  // ====================================================
  // NOT LOGGED IN
  // ====================================================

  if (!user) {
    return (
      <>
        <Navbar />

        <Breadcrumb currentPage="Shopping Cart" />

        <div className="cart-page">

          <h1>Shopping Cart</h1>

          <div className="empty-cart">

            <h2>Please Login First</h2>

            <p>
              Please login to view your personal shopping cart.
            </p>

            <button
              type="button"
              className="continue-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

          </div>

        </div>

        <Footer />
      </>
    );
  }

  // ====================================================
  // LOADING CART
  // ====================================================

  if (cartLoading) {
    return (
      <>
        <Navbar />

        <Breadcrumb currentPage="Shopping Cart" />

        <div className="cart-page">

          <h1>Shopping Cart</h1>

          <div className="empty-cart">

            <h2>Loading Cart...</h2>

            <p>
              Please wait while we load your cart.
            </p>

          </div>

        </div>

        <Footer />
      </>
    );
  }

  // ====================================================
  // MAIN CART
  // ====================================================

  return (
    <>
      <Navbar />

      <Breadcrumb currentPage="Shopping Cart" />

      <div className="cart-page">

        <h1>Shopping Cart</h1>

        {/* ==================================================
            EMPTY CART
        ================================================== */}

        {cartItems.length === 0 ? (

          <div className="empty-cart">

            <h2>Your Cart is Empty</h2>

            <p>
              Add some products to your cart to continue shopping.
            </p>

            <Link
              to="/products"
              className="continue-btn"
            >
              Continue Shopping
            </Link>

          </div>

        ) : (

          <div className="cart-container">

            {/* ==================================================
                LEFT SIDE
            ================================================== */}

            <div className="cart-left">

              {cartItems.map((item) => {

                const image = getProductImageUrl(item.image);

                const price =
                  Number(item.new_price || 0);

                const quantity =
                  Number(item.quantity || 0);

                const subtotal =
                  price * quantity;

                return (
                  <div
                    className="cart-item"
                    key={item.id}
                  >

                    {/* ==================================================
                        PRODUCT IMAGE
                    ================================================== */}

                    <Link
                      to={`/product/${item.id}`}
                    >
                      <img
                        src={image}
                        alt={item.name}
                      />
                    </Link>

                    {/* ==================================================
                        PRODUCT INFORMATION
                    ================================================== */}

                    <div className="cart-info">

                      <Link
                        to={`/product/${item.id}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        <h3>
                          {item.name}
                        </h3>
                      </Link>

                      <p>
                        {item.description ||
                          item.desc ||
                          "Product"}
                      </p>

                      <h4>
                        ₹{price}
                      </h4>
                      {Number(item.stock || 0) <= 0 ? <p className="cart-stock-warning">Currently out of stock. Remove this item to continue.</p> : quantity > Number(item.stock) ? <p className="cart-stock-warning">Only {item.stock} available. Reduce quantity to continue.</p> : null}

                    </div>

                    {/* ==================================================
                        QUANTITY
                    ================================================== */}

                    <div className="qty-box">

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            quantity - 1
                          )
                        }
                        disabled={quantity <= 1}
                      >
                        -
                      </button>

                      <span>
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, quantity + 1)}
                        disabled={quantity >= Number(item.stock || 0)}
                        title={quantity >= Number(item.stock || 0) ? "No more stock available" : "Increase quantity"}
                      >
                        +
                      </button>

                    </div>

                    {/* ==================================================
                        SUBTOTAL
                    ================================================== */}

                    <div className="subtotal">
                      ₹{subtotal.toFixed(2)}
                    </div>

                    {/* ==================================================
                        REMOVE BUTTON
                    ================================================== */}

                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      Remove
                    </button>

                  </div>
                );
              })}

            </div>

            {/* ==================================================
                RIGHT SIDE - ORDER SUMMARY
            ================================================== */}

            <div className="cart-right">

              <h2>
                Order Summary
              </h2>

              {/* SUBTOTAL */}

              <div className="summary-row">

                <span>
                  Subtotal
                </span>

                <span>
                  ₹{Number(totalAmount).toFixed(2)}
                </span>

              </div>

              {/* SHIPPING */}

              <div className="summary-row">

                <span>
                  Shipping
                </span>

                <span>
                  Free
                </span>

              </div>

              {/* TOTAL */}

              <div className="summary-row total">

                <span>
                  Total
                </span>

                <span>
                  ₹{Number(totalAmount).toFixed(2)}
                </span>

              </div>

              {/* CHECKOUT */}

              <button
                type="button"
                className="checkout-btn"
                onClick={() =>
                  navigate("/checkout")
                }
              >
                Proceed To Checkout
              </button>

            </div>

          </div>

        )}

      </div>

      <Footer />
    </>
  );
};

export default Cart;