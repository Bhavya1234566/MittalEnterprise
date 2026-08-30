import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Breadcrumb from "../../Components/Breadcrum/Breadcrum";

import { CartContext } from "../../Context/ShopContext";

import "./Cart.css";

const Cart = () => {

  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalAmount,
  } = useContext(CartContext);

  return (
    <>
      <Navbar />

      <Breadcrumb currentPage="Shopping Cart" />

      <div className="cart-page">

        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (

          <div className="empty-cart">

            <h2>Your Cart is Empty</h2>

            <Link to="/products" className="continue-btn">
              Continue Shopping
            </Link>

          </div>

        ) : (

          <div className="cart-container">

            {/* Left */}

            <div className="cart-left">

              {cartItems.map((item) => (

                <div
                  className="cart-item"
                  key={item.id}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-info">

                    <h3>{item.name}</h3>

                    <p>{item.desc}</p>

                    <h4>₹{item.new_price}</h4>

                  </div>

                  <div className="qty-box">

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity - 1
                        )
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                  <div className="subtotal">

                    ₹
                    {item.new_price * item.quantity}

                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

            {/* Right */}

            <div className="cart-right">

              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className="summary-row total">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>

              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
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