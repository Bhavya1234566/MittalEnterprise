import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

import Navbar from "../../Components/Navbar/Navbar";
import Breadcrumb from "../../Components/Breadcrum/Breadcrum";
import Footer from "../../Components/Footer/Footer";
import all_products from "../../Components/assets/all_products";

import "./Plp.css";

const Plp = () => {

  const [searchParams] = useSearchParams();

  const defaultCategory = searchParams.get("category") || "";
  const defaultBrand = searchParams.get("brand") || "";

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState(defaultBrand);
  const [category, setCategory] = useState(defaultCategory);
  const [sort, setSort] = useState("");

  const brands = [
    ...new Set(
      all_products
        .map((item) => item.brand)
        .filter(Boolean)
    ),
  ];

  const categories = [
    ...new Set(
      all_products
        .map((item) => item.category)
        .filter(Boolean)
    ),
  ];

  let products = [...all_products];

  products = products.filter((item) => {

    const productText = `
      ${item.name}
      ${item.brand}
      ${item.category}
      ${item.desc}
    `.toLowerCase();

    const searchMatch =
      search === "" ||
      productText.includes(search.toLowerCase());

    const brandMatch =
      brand === "" ||
      item.brand === brand;

    const categoryMatch =
      category === "" ||
      category
        .split(",")
        .some((cat) =>
          item.category
            .toLowerCase()
            .includes(cat.trim().toLowerCase())
        );

    return (
      searchMatch &&
      brandMatch &&
      categoryMatch
    );

  });

  if (sort === "low") {
    products.sort(
      (a, b) => a.new_price - b.new_price
    );
  }

  if (sort === "high") {
    products.sort(
      (a, b) => b.new_price - a.new_price
    );
  }

  return (
    <>
      <Navbar />

      <Breadcrumb currentPage="Products" />

      <div className="plp-container">

        {/* Sidebar */}

        <aside className="filters">

          <h2>Filters</h2>

          <input
            type="text"
            placeholder="Search Product..."
            value={search}
            onChange={(e) => {

              setSearch(e.target.value);

              if (defaultCategory !== "") {
                setCategory("");
              }

              if (defaultBrand !== "") {
                setBrand("");
              }

            }}
          />

          {/* Brand */}

          <label>Brand</label>

          <select
            value={brand}
            onChange={(e) =>
              setBrand(e.target.value)
            }
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

          {/* Category */}

          <label>Category</label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
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

          {/* Sort */}

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

        {/* Products */}

        <section className="products">

          <div className="products-top">

            <div>

              <h2>

                {brand !== ""
                  ? `${brand} Products`
                  : category !== ""
                  ? `${category.replace(/,/g, " & ")} Products`
                  : "All Products"}

              </h2>

              {(brand !== "" || category !== "") && (
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

          <div className="products-grid">

            {products.length > 0 ? (

              products.map((item) => (

                <div
                  className="product-card"
                  key={item.id}
                >

                  {item.badge && (
                    <span className="badge">
                      {item.badge}
                    </span>
                  )}

                  <Link
                    to={`/product/${item.id}`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  </Link>

                  <Link
                    to={`/product/${item.id}`}
                    className="product-title"
                  >
                    <h3>{item.name}</h3>
                  </Link>

                  <p>{item.desc}</p>

                  <div className="brand-name">
                    {item.brand}
                  </div>

                  <div className="price">

                    <span className="new-price">
                      ₹{item.new_price}
                    </span>

                    <span className="old-price">
                      ₹{item.old_price}
                    </span>

                  </div>

                  <Link
                    to={`/product/${item.id}`}
                    className="view-product-btn"
                  >
                    View Product
                  </Link>

                </div>

              ))

            ) : (

              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  padding: "60px 0",
                }}
              >

                <h2>
                  No Products Found
                </h2>

                <p>
                  Try changing filters.
                </p>

              </div>

            )}

          </div>

        </section>

      </div>

      <Footer />
    </>
  );
};

export default Plp;