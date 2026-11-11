import React, { useEffect, useState } from "react";
import {
  useSearchParams,
} from "react-router-dom";

import Navbar from "../../Components/Navbar/Navbar";
import Breadcrumb from "../../Components/Breadcrum/Breadcrum";
import Footer from "../../Components/Footer/Footer";
import Items from "../../Components/Items/Items";

import "./Plp.css";

const Plp = () => {
  const [searchParams, setSearchParams] =
    useSearchParams();

  // ======================================================
  // URL PARAMETERS
  // ======================================================

  const urlSearch =
    searchParams.get("search") || "";

  const urlCategory =
    searchParams.get("category") || "";

  const urlBrand =
    searchParams.get("brand") || "";

  // ======================================================
  // FILTER STATES
  // ======================================================

  const [search, setSearch] =
    useState(urlSearch);

  const [brand, setBrand] =
    useState(urlBrand);

  const [category, setCategory] =
    useState(urlCategory);

  const [sort, setSort] =
    useState("");

  // ======================================================
  // PRODUCTS
  // ======================================================

  const [allProducts, setAllProducts] =
    useState([]);

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
  // IMPORTANT:
  // KEEP FILTER STATES IN SYNC WITH URL
  // ======================================================

  useEffect(() => {
    const newSearch =
      searchParams.get("search") || "";

    const newCategory =
      searchParams.get("category") || "";

    const newBrand =
      searchParams.get("brand") || "";

    setSearch(newSearch);
    setCategory(newCategory);
    setBrand(newBrand);
  }, [searchParams]);

  // ======================================================
  // FETCH PRODUCTS FROM BACKEND
  // ======================================================

  useEffect(() => {
    fetch(
      "http://127.0.0.1:5000/api/products/"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to fetch products"
          );
        }

        return response.json();
      })
      .then((data) => {
        console.log(
          "Products from Backend:",
          data
        );

        if (data.success) {
          setAllProducts(
            data.products || []
          );
        } else {
          setError(
            "Unable to load products."
          );
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "API Error:",
          err
        );

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

  let products = [
    ...allProducts,
  ];

  products = products.filter(
    (item) => {
      const productText = `
        ${item.name || ""}
        ${item.brand || ""}
        ${item.category || ""}
        ${item.description || ""}
        ${item.keywords || ""}
        ${item.model || ""}
        ${item.sku || ""}
      `.toLowerCase();

      // ================================
      // SEARCH
      // ================================

      const searchTerm =
        search
          .trim()
          .toLowerCase();

      const searchMatch =
        searchTerm === "" ||
        productText.includes(
          searchTerm
        );

      // ================================
      // BRAND
      // ================================

      const brandMatch =
        brand === "" ||
        (item.brand || "")
          .toLowerCase() ===
          brand.toLowerCase();

      // ================================
      // CATEGORY
      // ================================

      const categoryMatch =
        category === "" ||
        category
          .split(",")
          .some((cat) =>
            (item.category || "")
              .toLowerCase()
              .includes(
                cat
                  .trim()
                  .toLowerCase()
              )
          );

      return (
        searchMatch &&
        brandMatch &&
        categoryMatch
      );
    }
  );

  // ======================================================
  // SORT LOW TO HIGH
  // ======================================================

  if (sort === "low") {
    products.sort(
      (a, b) =>
        Number(a.new_price) -
        Number(b.new_price)
    );
  }

  // ======================================================
  // SORT HIGH TO LOW
  // ======================================================

  if (sort === "high") {
    products.sort(
      (a, b) =>
        Number(b.new_price) -
        Number(a.new_price)
    );
  }

  // ======================================================
  // SIDEBAR SEARCH
  // ======================================================

  const handleSidebarSearch = (
    value
  ) => {
    setSearch(value);

    // Search removes brand/category
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
  // PAGE TITLE
  // ======================================================

  let pageTitle =
    "All Products";

  if (search.trim() !== "") {
    pageTitle =
      `Search Results for "${search}"`;
  } else if (brand !== "") {
    pageTitle =
      `${brand} Products`;
  } else if (category !== "") {
    pageTitle =
      `${category.replace(
        /,/g,
        " & "
      )} Products`;
  }

  // ======================================================
  // RETURN UI
  // ======================================================

  return (
    <>
      <Navbar />

      <Breadcrumb
        currentPage="Products"
      />

      <div className="plp-container">

        {/* ==================================================
            SIDEBAR
        ================================================== */}

        <aside className="filters">

          <h2>Filters</h2>

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search Product..."
            value={search}
            onChange={(e) =>
              handleSidebarSearch(
                e.target.value
              )
            }
          />

          {/* ==================================================
              BRAND
          ================================================== */}

          <label>
            Brand
          </label>

          <select
            value={brand}
            onChange={(e) => {
              const selectedBrand =
                e.target.value;

              setBrand(
                selectedBrand
              );

              // Remove category
              setCategory("");

              // Remove search
              setSearch("");

              if (
                selectedBrand === ""
              ) {
                setSearchParams({});
              } else {
                setSearchParams({
                  brand:
                    selectedBrand,
                });
              }
            }}
          >
            <option value="">
              All Brands
            </option>

            {brands.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>

          {/* ==================================================
              CATEGORY
          ================================================== */}

          <label>
            Category
          </label>

          <select
            value={category}
            onChange={(e) => {
              const selectedCategory =
                e.target.value;

              setCategory(
                selectedCategory
              );

              // Remove brand
              setBrand("");

              // Remove search
              setSearch("");

              if (
                selectedCategory === ""
              ) {
                setSearchParams({});
              } else {
                setSearchParams({
                  category:
                    selectedCategory,
                });
              }
            }}
          >
            <option value="">
              All Categories
            </option>

            {categories.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>

          {/* ==================================================
              SORT
          ================================================== */}

          <label>
            Sort By
          </label>

          <select
            value={sort}
            onChange={(e) =>
              setSort(
                e.target.value
              )
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
                  <strong>
                    {" "}
                    "{search}"
                  </strong>
                </p>
              )}

              {search.trim() === "" &&
                (brand !== "" ||
                  category !== "") && (
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
                Check that Flask backend
                is running on port 5000.
              </p>
            </div>
          )}

          {/* ==================================================
              PRODUCTS
          ================================================== */}

          {!loading &&
            !error && (
              <>
                {products.length > 0 ? (
                  <div className="products-grid">

                    {products.map(
                      (item) => {
                        const resolvedProduct = item;

                        return (
                          <Items
                            key={item.id}
                            product={
                              resolvedProduct
                            }
                          />
                        );
                      }
                    )}

                  </div>
                ) : (

                  /* ==================================================
                     NO PRODUCTS
                  ================================================== */

                  <div
                    style={{
                      width: "100%",
                      textAlign: "center",
                      padding:
                        "60px 20px",
                    }}
                  >

                    <h2>
                      No Products Found
                    </h2>

                    {search.trim() !== "" ? (
                      <>
                        <p>
                          We couldn't
                          find any
                          product
                          matching
                          <strong>
                            {" "}
                            "{search}"
                          </strong>
                          .
                        </p>

                        <button
                          type="button"
                          onClick={
                            clearSearch
                          }
                          style={{
                            marginTop:
                              "20px",
                            padding:
                              "12px 25px",
                            border:
                              "none",
                            background:
                              "#1f5d24",
                            color:
                              "#fff",
                            borderRadius:
                              "8px",
                            cursor:
                              "pointer",
                            fontSize:
                              "16px",
                          }}
                        >
                          View All
                          Products
                        </button>
                      </>
                    ) : (
                      <p>
                        Try changing
                        filters.
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
