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

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

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