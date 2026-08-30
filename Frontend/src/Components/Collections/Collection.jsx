import React from "react";
import "./Collection.css";
import { Link } from "react-router-dom";

import all_products from "../assets/all_products";
import Items from "../Items/Items";

const Collection = () => {
  return (
    <section id="collections" className="collections">

      <div className="collections-header">

        <div className="collections-header-top">

          <h1>Our Collection</h1>

          <Link
            to="/products"
            className="collections-view"
          >
            View All →
          </Link>

        </div>

        <hr />

      </div>

      <div className="collections-grid">

        {all_products.map((item) => (

          <Items
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            desc={item.desc}
            brand={item.brand}
            category={item.category}
            new_price={item.new_price}
            old_price={item.old_price}
            badge={item.badge}
          />

        ))}

      </div>

    </section>
  );
};

export default Collection;