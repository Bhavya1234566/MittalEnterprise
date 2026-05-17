import React from "react";
import "./popular.css";
import Items from "../Items/Items";
import data_product from "../assets/data";

const Popular = () => {
  return (
    <>
      <div className="popular">
        <h1>Popular in Oil Seal & Rubber Accessories</h1>
        <hr />
        <div className="popular-view">View all →</div>
        <div className="popular-items">
          {data_product.map((items, i) => {
            return (
              <Items
                key={i}
                id={items.id}
                name={items.name}
                image={items.image}
                new_price={items.new_price}
                old_price={items.old_price}
                badge={items.badge}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Popular;