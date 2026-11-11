import { getProductImageUrl } from "../../utils/productImage.js";
import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  CartContext,
} from "../../Context/ShopContext";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Breadcrumb from "../../Components/Breadcrum/Breadcrum";
import ProductTabs from "../../Pages/Pdp/ProductTabs";
import RelatedProducts from "../../Pages/Pdp/RelatedProducts";

import toast from "react-hot-toast";

import "./Pdp.css";


// ======================================================
// IMAGE MAPPING
// ======================================================

// ======================================================
// COMPONENT
// ======================================================

const Pdp = () => {

  const { id } = useParams();

  const navigate = useNavigate();


  // ======================================================
  // CART + WISHLIST
  // ======================================================

  const {
    user,
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useContext(CartContext);


  // ======================================================
  // PRODUCT
  // ======================================================

  const [product, setProduct] =
    useState(null);


  // ======================================================
  // LOADING
  // ======================================================

  const [loading, setLoading] =
    useState(true);


  // ======================================================
  // ERROR
  // ======================================================

  const [error, setError] =
    useState("");


  // ======================================================
  // QUANTITY
  // ======================================================

  const [qty, setQty] =
    useState(1);


  // ======================================================
  // TAB
  // ======================================================

  const [tab, setTab] =
    useState("description");


  // ======================================================
  // MAIN IMAGE
  // ======================================================

  const [mainImage, setMainImage] =
    useState("");


  // ======================================================
  // FETCH PRODUCT
  // ======================================================

  useEffect(() => {

    setLoading(true);

    setError("");

    setProduct(null);


    fetch(
      `http://127.0.0.1:5000/api/products/${id}`
    )

      .then((response) => {

        if (response.status === 404) {
          throw new Error(
            "Product not found"
          );
        }

        if (!response.ok) {
          throw new Error(
            "Failed to fetch product"
          );
        }

        return response.json();

      })

      .then((data) => {

        console.log(
          "Product from Backend:",
          data
        );


        if (
          data.success &&
          data.product
        ) {

          setProduct(
            data.product
          );


          const image = getProductImageUrl(data.product.image);


          setMainImage(image);

        } else {

          setError(
            "Product not found."
          );

        }


        setLoading(false);

      })

      .catch((err) => {

        console.error(
          "PDP API Error:",
          err
        );


        setError(
          err.message ===
            "Product not found"
            ? "Product Not Found"
            : "Unable to connect with server."
        );


        setLoading(false);

      });

  }, [id]);


  // ======================================================
  // ADD TO CART
  // ======================================================

  const handleRestockReminder = async () => {
    if (!user?.id) { toast.error("Please login to request a restock reminder."); navigate("/login"); return; }
    try {
      const response = await fetch("http://127.0.0.1:5000/api/stock-alerts/subscribe", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, product_id: product.id })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not request reminder.");
      toast.success(data.message);
    } catch (error) { toast.error(error.message); }
  };

  const handleAddToCart = async () => {
    if (Number(product?.stock || 0) <= 0) { toast.error("This product is currently out of stock."); return; }
    if (qty > Number(product.stock)) { toast.error(`Only ${product.stock} units are available.`); return; }

    const result =
      await addToCart(
        product,
        qty
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
  // WISHLIST
  // ======================================================

  const handleWishlist = async () => {

    if (!product) {
      return;
    }


    // ================================================
    // REMOVE
    // ================================================

    if (
      isInWishlist(product.id)
    ) {

      await removeFromWishlist(
        product.id
      );

      toast.success(
        "Removed from Wishlist"
      );

      return;
    }


    // ================================================
    // ADD
    // ================================================

    const result =
      await addToWishlist(
        product
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
        "❤️ Added to Wishlist!"
      );

    } else {

      toast.error(
        "Unable to add to Wishlist."
      );

    }

  };


  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {

    return (
      <>
        <Navbar />

        <div
          style={{
            textAlign: "center",
            padding: "100px 20px",
          }}
        >
          <h2>
            Loading Product...
          </h2>
        </div>

        <Footer />
      </>
    );

  }


  // ======================================================
  // ERROR
  // ======================================================

  if (
    error ||
    !product
  ) {

    return (
      <>
        <Navbar />

        <div
          style={{
            textAlign: "center",
            padding: "100px 20px",
          }}
        >
          <h2>
            {error ||
              "Product Not Found"}
          </h2>
        </div>

        <Footer />
      </>
    );

  }


  // ======================================================
  // DISCOUNT
  // ======================================================

  const discount =
    product.old_price &&
    product.old_price >
      product.new_price
      ? Math.round(
          (
            (
              product.old_price -
              product.new_price
            ) /
            product.old_price
          ) *
            100
        )
      : 0;


  // ======================================================
  // IMAGE
  // ======================================================

  const image = getProductImageUrl(product.image);


  // ======================================================
  // WISHLIST STATUS
  // ======================================================

  const wishlistActive =
    isInWishlist(product.id);


  // ======================================================
  // RETURN
  // ======================================================

  return (
    <>
      <Navbar />

      <Breadcrumb
        currentPage={product.name}
      />


      <div className="pdp-container">


        {/* ==================================================
            TOP SECTION
        ================================================== */}

        <div className="pdp-top">


          {/* ==================================================
              LEFT
          ================================================== */}

          <div className="pdp-left">


            {/* MAIN IMAGE */}

            <div className="main-image">

              <img
                src={
                  mainImage ||
                  image
                }
                alt={product.name}
              />

            </div>


            {/* THUMBNAILS */}

            <div className="thumbnail-list">

              {[1, 2, 3, 4].map(
                (item, index) => (

                  <div
                    className="thumbnail"
                    key={index}
                    onClick={() =>
                      setMainImage(image)
                    }
                  >

                    <img
                      src={image}
                      alt={`${product.name} ${
                        index + 1
                      }`}
                    />

                  </div>

                )
              )}

            </div>

          </div>


          {/* ==================================================
              RIGHT
          ================================================== */}

          <div className="pdp-right">


            {/* PRODUCT NAME */}

            <h1>
              {product.name}
            </h1>


            {/* PRODUCT CODE */}

            <div className="product-code">

              Product Code :{" "}

              {product.sku
                ? product.sku
                : `MT-${product.id}`}

            </div>


            {/* RATING */}

            <div className="rating">

              <div className="stars">
                ★★★★★
              </div>

              <span className="review-count">
                (24 Reviews)
              </span>

            </div>


            {/* PRICE */}

            <div className="price-box">

              <div className="new-price">
                ₹{product.new_price}
              </div>


              {product.old_price && (

                <div className="old-price">
                  ₹{product.old_price}
                </div>

              )}


              {discount > 0 && (

                <div className="discount">
                  {discount}% OFF
                </div>

              )}

            </div>


            {/* DESCRIPTION */}

            <p className="description">
              {product.description}
            </p>


            {/* PRODUCT HIGHLIGHTS */}

            <div className="product-details">

              <h3>
                Product Highlights
              </h3>


              <ul>

                {product.features &&
                Array.isArray(
                  product.features
                ) &&
                product.features.length >
                  0 ? (

                  product.features.map(
                    (
                      feature,
                      index
                    ) => (

                      <li key={index}>
                        {feature}
                      </li>

                    )
                  )

                ) : (

                  <>
                    <li>
                      Premium Quality Material
                    </li>

                    <li>
                      OEM Standard Manufacturing
                    </li>

                    <li>
                      Long Service Life
                    </li>

                    <li>
                      Rust Resistant Finish
                    </li>

                    <li>
                      Perfect Tractor Fitment
                    </li>
                  </>

                )}

              </ul>

            </div>


            {/* QUANTITY */}

            {Number(product.stock || 0) <= 0 && (
              <div className="pdp-stock-message" role="status">
                <strong>Currently unavailable</strong>
                <span>This product is out of stock. You cannot order it right now.</span>
                <button type="button" onClick={handleRestockReminder}>Notify me when available</button>
              </div>
            )}

            <div className="quantity">

              <h4>
                Quantity
              </h4>


              <div className="qty-box">

                <button
                  type="button"
                  onClick={() =>
                    qty > 1 &&
                    setQty(qty - 1)
                  }
                >
                  -
                </button>


                <span>
                  {qty}
                </span>


                <button
                  type="button"
                  onClick={() => setQty(Math.min(qty + 1, Number(product.stock || 0)))}
                  disabled={qty >= Number(product.stock || 0)}
                >
                  +
                </button>

              </div>

            </div>


            {/* ==================================================
                ACTION BUTTONS
            ================================================== */}

            <div className="action-buttons">


              <button
                type="button"
                className="cart-btn"
                onClick={handleAddToCart}
                disabled={Number(product.stock || 0) <= 0}
              >
                🛒 Add To Cart
              </button>


              <button
                type="button"
                className={
                  wishlistActive
                    ? "pdp-wishlist-btn active"
                    : "pdp-wishlist-btn"
                }
                onClick={
                  handleWishlist
                }
              >

                {wishlistActive
                  ? "♥ In Wishlist"
                  : "♡ Add to Wishlist"}

              </button>


              <button
                type="button"
                className="buy-btn"
                onClick={handleAddToCart}
                disabled={Number(product.stock || 0) <= 0}
              >
                Buy Now
              </button>

            </div>

          </div>

        </div>


        {/* PRODUCT TABS */}

        <ProductTabs
          product={product}
        />


        {/* RELATED PRODUCTS */}

        <RelatedProducts
          currentProduct={product}
        />

      </div>


      <Footer />

    </>
  );
};


export default Pdp;

