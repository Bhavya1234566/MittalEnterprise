import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavCategory.css";

const categories = [
  "Gear Parts",
  "Oil Seal",
  "Nuts & Bolts",
  "Filters",
  "Bearings",
];

const brands = [
  "Mahindra",
  "John Deere",
  "Sonalika",
  "New Holland",
  "Swaraj",
];

const NavLinks = ({
  openDropdown,
  toggleDropdown,
  closeMobile,
}) => {
  const navigate = useNavigate();

  // ================================
  // CATEGORY CLICK
  // ================================

  const handleCategoryClick = (category) => {
    closeMobile();

    navigate(
      `/products?category=${encodeURIComponent(category)}`
    );
  };

  // ================================
  // BRAND CLICK
  // ================================

  const handleBrandClick = (brand) => {
    closeMobile();

    navigate(
      `/products?brand=${encodeURIComponent(brand)}`
    );
  };

  return (
    <>
      {/* ================================
          HOME
      ================================= */}

      <li className="navcategory__item">
        <Link
          className="navcategory__link"
          to="/"
          onClick={closeMobile}
        >
          Home
        </Link>
      </li>

      {/* ================================
          SHOP BY CATEGORY
      ================================= */}

      <li className="navcategory__item">
        <button
          type="button"
          className="navcategory__link"
          onClick={() =>
            toggleDropdown("category")
          }
        >
          Shop by Category

          <svg
            className={`navcategory__chevron${
              openDropdown === "category"
                ? " open"
                : ""
            }`}
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <path
              d="M2 4l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {openDropdown === "category" && (
          <ul className="navcategory__dropdown">
            {categories.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  className="navcategory__dropdown-item"
                  onClick={() =>
                    handleCategoryClick(category)
                  }
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        )}
      </li>

      {/* ================================
          SHOP BY BRAND
      ================================= */}

      <li className="navcategory__item">
        <button
          type="button"
          className="navcategory__link"
          onClick={() =>
            toggleDropdown("brand")
          }
        >
          Shop by Brand

          <svg
            className={`navcategory__chevron${
              openDropdown === "brand"
                ? " open"
                : ""
            }`}
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <path
              d="M2 4l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {openDropdown === "brand" && (
          <ul className="navcategory__dropdown">
            {brands.map((brand) => (
              <li key={brand}>
                <button
                  type="button"
                  className="navcategory__dropdown-item"
                  onClick={() =>
                    handleBrandClick(brand)
                  }
                >
                  {brand}
                </button>
              </li>
            ))}
          </ul>
        )}
      </li>
    </>
  );
};

const NavCategory = ({
  mobileInline = false,
}) => {
  const [openDropdown, setOpenDropdown] =
    useState(null);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  // ================================
  // TOGGLE DROPDOWN
  // ================================

  const toggleDropdown = (name) => {
    setOpenDropdown((current) =>
      current === name ? null : name
    );
  };

  // ================================
  // CLOSE EVERYTHING
  // ================================

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  // ================================
  // MOBILE / TABLET
  // ================================

  if (mobileInline) {
    return (
      <div className="navcategory-mobile-slot">
        <button
          type="button"
          className="navcategory-toggle"
          onClick={() =>
            setMobileOpen(
              (current) => !current
            )
          }
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {mobileOpen && (
          <>
            <div
              className="navcategory-overlay"
              onClick={closeMobile}
            />

            <ul className="navcategory navcategory--drawer">
              <NavLinks
                openDropdown={openDropdown}
                toggleDropdown={
                  toggleDropdown
                }
                closeMobile={closeMobile}
              />
            </ul>
          </>
        )}
      </div>
    );
  }

  // ================================
  // DESKTOP
  // ================================

  return (
    <nav className="navcategory-wrapper">
      <ul className="navcategory">
        <NavLinks
          openDropdown={openDropdown}
          toggleDropdown={
            toggleDropdown
          }
          closeMobile={() =>
            setOpenDropdown(null)
          }
        />
      </ul>
    </nav>
  );
};

export default NavCategory;
