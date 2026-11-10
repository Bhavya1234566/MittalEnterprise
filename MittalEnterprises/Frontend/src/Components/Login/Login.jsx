import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";
import logo from "../assets/Mittal tractors.png";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
          "Invalid email or password."
        );

        return;
      }

      // ================================================
      // SAVE USER
      // ================================================

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(data.user)
      );

      // ================================================
      // TELL NAVBAR / WISHLIST THAT AUTH CHANGED
      // ================================================

      window.dispatchEvent(
        new Event("authChanged")
      );

      alert("Login successful!");

      navigate("/");
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      alert(
        "Unable to connect to server. Please try again."
      );
    }
  };

  return (
    <div className="login-page">

      <div className="login-container">

        {/* LEFT */}

        <div className="login-left">

          <h1>
            Welcome Back!
          </h1>

          <p>
            Login to your Mittal Enterprises account
            and continue shopping for quality tractor parts.
          </p>

          <div className="login-features">

            <div>
              ✓ Genuine Products
            </div>

            <div>
              ✓ Fast Delivery
            </div>

            <div>
              ✓ Wholesale Prices
            </div>

            <div>
              ✓ 24/7 Support
            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="login-card">

          {/* LOGO */}

          <div className="login-logo">

            <Link to="/">
              <img
                src={logo}
                alt="Mittal Enterprises"
              />
            </Link>

          </div>

          <h2>
            Login
          </h2>

          <p className="login-subtitle">
            Enter your details to access your account
          </p>

          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="login-field">

              <label>
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

            {/* PASSWORD */}

            <div className="login-field">

              <label>
                Password
              </label>

              <div className="password-wrapper">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

            </div>

            {/* OPTIONS */}

            <div className="login-options">

              <label className="remember-me">

                <input
                  type="checkbox"
                />

                Remember me

              </label>

              <Link to="/forgot-password">
                Forgot Password?
              </Link>

            </div>

            {/* LOGIN */}

            <button
              type="submit"
              className="login-submit"
            >
              Login
            </button>

          </form>

          {/* REGISTER */}

          <div className="register-text">

            Don't have an account?

            <Link to="/signup">
              Create Account
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;