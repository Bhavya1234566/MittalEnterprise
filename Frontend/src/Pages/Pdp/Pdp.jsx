import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../Context/ShopContext";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Breadcrumb from "../../Components/Breadcrum/Breadcrum";
import ProductTabs from "../../Pages/Pdp/ProductTabs";
import all_products from "../../Components/assets/all_products";
import RelatedProducts from "../../Pages//Pdp/RelatedProducts";

import "./Pdp.css";

const Pdp = () => {

  const { id } = useParams();

  const product = all_products.find(
    (item) => item.id === Number(id)
  );

  const [qty, setQty] = useState(1);

  const [tab, setTab] = useState("description");

  const [mainImage, setMainImage] = useState(
    product?.image
  );

  if (!product) {
    return <h2>Product Not Found</h2>;
  }


  const discount = Math.round(
    ((product.old_price - product.new_price) /
      product.old_price) *
      100
  );

  const { addToCart } = useContext(CartContext);

  return (
    <>

      <Navbar />

      <Breadcrumb currentPage={product.name} />

      <div className="pdp-container">

        <div className="pdp-top">

          {/* LEFT */}

          <div className="pdp-left">

            <div className="main-image">

              <img
                src={mainImage}
                alt={product.name}
              />

            </div>

            <div className="thumbnail-list">

              {[1,2,3,4].map((item,index)=>(
                <div
                  className="thumbnail"
                  key={index}
                  onClick={()=>setMainImage(product.image)}
                >
                  <img
                    src={product.image}
                    alt=""
                  />
                </div>
              ))}

            </div>

          </div>

          {/* RIGHT */}

          <div className="pdp-right">

            <h1>{product.name}</h1>

            <div className="product-code">

              Product Code :
              {" "}
              MT-{product.id}

            </div>

            <div className="rating">

              <div className="stars">

                ★★★★★

              </div>

              <span className="review-count">

                (24 Reviews)

              </span>

            </div>

            <div className="price-box">

              <div className="new-price">

                ₹{product.new_price}

              </div>

              <div className="old-price">

                ₹{product.old_price}

              </div>

              <div className="discount">

                {discount}% OFF

              </div>

            </div>

            <p className="description">

              {product.desc}

            </p>

            <div className="product-details">

              <h3>Product Highlights</h3>

              <ul>

                <li>Premium Quality Material</li>

                <li>OEM Standard Manufacturing</li>

                <li>Long Service Life</li>

                <li>Rust Resistant Finish</li>

                <li>Perfect Tractor Fitment</li>

              </ul>

            </div>

            <div className="quantity">

              <h4>Quantity</h4>

              <div className="qty-box">

                <button
                  onClick={() =>
                    qty > 1 && setQty(qty - 1)
                  }
                >
                  -
                </button>

                <span>{qty}</span>

                <button
                  onClick={() =>
                    setQty(qty + 1)
                  }
                >
                  +
                </button>

              </div>

            </div>

            <div className="action-buttons">

              <button
  className="cart-btn"
  onClick={() => addToCart(product, qty)}
>
  Add To Cart
</button>

              <button className="buy-btn">

                Buy Now

              </button>

            </div>

          </div>

        </div>

        {/* TABS */}

        
            
      <ProductTabs product={product} />

<RelatedProducts currentProduct={product} />

        


      </div>

      <Footer />

    </>
  );
};

export default Pdp;