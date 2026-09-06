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

import "./RelatedProducts.css";

import p1_img from "../../Components/assets/oil_seal_and_rubber_parts1.png";
import p2_img from "../../Components/assets/oil seal and rubber parts2.png";
import p3_img from "../../Components/assets/oil seal and rubber parts3.png";
import p4_img from "../../Components/assets/oil seal and rubber parts4.png";
import p5_img from "../../Components/assets/gear_part_1.png";
import p6_img from "../../Components/assets/rubber_ring1.webp";
import p7_img from "../../Components/assets/gear_part_2.png";
import p8_img from "../../Components/assets/Hydraulic Pump.jpeg";


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


const RelatedProducts = ({
  currentProduct,
}) => {

  const navigate =
    useNavigate();


  // ======================================================
  // CONTEXT
  // ======================================================

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useContext(
    CartContext
  );


  // ======================================================
  // STATE
  // ======================================================

  const [
    relatedProducts,
    setRelatedProducts,
  ] = useState([]);


  const [loading, setLoading] =
    useState(true);


  // ======================================================
  // FETCH RELATED PRODUCTS
  // ======================================================

  useEffect(() => {

    if (!currentProduct?.id) {
      return;
    }


    setLoading(true);


    fetch(
      `http://127.0.0.1:5000/api/products/${currentProduct.id}/related`
    )

      .then((response) => {

        if (!response.ok) {

          throw new Error(
            "Failed to fetch related products"
          );

        }

        return response.json();

      })

      .then((data) => {

        console.log(
          "Related Products:",
          data
        );


        if (data.success) {

          setRelatedProducts(
            data.products || []
          );

        } else {

          setRelatedProducts([]);

        }


        setLoading(false);

      })

      .catch((error) => {

        console.error(
          "Related Products API Error:",
          error
        );


        setRelatedProducts([]);

        setLoading(false);

      });

  }, [currentProduct]);


  // ======================================================
  // WISHLIST
  // ======================================================

  const handleWishlist = async (
    product
  ) => {

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

      <section className="related-products">

        <h2>
          Related Products
        </h2>

        <p>
          Loading related products...
        </p>

      </section>

    );

  }


  // ======================================================
  // EMPTY
  // ======================================================

  if (
    relatedProducts.length === 0
  ) {

    return null;

  }


  // ======================================================
  // RETURN
  // ======================================================

  return (

    <section className="related-products">

      <h2>
        Related Products
      </h2>


      <div className="related-grid">

        {relatedProducts.map(
          (item) => {

            const image =
              productImages[
                item.image
              ] ||
              item.image;


            const active =
              isInWishlist(
                item.id
              );


            return (

              <div
                className="related-card"
                key={item.id}
              >


                {/* ==================================================
                    WISHLIST HEART
                ================================================== */}

                <button
                  type="button"
                  className={
                    active
                      ? "related-wishlist active"
                      : "related-wishlist"
                  }
                  onClick={() =>
                    handleWishlist(
                      item
                    )
                  }
                  aria-label={
                    active
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                >
                  {active
                    ? "♥"
                    : "♡"}
                </button>


                {/* IMAGE */}

                <Link
                  to={`/product/${item.id}`}
                >

                  <img
                    src={image}
                    alt={item.name}
                  />

                </Link>


                {/* NAME */}

                <Link
                  to={`/product/${item.id}`}
                >

                  <h3>
                    {item.name}
                  </h3>

                </Link>


                {/* BRAND */}

                <p>
                  {item.brand}
                </p>


                {/* PRICE */}

                <div className="related-price">

                  <span className="new-price">
                    ₹{item.new_price}
                  </span>


                  {item.old_price && (

                    <span className="old-price">
                      ₹{item.old_price}
                    </span>

                  )}

                </div>


                {/* VIEW */}

                <Link
                  to={`/product/${item.id}`}
                  className="view-btn"
                >
                  View Product
                </Link>

              </div>

            );

          }
        )}

      </div>

    </section>

  );

};


export default RelatedProducts;
