import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL, getAdminToken } from "./adminApi";
import logo from "../Components/assets/Mittal tractors.png";
import "./Admin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);

  if (getAdminToken()) return <Navigate to="/admin/dashboard" replace />;

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Admin login failed.");
      if (!data.token) throw new Error("The server did not return an admin session.");
      localStorage.setItem("mittalAdminToken", data.token);
      localStorage.setItem("mittalAdminEmail", data.admin?.email || email.trim());
      toast.success("Welcome to Admin Panel");
      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      toast.error(error.message || "Unable to connect to the server.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="login-page admin-login-matching">
      <div className="login-container">
        <section className="login-left">
          <h1>Welcome, Admin!</h1>
          <p>Sign in to manage Mittal Enterprises products, orders, customers and store settings.</p>
          <div className="login-features">
            <div>✓ Manage Products</div>
            <div>✓ Track Orders</div>
            <div>✓ Manage Customers</div>
            <div>✓ Store Administration</div>
          </div>
        </section>
        <section className="login-card">
          <div className="login-logo"><Link to="/"><img src={logo} alt="Mittal Enterprises" /></Link></div>
          <h2>Admin Login</h2>
          <p className="login-subtitle">Use your administrator credentials</p>
          <form onSubmit={submit}>
            <div className="login-field">
              <label>Email Address</label>
              <input type="email" autoComplete="username" required value={email}
                onChange={event => setEmail(event.target.value)} placeholder="Enter admin email" />
            </div>
            <div className="login-field">
              <label>Password</label>
              <div className="password-wrapper">
                <input type={showPassword ? "text" : "password"} autoComplete="current-password"
                  required value={password} onChange={event => setPassword(event.target.value)}
                  placeholder="Enter admin password" />
                <button type="button" className="show-password" onClick={() => setShowPassword(v => !v)}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button type="submit" className="login-submit" disabled={busy}>
              {busy ? "Signing in..." : "Login to Admin"}
            </button>
          </form>
          <div className="register-text"><Link to="/login">← Back to customer login</Link></div>
          <div className="register-text"><Link to="/">Back to store</Link></div>
        </section>
      </div>
    </main>
  );
}
