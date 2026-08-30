import React, { useState } from "react";
import "./ProductTabs.css";

const ProductTabs = ({ product }) => {
  const [tab, setTab] = useState("description");

  return (
    <div className="product-tabs">

      <div className="tab-header">
        <button
          className={tab === "description" ? "active" : ""}
          onClick={() => setTab("description")}
        >
          Description
        </button>

        <button
          className={tab === "specifications" ? "active" : ""}
          onClick={() => setTab("specifications")}
        >
          Specifications
        </button>
      </div>

      <div className="tab-content">

        {tab === "description" ? (
          <p>{product.desc}</p>
        ) : (
          <table className="spec-table">
            <tbody>

              <tr>
                <th>Brand</th>
                <td>{product.brand}</td>
              </tr>

              <tr>
                <th>Category</th>
                <td>{product.category}</td>
              </tr>

              <tr>
                <th>SKU</th>
                <td>{product.sku}</td>
              </tr>

              <tr>
                <th>Material</th>
                <td>{product.material}</td>
              </tr>

              <tr>
                <th>Weight</th>
                <td>{product.weight}</td>
              </tr>

              <tr>
                <th>Warranty</th>
                <td>{product.warranty}</td>
              </tr>

            </tbody>
          </table>
        )}

      </div>

    </div>
  );
};

export default ProductTabs;