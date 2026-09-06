import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";

import { CartContext } from "../../Context/ShopContext";

// Product Images
import p1_img from "../../Components/assets/oil_seal_and_rubber_parts1.png";
import p2_img from "../../Components/assets/oil seal and rubber parts2.png";
import p3_img from "../../Components/assets/oil seal and rubber parts3.png";
import p4_img from "../../Components/assets/oil seal and rubber parts4.png";
import p5_img from "../../Components/assets/gear_part_1.png";
import p6_img from "../../Components/assets/rubber_ring1.webp";
import p7_img from "../../Components/assets/gear_part_2.png";
import p8_img from "../../Components/assets/Hydraulic Pump.jpeg";

import Navbar from "../../Components/Navbar/Navbar";
import Breadcrumb from "../../Components/Breadcrum/Breadcrum";
import Footer from "../../Components/Footer/Footer";

import "./Plp.css";

import toast from "react-hot-toast";

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

const Plp = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // ======================================================
  // CART / WISHLIST CONTEXT
  // ======================================================

  const {
    cartItems,
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useContext(CartContext);

  // ======================================================
  // URL PARAMETERS
  // ======================================================

  const urlSearch = searchParams.get("search") || "";
  const defaultCategory = searchParams.get("category") || "";
  const defaultBrand = searchParams.get("brand") || "";

  // ======================================================
  // FILTER STATES
  // ======================================================

  const [search, setSearch] = useState(urlSearch);
  const [brand, setBrand] = useState(defaultBrand);
  const [category, setCategory] = useState(defaultCategory);
  const [sort, setSort] = useState("");

  // ======================================================
  // PRODUCTS
  // ======================================================

  const [allProducts, setAllProducts] = useState([]);

  // ======================================================
  // LOADING
  // ======================================================

  const [loading, setLoading] = useState(true);

  // ======================================================
  // ERROR
  // ======================================================

  const [error, setError] = useState("");

  // ======================================================
  // KEEP SEARCH INPUT IN SYNC WITH URL
  // ======================================================

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  // ======================================================
  // FETCH PRODUCTS FROM BACKEND
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
        console.log("Products from Backend:", data);

        if (data.success) {
          setAllProducts(data.products || []);
        } else {
          setError("Unable to load products.");
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);

        setError(
          "Unable to connect with server. Please make sure Flask backend is running."
        );

        setLoading(false);
      });
  }, []);

  // ======================================================
  // GET UNIQUE BRANDS
  // ======================================================

  const brands = [
    ...new Set(
      allProducts
        .map((item) => item.brand)
        .filter(Boolean)
    ),
  ];

  // ======================================================
  // GET UNIQUE CATEGORIES
  // ======================================================

  const categories = [
    ...new Set(
      allProducts
        .map((item) => item.category)
        .filter(Boolean)
    ),
  ];

  // ======================================================
  // FILTER PRODUCTS
  // ======================================================

  let products = [...allProducts];

  products = products.filter((item) => {
    const productText = `
      ${item.name || ""}
      ${item.brand || ""}
      ${item.category || ""}
      ${item.description || ""}
      ${item.keywords || ""}
      ${item.model || ""}
      ${item.sku || ""}
    `.toLowerCase();

    // Search
    const searchTerm = search.trim().toLowerCase();

    const searchMatch =
      searchTerm === "" ||
      productText.includes(searchTerm);

    // Brand
    const brandMatch =
      brand === "" ||
      item.brand === brand;

    // Category
    const categoryMatch =
      category === "" ||
      category
        .split(",")
        .some((cat) =>
          (item.category || "")
            .toLowerCase()
            .includes(cat.trim().toLowerCase())
        );

    return (
      searchMatch &&
      brandMatch &&
      categoryMatch
    );
  });

  // ======================================================
  // SORT LOW TO HIGH
  // ======================================================

  if (sort === "low") {
    products.sort(
      (a, b) =>
        Number(a.new_price) - Number(b.new_price)
    );
  }

  // ======================================================
  // SORT HIGH TO LOW
  // ======================================================

  if (sort === "high") {
    products.sort(
      (a, b) =>
        Number(b.new_price) - Number(a.new_price)
    );
  }

  // ======================================================
  // SIDEBAR SEARCH
  // ======================================================

  const handleSidebarSearch = (value) => {
    setSearch(value);

    // Remove brand/category when searching
    setBrand("");
    setCategory("");

    if (value.trim() === "") {
      setSearchParams({});
    } else {
      setSearchParams({
        search: value,
      });
    }
  };

  // ======================================================
  // CLEAR SEARCH
  // ======================================================

  const clearSearch = () => {
    setSearch("");
    setBrand("");
    setCategory("");
    setSearchParams({});
  };

  // ======================================================
  // ADD TO WISHLIST
  // ======================================================

  const handleWishlist = async (product) => {
    const result = await addToWishlist(product);

    if (result?.requiresLogin) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    if (result?.success) {
      toast.success("❤️ Added to Wishlist!");
    }
  };

  // ======================================================
  // REMOVE FROM WISHLIST
  // ======================================================

  const handleRemoveWishlist = async (product) => {
    const result = await removeFromWishlist(product.id);

    if (result?.success) {
      toast.success("Removed from Wishlist");
    }
  };

  // ======================================================
  // ADD TO CART
  // ======================================================

  const handleAddToCart = async (product) => {
    const alreadyInCart = cartItems.some(
      (item) => item.id === product.id
    );

    if (alreadyInCart) {
      toast.error("Product already in cart!");
      return;
    }

    const result = await addToCart(product, 1);

    if (result?.requiresLogin) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    if (result?.success) {
      toast.success("🛒 Product Added To Cart!");

      // Backend automatically removes wishlist item.
      // Context also updates wishlist state.
    }
  };

  // ======================================================
  // PAGE TITLE
  // ======================================================

  let pageTitle = "All Products";

  if (search.trim() !== "") {
    pageTitle = `Search Results for "${search}"`;
  } else if (brand !== "") {
    pageTitle = `${brand} Products`;
  } else if (category !== "") {
    pageTitle = `${category.replace(/,/g, " & ")} Products`;
  }

  // ======================================================
  // RETURN UI
  // ======================================================

  return (
    <>
      <Navbar />

      <Breadcrumb currentPage="Products" />

      <div className="plp-container">

        {/* ==================================================
            SIDEBAR
        ================================================== */}

        <aside className="filters">

          <h2>Filters</h2>

          {/* Search */}

          <input
            type="text"
            placeholder="Search Product..."
            value={search}
            onChange={(e) =>
              handleSidebarSearch(e.target.value)
            }
          />

          {/* ==================================================
              BRAND
          ================================================== */}

          <label>Brand</label>

          <select
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);

              setSearch("");

              setSearchParams({
                brand: e.target.value,
              });
            }}
          >

            <option value="">
              All Brands
            </option>

            {brands.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}

          </select>

          {/* ==================================================
              CATEGORY
          ================================================== */}

          <label>Category</label>

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);

              setSearch("");

              setSearchParams({
                category: e.target.value,
              });
            }}
          >

            <option value="">
              All Categories
            </option>

            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}

          </select>

          {/* ==================================================
              SORT
          ================================================== */}

          <label>Sort By</label>

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
          >

            <option value="">
              Default
            </option>

            <option value="low">
              Price Low → High
            </option>

            <option value="high">
              Price High → Low
            </option>

          </select>

        </aside>

        {/* ==================================================
            PRODUCTS SECTION
        ================================================== */}

        <section className="products">

          {/* ==================================================
              PRODUCTS TOP
          ================================================== */}

          <div className="products-top">

            <div>

              <h2>
                {pageTitle}
              </h2>

              {search.trim() !== "" && (
                <p>
                  Showing results for:
                  <strong> "{search}"</strong>
                </p>
              )}

              {search.trim() === "" &&
                (brand !== "" || category !== "") && (

                  <p>

                    {brand !== "" &&
                      `Brand : ${brand}`}

                    {brand !== "" &&
                      category !== "" &&
                      " | "}

                    {category !== "" &&
                      `Category : ${category}`}

                  </p>

                )}

            </div>

            <p>
              {products.length} Products
            </p>

          </div>

          {/* ==================================================
              LOADING
          ================================================== */}

          {loading && (

            <div
              style={{
                width: "100%",
                textAlign: "center",
                padding: "60px 0",
              }}
            >

              <h2>
                Loading Products...
              </h2>

            </div>

          )}

          {/* ==================================================
              ERROR
          ================================================== */}

          {!loading && error && (

            <div
              style={{
                width: "100%",
                textAlign: "center",
                padding: "60px 0",
              }}
            >

              <h2>
                {error}
              </h2>

              <p>
                Check that Flask backend is running on port 5000.
              </p>

            </div>

          )}

          {/* ==================================================
              PRODUCTS
          ================================================== */}

          {!loading && !error && (

            <>
              {products.length > 0 ? (

                <div className="products-grid">

                  {products.map((item) => {

                    const wishlisted = isInWishlist(item.id);

                    const addedToCart = cartItems.some(
                      (cartItem) =>
                        cartItem.id === item.id
                    );

                    return (

                      <div
                        className="product-card"
                        key={item.id}
                      >

                        {/* BADGE */}

                        {item.badge && (
                          <span className="badge">
                            {item.badge}
                          </span>
                        )}

                        {/* ==================================================
                            WISHLIST BUTTON
                        ================================================== */}

                        <button
                          type="button"
                          className={`plp-wishlist-btn ${
                            wishlisted
                              ? "plp-wishlist-active"
                              : ""
                          }`}
                          onClick={() => {

                            if (wishlisted) {
                              handleRemoveWishlist(item);
                            } else {
                              handleWishlist(item);
                            }

                          }}
                          title={
                            wishlisted
                              ? "Remove from Wishlist"
                              : "Add to Wishlist"
                          }
                        >
                          {wishlisted ? "♥" : "♡"}
                        </button>

                        {/* IMAGE */}

                        <Link
                          to={`/product/${item.id}`}
                        >

                          <img
                            src={
                              productImages[item.image] ||
                              item.image
                            }
                            alt={item.name}
                          />

                        </Link>

                        {/* PRODUCT NAME */}

                        <Link
                          to={`/product/${item.id}`}
                          className="product-title"
                        >

                          <h3>
                            {item.name}
                          </h3>

                        </Link>

                        {/* DESCRIPTION */}

                        <p>
                          {item.description}
                        </p>

                        {/* BRAND */}

                        <div className="brand-name">
                          {item.brand}
                        </div>

                        {/* PRICE */}

                        <div className="price">

                          <span className="new-price">
                            ₹{item.new_price}
                          </span>

                          {item.old_price && (
                            <span className="old-price">
                              ₹{item.old_price}
                            </span>
                          )}

                        </div>

                        {/* BUTTONS */}

                        <div className="plp-card-buttons">

                          <Link
                            to={`/product/${item.id}`}
                            className="view-product-btn"
                          >
                            View Product
                          </Link>

                          <button
                            type="button"
                            className={`plp-cart-btn ${
                              addedToCart
                                ? "plp-cart-added"
                                : ""
                            }`}
                            onClick={() =>
                              handleAddToCart(item)
                            }
                            disabled={addedToCart}
                          >
                            {addedToCart
                              ? "✓ In Cart"
                              : "🛒 Add to Cart"}
                          </button>

                        </div>

                      </div>

                    );

                  })}

                </div>

              ) : (

                /* ==================================================
                   NO SEARCH RESULTS
                ================================================== */

                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    padding: "60px 20px",
                  }}
                >

                  <h2>
                    No Products Found
                  </h2>

                  {search.trim() !== "" ? (

                    <>
                      <p>
                        We couldn't find any product matching
                        <strong> "{search}"</strong>.
                      </p>

                      <button
                        type="button"
                        onClick={clearSearch}
                        style={{
                          marginTop: "20px",
                          padding: "12px 25px",
                          border: "none",
                          background: "#1f5d24",
                          color: "#fff",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontSize: "16px",
                        }}
                      >
                        View All Products
                      </button>
                    </>

                  ) : (

                    <p>
                      Try changing filters.
                    </p>

                  )}

                </div>

              )}

            </>

          )}

        </section>

      </div>

      <Footer />

    </>
  );
};

export default Plp;