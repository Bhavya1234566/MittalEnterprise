import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/Home";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";

import BrandsPage from "./Pages/BrandsPage/BrandsPage";
import PLP from "./Pages/ProductListPage/Plp";
import PDP from "./Pages/Pdp/Pdp";

import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Checkout/Checkout";

import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";  
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Wishlist from "./Pages/Wishlist/Wishlist";
import AdminLogin from "./Admin/AdminLogin";
import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminProducts from "./Admin/AdminProducts";
import AdminOrders from "./Admin/AdminOrders";
import AdminCustomers from "./Admin/AdminCustomers";
import AdminCatalog from "./Admin/AdminCatalog";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={localStorage.getItem("mittalAdminToken") ? <AdminLayout /> : <Navigate to="/admin/login" replace />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="catalog" element={<AdminCatalog />} />
      </Route>

      <Route path="/about" element={<About />} />

      <Route path="/contact" element={<Contact />} />

      <Route path="/brands" element={<BrandsPage />} />

      <Route path="/products" element={<PLP />} />

      <Route path="/product/:id" element={<PDP />} />

      {/* Cart */}
      <Route path="/cart" element={<Cart />} />

      {/* Checkout */}
      <Route path="/checkout" element={<Checkout />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/reset-password"
  element={<ResetPassword />}
/>

<Route
  path="/wishlist"
  element={<Wishlist />}
/>

    </Routes>
  );
}

export default App;