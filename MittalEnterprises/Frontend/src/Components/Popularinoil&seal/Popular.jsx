import React from "react";
import "./popular.css";
import Items from "../Items/Items";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";

const Popular = () => {
  const { products, loading, error } = useProducts();
  const popularProducts = products.filter((product) =>
    (product.category || "").toLowerCase().includes("oil seal")
  ).slice(0, 4);

  return (
    <div className="popular">
      <div className="popular-header">
        <div className="popular-header-top">
          <h1>Popular in Oil Seal &amp; Rubber Accessories</h1>
          <Link to="/products?category=Oil%20Seals" className="popular-view">View all →</Link>
        </div>
        <hr />
      </div>
      {loading ? <p>Loading products...</p> : error ? <p role="alert">{error}</p> : (
        <div className="popular-items">
          {popularProducts.map((product) => <Items key={product.id} product={product} />)}
        </div>
      )}
    </div>
  );
};

export default Popular;
