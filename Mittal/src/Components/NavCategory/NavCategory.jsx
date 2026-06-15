import React, { useState } from "react";
import "./NavCategory.css";

const categories = ["Gear Parts", "Oil Seal", "Nuts & Bolts", "Filters", "Bearings"];
const brands = ["Mahindra", "John Deere", "Sonalika", "New Holland", "Swaraj", "TAFE"];

const NavLinks = ({ openDropdown, toggleDropdown, closeMobile }) => (
  <>
    <li className="navcategory__item">
      <a className="navcategory__link" href="#" onClick={closeMobile}>
        Home
      </a>
    </li>

    <li className="navcategory__item">
      <button
        className="navcategory__link"
        onClick={() => toggleDropdown("category")}
      >
        Shop by Category
        <svg
          className={`navcategory__chevron${openDropdown === "category" ? " open" : ""}`}
          width="12" height="12" viewBox="0 0 12 12"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </button>
      {openDropdown === "category" && (
        <ul className="navcategory__dropdown">
          {categories.map((cat, i) => (
            <li key={i}>
              <a className="navcategory__dropdown-item" href="#" onClick={closeMobile}>
                {cat}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>

    <li className="navcategory__item">
      <button
        className="navcategory__link"
        onClick={() => toggleDropdown("brand")}
      >
        Shop by Brand
        <svg
          className={`navcategory__chevron${openDropdown === "brand" ? " open" : ""}`}
          width="12" height="12" viewBox="0 0 12 12"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </button>
      {openDropdown === "brand" && (
        <ul className="navcategory__dropdown">
          {brands.map((brand, i) => (
            <li key={i}>
              <a className="navcategory__dropdown-item" href="#" onClick={closeMobile}>
                {brand}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  </>
);

const NavCategory = ({ mobileInline = false }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  /* ── Tablet/Mobile: sirf hamburger + drawer ── */
  if (mobileInline) {
    return (
      <div className="navcategory-mobile-slot">
        <button
          className="navcategory-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {mobileOpen && (
          <>
            <div className="navcategory-overlay" onClick={closeMobile} />
            <ul className="navcategory navcategory--drawer">
              <NavLinks
                openDropdown={openDropdown}
                toggleDropdown={toggleDropdown}
                closeMobile={closeMobile}
              />
            </ul>
          </>
        )}
      </div>
    );
  }

  /* ── Desktop: horizontal bar ── */
  return (
    <nav className="navcategory-wrapper">
      <ul className="navcategory">
        <NavLinks
          openDropdown={openDropdown}
          toggleDropdown={toggleDropdown}
          closeMobile={() => {}}
        />
      </ul>
    </nav>
  );
};

export default NavCategory;