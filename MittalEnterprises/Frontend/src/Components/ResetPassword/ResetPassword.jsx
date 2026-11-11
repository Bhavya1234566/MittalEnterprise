import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./ResetPassword.css";

const ResetPassword = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);


  // If user directly opens reset-password URL
  if (!email) {

    return (
      <div className="reset-page">

        <div className="reset-card">

          <h2>Invalid Reset Request</h2>

          <p>
            Please start the password reset process
            from the Forgot Password page.
          </p>

          <Link
            to="/forgot-password"
            className="reset-submit"
          >
            Forgot Password
          </Link>

        </div>

      </div>
    );
  }


  const handleResetPassword = async (e) => {

    e.preventDefault();

    if (!password || !confirmPassword) {

      alert("Please enter both passwords.");

      return;
    }


    if (password !== confirmPassword) {

      alert("Passwords do not match.");

      return;
    }


    if (password.length < 6) {

      alert(
        "Password must be at least 6 characters."
      );

      return;
    }


    try {

      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:5000/api/auth/reset-password",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email,
            password: password,
            confirmPassword: confirmPassword,
          }),
        }
      );


      const data = await response.json();


      if (!response.ok) {

        alert(data.message);

        return;
      }


      alert(
        "Password updated successfully. Please login with your new password."
      );


      navigate("/login");


    } catch (error) {

      console.error(
        "Reset password error:",
        error
      );

      alert(
        "Unable to connect to server. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="reset-page">

      <div className="reset-container">


        {/* Left Section */}

        <div className="reset-left">

          <div className="reset-icon">
            🔑
          </div>

          <h1>Create New Password</h1>

          <p>
            Create a strong new password for your
            Mittal Enterprises account.
          </p>

          <div className="reset-features">

            <div>✓ Secure Password</div>

            <div>✓ Password Protected</div>

            <div>✓ Account Security</div>

          </div>

        </div>


        {/* Right Section */}

        <div className="reset-card">

          <h2>New Password</h2>

          <p className="reset-subtitle">

            Create a new password for

            <strong> {email}</strong>

          </p>


          <form onSubmit={handleResetPassword}>


            {/* New Password */}

            <div className="reset-field">

              <label>New Password</label>

              <div className="reset-password-wrapper">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }

                  placeholder="Enter new password"

                  value={password}

                  onChange={(e) =>
                    setPassword(e.target.value)
                  }

                  disabled={loading}
                />

                <button
                  type="button"
                  className="reset-show-password"

                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >

                  {showPassword
                    ? "Hide"
                    : "Show"}

                </button>

              </div>

            </div>


            {/* Confirm Password */}

            <div className="reset-field">

              <label>
                Confirm New Password
              </label>

              <div className="reset-password-wrapper">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }

                  placeholder="Confirm new password"

                  value={confirmPassword}

                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }

                  disabled={loading}
                />

                <button
                  type="button"
                  className="reset-show-password"

                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >

                  {showConfirmPassword
                    ? "Hide"
                    : "Show"}

                </button>

              </div>

            </div>


            {/* Submit */}

            <button
              type="submit"
              className="reset-submit"
              disabled={loading}
            >

              {loading
                ? "Updating..."
                : "Update Password"}

            </button>

          </form>


          <div className="reset-back">

            <Link to="/login">
              ← Back to Login
            </Link>

          </div>

        </div>

      </div>

    </div>

  );
};

export default ResetPassword;