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

          <p>
            {product.description || "No description available."}
          </p>

        ) : (

          <table className="spec-table">

            <tbody>

              <tr>
                <th>Brand</th>
                <td>{product.brand || "N/A"}</td>
              </tr>

              <tr>
                <th>Category</th>
                <td>{product.category || "N/A"}</td>
              </tr>

              <tr>
                <th>Model</th>
                <td>{product.model || "N/A"}</td>
              </tr>

              <tr>
                <th>SKU</th>
                <td>
                  {product.sku || `MT-${product.id}`}
                </td>
              </tr>

              <tr>
                <th>Material</th>
                <td>{product.material || "N/A"}</td>
              </tr>

              <tr>
                <th>Weight</th>
                <td>{product.weight || "N/A"}</td>
              </tr>

              <tr>
                <th>Warranty</th>
                <td>{product.warranty || "N/A"}</td>
              </tr>

              <tr>
                <th>Stock</th>
                <td>{product.stock || "N/A"}</td>
              </tr>

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
};

export default ProductTabs;