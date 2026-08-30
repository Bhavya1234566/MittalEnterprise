import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Signup.css";


const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  const handleSignup = async (e) => {

    e.preventDefault();

    const {
      name,
      email,
      phone,
      password,
      confirmPassword,
    } = formData;


    // Required fields

    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {

      alert("Please fill all the fields.");

      return;
    }


    // Password match

    if (password !== confirmPassword) {

      alert("Passwords do not match.");

      return;
    }


    // Password length

    if (password.length < 6) {

      alert(
        "Password must be at least 6 characters."
      );

      return;
    }


    try {

      setLoading(true);


      const response = await fetch(
        "http://127.0.0.1:5000/api/auth/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            phone,
            password,
          }),
        }
      );


      const data = await response.json();


      if (!response.ok) {

        alert(
          data.message ||
          "Unable to create account."
        );

        return;
      }


      // Save logged-in user

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(data.user)
      );


      alert(
        "Account created successfully!"
      );


      navigate("/");


    } catch (error) {

      console.error(
        "Signup error:",
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

    <div className="signup-page">

      <div className="signup-container">


        {/* Left Section */}

        <div className="signup-left">

          <h1>
            Join Mittal Enterprises
          </h1>

          <p>
            Create your account and get access
            to genuine tractor parts, accessories
            and exclusive offers.
          </p>


          <div className="signup-features">

            <div>
              <span>✓</span>
              Genuine Tractor Parts
            </div>

            <div>
              <span>✓</span>
              Fast & Reliable Delivery
            </div>

            <div>
              <span>✓</span>
              Wholesale Prices
            </div>

            <div>
              <span>✓</span>
              Easy Order Management
            </div>

          </div>

        </div>


        {/* Right Section */}

        <div className="signup-card">

          <h2>
            Create Account
          </h2>

          <p className="signup-subtitle">
            Create your account to get started
          </p>


          <form onSubmit={handleSignup}>


            {/* Name */}

            <div className="signup-field">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />

            </div>


            {/* Email + Phone */}

            <div className="signup-row">

              <div className="signup-field">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>


              <div className="signup-field">

                <label>
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* Password */}

            <div className="signup-field">

              <label>
                Password
              </label>

              <div className="signup-password-wrapper">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }

                  name="password"

                  placeholder="Create a password"

                  value={formData.password}

                  onChange={handleChange}
                />


                <button
                  type="button"
                  className="signup-show-password"

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

            <div className="signup-field">

              <label>
                Confirm Password
              </label>

              <div className="signup-password-wrapper">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }

                  name="confirmPassword"

                  placeholder="Confirm your password"

                  value={
                    formData.confirmPassword
                  }

                  onChange={handleChange}
                />


                <button
                  type="button"
                  className="signup-show-password"

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


            {/* Terms */}

            <label className="terms-checkbox">

              <input
                type="checkbox"
                required
              />

              <span>
                I agree to the Terms & Conditions
                and Privacy Policy.
              </span>

            </label>


            {/* Create Account */}

            <button
              type="submit"
              className="signup-submit"
              disabled={loading}
            >

              {loading
                ? "Creating Account..."
                : "Create Account"}

            </button>

          </form>


          {/* Login */}

          <div className="already-account">

            Already have an account?

            <Link to="/login">
              Login
            </Link>

          </div>

        </div>

      </div>

    </div>

  );
};


export default Signup;