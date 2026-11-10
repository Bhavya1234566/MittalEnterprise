import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";
import CartContextProvider from "./Context/ShopContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartContextProvider>

        <App />

        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={12}
          toastOptions={{
            duration: 2500,
            style: {
              background: "#1f5d24",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "600",
              padding: "16px 22px",
              borderRadius: "12px",
              boxShadow: "0 8px 25px rgba(0,0,0,.25)",
            },
            success: {
              icon: "🛒",
            },
          }}
        />

      </CartContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);