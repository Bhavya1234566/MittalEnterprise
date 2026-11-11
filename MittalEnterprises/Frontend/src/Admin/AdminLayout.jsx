import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./Admin.css";
export default function AdminLayout() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("mittalAdminToken");
    localStorage.removeItem("mittalAdminEmail");
    toast.success("Logged out");
    navigate("/admin/login");
  };
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <span>ME</span>
          <div>
            <b>Mittal Enterprises</b>
            <small>STORE ADMIN</small>
          </div>
        </div>
        <nav>
          <NavLink to="/admin/dashboard">
            ▦ <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/products">
            ▣ <span>Products</span>
          </NavLink>
          <NavLink to="/admin/orders">
            ▤ <span>Orders</span>
          </NavLink>
          <NavLink to="/admin/customers">
            ♙ <span>Customers</span>
          </NavLink>
          <NavLink to="/admin/catalog">
            ◇ <span>Brands & Categories</span>
          </NavLink>
        </nav>
        <button className="admin-logout" onClick={logout}>
          ↪ Logout
        </button>
      </aside>
      <section className="admin-main">
        <header className="admin-topbar">
          <div>
            <b>Store Administration</b>
            <small>Manage your tractor parts business</small>
          </div>
          <div className="admin-user">
            <span>●</span>
            {localStorage.getItem("mittalAdminEmail")}
          </div>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </section>
    </div>
  );
}
