import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./ForgotPassword.css";

const ForgotPassword = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:5000/api/auth/forgot-password",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      // Email verified
      alert("Email verified. Please create a new password.");

      // Go to reset password page
      navigate("/reset-password", {
        state: {
          email: email.trim(),
        },
      });

    } catch (error) {

      console.error("Forgot password error:", error);

      alert(
        "Unable to connect to server. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="forgot-page">

      <div className="forgot-container">

        {/* Left Section */}

        <div className="forgot-left">

          <div className="forgot-icon">
            🔐
          </div>

          <h1>Forgot Password?</h1>

          <p>
            Don't worry! Enter your registered email
            address and reset your password.
          </p>

          <div className="forgot-features">

            <div>✓ Secure Account Recovery</div>

            <div>✓ Quick & Easy Process</div>

            <div>✓ Protect Your Account</div>

          </div>

        </div>


        {/* Right Section */}

        <div className="forgot-card">

          <h2>Reset Your Password</h2>

          <p className="forgot-subtitle">
            Enter your registered email address to
            continue.
          </p>


          <form onSubmit={handleSubmit}>

            <div className="forgot-field">

              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                disabled={loading}
              />

            </div>


            <button
              type="submit"
              className="forgot-submit"
              disabled={loading}
            >

              {loading
                ? "Checking..."
                : "Continue"}

            </button>

          </form>


          <div className="back-login">

            <Link to="/login">
              ← Back to Login
            </Link>

          </div>

        </div>

      </div>

    </div>

  );
};

export default ForgotPassword;