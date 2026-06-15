import React from "react";
import "./popular.css";
import Items from "../Items/Items";
import data_product from "../assets/data";

const Popular = () => {
  return (
    <div className="popular">
      <div className="popular-header">
        {/* h1 aur "View all" ek line mein — h1 left, view-all right */}
        <div className="popular-header-top">
          <h1>Popular in Oil Seal &amp; Rubber Accessories</h1>
          <div className="popular-view">View all →</div>
        </div>
        {/* hr h1 ke neeche, alag row mein */}
        <hr />
      </div>

      <div className="popular-items">
        {data_product.map((items, i) => (
          <Items
            key={i}
            id={items.id}
            name={items.name}
            image={items.image}
            new_price={items.new_price}
            old_price={items.old_price}
            badge={items.badge}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;