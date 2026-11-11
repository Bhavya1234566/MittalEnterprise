import React from "react";
import "./Collection.css";
import { Link } from "react-router-dom";
import Items from "../Items/Items";
import useProducts from "../../hooks/useProducts";

const Collection = () => {
  const { products, loading, error } = useProducts();
  return (
    <section id="collections" className="collections">
      <div className="collections-header">
        <div className="collections-header-top">
          <h1>Our Collection</h1>
          <Link to="/products" className="collections-view">View All →</Link>
        </div>
        <hr />
      </div>
      {loading ? <p>Loading products...</p> : error ? <p role="alert">{error}</p> : (
        <div className="collections-grid">
          {products.map((item) => <Items key={item.id} product={item} />)}
        </div>
      )}
    </section>
  );
};

export default Collection;
