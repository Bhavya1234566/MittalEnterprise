import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL, getAdminToken } from "./adminApi";
import "./Admin.css";

export default function AdminLogin(){
 const navigate=useNavigate(); const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [busy,setBusy]=useState(false);
 if(getAdminToken()) return <Navigate to="/admin/dashboard" replace/>;
 const submit=async e=>{e.preventDefault();setBusy(true);try{const r=await fetch(`${API_URL}/api/admin/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})});const d=await r.json();if(!r.ok)throw new Error(d.message||"Login failed");localStorage.setItem("mittalAdminToken",d.token);localStorage.setItem("mittalAdminEmail",d.admin.email);toast.success("Welcome to Admin Panel");navigate("/admin/dashboard");}catch(err){toast.error(err.message)}finally{setBusy(false)}};
 return <main className="admin-login-page"><form className="admin-login-card" onSubmit={submit}><div className="admin-brand-mark">ME</div><p className="admin-eyebrow">MITTAL ENTERPRISES</p><h1>Admin Login</h1><p className="admin-muted">Sign in to manage your store</p><label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@mittalenterprises.com" required/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter admin password" required/></label><button className="admin-primary" disabled={busy}>{busy?"Signing in…":"Sign in to dashboard"}</button><a href="/" className="admin-back-store">← Back to store</a></form></main>
}
