
import React, { useEffect, useState } from "react";
import { adminRequest } from "./adminApi";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminRequest("/dashboard")
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return <p className="admin-error">{error}</p>;
  }

  if (!data) {
    return <p>Loading dashboard…</p>;
  }

  const s = data.stats;

  const stats = [
    ["Total products", s.products, "▣"],
    ["Customers", s.customers, "♙"],
    ["Total orders", s.orders, "▤"],
    [
      "Paid revenue",
      `₹${Number(s.revenue || 0).toLocaleString("en-IN")}`,
      "₹",
    ],
    ["Pending orders", s.pending_orders, "◷"],
  ];

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">OVERVIEW</p>
          <h1>Dashboard</h1>
          <p className="admin-muted">
            Here's what's happening with your store.
          </p>
        </div>
      </div>

      <div className="admin-stat-grid">
        {stats.map(([label, value, icon]) => (
          <article className="admin-stat" key={label}>
            <span>{icon}</span>
            <small>{label}</small>
            <strong>{value}</strong>
          </article>
        ))}

        {/* Low Stock Card */}
        <Link
          to="/admin/products?filter=low"
          className="admin-stat admin-stat-link"
        >
          <div className="admin-low-stock-heading">
            <span>!</span>
            <small>Low stock items</small>
          </div>

          <strong className="admin-low-stock-value">
            {s.low_stock}
          </strong>

          <em>View low stock products →</em>
        </Link>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-head">
          <h2>Recent orders</h2>
          <Link to="/admin/orders">View all</Link>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {data.recent_orders.length ? (
                data.recent_orders.map((o) => (
                  <tr key={o.id}>
                    <td>#{o.id}</td>
                    <td>{o.customer_name}</td>
                    <td>₹{o.total_amount}</td>
                    <td>{o.payment_status}</td>
                    <td>{o.status}</td>
                    <td>
                      {o.created_at
                        ? new Date(o.created_at).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No orders yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
