import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Breadcrumb from "../../Components/Breadcrum/Breadcrum";

import { CartContext } from "../../Context/ShopContext";

import "./Checkout.css";

const Checkout = () => {

  const { cartItems, totalAmount } = useContext(CartContext);

  return (
    <>
      <Navbar />

      <Breadcrumb currentPage="Checkout" />

      <div className="checkout-page">

        <div className="checkout-left">

          <h2>Checkout</h2>

          {/* Contact */}

          <div className="checkout-card">

            <h3>Contact Information</h3>

            <input type="text" placeholder="Full Name" />

            <input type="email" placeholder="Email Address" />

            <input type="text" placeholder="Phone Number" />

          </div>

          {/* Shipping */}

          <div className="checkout-card">

            <h3>Shipping Address</h3>

            <input type="text" placeholder="Address" />

            <input type="text" placeholder="City" />

            <input type="text" placeholder="State" />

            <input type="text" placeholder="Pincode" />

          </div>

          {/* Shipping Method */}

          <div className="checkout-card">

            <h3>Shipping Method</h3>

            <label>

              <input
                type="radio"
                name="shipping"
                defaultChecked
              />

              Standard Delivery (Free)

            </label>

            <label>

              <input
                type="radio"
                name="shipping"
              />

              Express Delivery (+₹150)

            </label>

          </div>

          {/* Payment */}

          <div className="checkout-card">

            <h3>Payment Method</h3>

            <label>

              <input
                type="radio"
                name="payment"
                defaultChecked
              />

              Cash on Delivery

            </label>

            <label>

              <input
                type="radio"
                name="payment"
              />

              Credit / Debit Card

            </label>

            <label>

              <input
                type="radio"
                name="payment"
              />

              UPI

            </label>

          </div>

        </div>

        {/* Right */}

        <div className="checkout-right">

          <h2>Order Summary</h2>

          {cartItems.map((item) => (

            <div
              className="summary-item"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div>

                <h4>{item.name}</h4>

                <p>
                  Qty : {item.quantity}
                </p>

              </div>

              <span>

                ₹
                {item.quantity * item.new_price}

              </span>

            </div>

          ))}

          <hr />

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

          <button className="place-order">

            Place Order

          </button>

          <Link
            to="/cart"
            className="back-cart"
          >

            ← Back To Cart

          </Link>

        </div>

      </div>

      <Footer />

    </>
  );
};

export default Checkout;