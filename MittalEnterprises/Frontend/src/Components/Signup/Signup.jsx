import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const EMAIL_RE = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;
const PHONE_RE = /^[6-9]\d{9}$/;
const STRONG_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword } = formData;
    if (name.trim().length < 2 || !/^[\p{L}][\p{L}\s.'-]*$/u.test(name.trim())) return alert("Please enter a valid full name.");
    if (!EMAIL_RE.test(email.trim())) return alert("Please enter a valid email address.");
    if (!PHONE_RE.test(phone.trim())) return alert("Enter a valid 10-digit Indian mobile number starting with 6–9.");
    if (!STRONG_PASSWORD.test(password)) return alert("Password must be at least 8 characters and include uppercase, lowercase, number and special character.");
    if (password !== confirmPassword) return alert("Passwords do not match.");
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:5000/api/auth/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), phone: phone.trim(), password }) });
      const data = await response.json();
      if (!response.ok) return alert(data.message || "Unable to create account.");
      localStorage.setItem("loggedInUser", JSON.stringify(data.user));
      window.dispatchEvent(new Event("authChanged"));
      alert("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Unable to connect to server. Please try again.");
    } finally { setLoading(false); }
  };

  return <div className="signup-page"><div className="signup-container">
    <div className="signup-left"><h1>Join Mittal Enterprises</h1><p>Create your account and get access to genuine tractor parts, accessories and exclusive offers.</p><div className="signup-features"><div>✓ Genuine Tractor Parts</div><div>✓ Fast & Reliable Delivery</div><div>✓ Wholesale Prices</div><div>✓ Easy Order Management</div></div></div>
    <div className="signup-card"><h2>Create Account</h2><p className="signup-subtitle">Create your account to get started</p>
      <form onSubmit={handleSignup}>
        <div className="signup-field"><label>Full Name</label><input type="text" name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Enter your full name" value={formData.name} onChange={handleChange}/></div>
        <div className="signup-row">
          <div className="signup-field"><label>Email Address</label><input type="email" name="email" autoComplete="email" required placeholder="name@example.com" value={formData.email} onChange={handleChange}/></div>
          <div className="signup-field"><label>Phone Number</label><input type="tel" name="phone" inputMode="numeric" autoComplete="tel-national" maxLength={10} pattern="[6-9][0-9]{9}" required placeholder="10-digit mobile number" value={formData.phone} onChange={(e)=>setFormData(p=>({...p,phone:e.target.value.replace(/\D/g,"").slice(0,10)}))}/></div>
        </div>
        <div className="signup-field"><label>Password</label><div className="signup-password-wrapper"><input type={showPassword?"text":"password"} name="password" autoComplete="new-password" required minLength={8} placeholder="Create a strong password" value={formData.password} onChange={handleChange}/><button type="button" className="signup-show-password" onClick={()=>setShowPassword(p=>!p)}>{showPassword?"Hide":"Show"}</button></div><small>8+ characters, uppercase, lowercase, number and special character.</small></div>
        <div className="signup-field"><label>Confirm Password</label><div className="signup-password-wrapper"><input type={showConfirmPassword?"text":"password"} name="confirmPassword" autoComplete="new-password" required placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange}/><button type="button" className="signup-show-password" onClick={()=>setShowConfirmPassword(p=>!p)}>{showConfirmPassword?"Hide":"Show"}</button></div></div>
        <label className="terms-checkbox"><input type="checkbox" required/><span>I agree to the Terms & Conditions and Privacy Policy.</span></label>
        <button className="signup-submit" type="submit" disabled={loading}>{loading?"Creating Account...":"Create Account"}</button>
      </form><p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  </div></div>;
};
export default Signup;
