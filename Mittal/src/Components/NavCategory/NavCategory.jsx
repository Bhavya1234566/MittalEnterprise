import React, { useState } from 'react'
import './NavCategory.css'

const NavCategory = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const categories = ["Gear parts","Oil seel","nuts & bolts"];
  const brands = ["Mahindra", "John Deere", "Sonalika", "New Holland", "Swaraj"];

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div>
      <ul type="none" className="navbar-nav me-auto mb-2 mb-lg-0 navcategory">
        
        <li className="nav-item">
          <a className="nav-link" href="#">HOME</a>
        </li>

        <li className="nav-item">
          <a className="nav-link dropdown-toggle" href="#" onClick={() => toggleDropdown("category")}>
            Shop by Category
          </a>
          {openDropdown === "category" && (
            <ul className="dropdown-menu show" >
              {categories.map((cat, index) => (
                <li key={index}>
                  <a className="dropdown-item" href="#">{cat}</a>
                </li>
              ))}
            </ul>
          )}
        </li>

        
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" onClick={() => toggleDropdown("brand")}>
            Shop by Brand
          </a>
          {openDropdown === "brand" && (
            <ul className="dropdown-menu show">
              {brands.map((brand, index) => (
                <li key={index}>
                  <a className="dropdown-item" href="#">{brand}</a>
                </li>
              ))}
            </ul>
          )}
        </li>

      </ul>
    </div>
  )
}

export default NavCategory