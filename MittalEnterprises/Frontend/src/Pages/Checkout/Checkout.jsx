import React,{useContext,useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Breadcrumb from "../../Components/Breadcrum/Breadcrum";
import {CartContext} from "../../Context/ShopContext";
import {getProductImageUrl} from "../../utils/productImage";
import "./Checkout.css";

const API_URL="http://127.0.0.1:5000";
const Checkout=()=>{
 const {cartItems,totalAmount,user,clearCart}=useContext(CartContext);
 const navigate=useNavigate();
 const [payment,setPayment]=useState("COD");
 const [busy,setBusy]=useState(false);
 const [pinLoading,setPinLoading]=useState(false);
 const [pinMessage,setPinMessage]=useState("");
 const [form,setForm]=useState({customer_name:user?.name||"",email:user?.email||"",phone:user?.phone||"",address:"",city:"",state:"",pincode:""});
 const change=e=>setForm(f=>({...f,[e.target.name]:e.target.value}));
 const lookupPincode=async(value)=>{
  const pin=(value??form.pincode).replace(/\D/g,"").slice(0,6);
  setForm(f=>({...f,pincode:pin})); setPinMessage("");
  if(pin.length!==6)return;
  setPinLoading(true);
  try{
   const response=await fetch(`https://api.postalpincode.in/pincode/${pin}`);
   const result=await response.json();
   const office=result?.[0]?.PostOffice?.[0];
   if(result?.[0]?.Status!=="Success"||!office)throw new Error("Pincode not found. Please check it.");
   setForm(f=>({...f,pincode:pin,city:office.District||office.Block||"",state:office.State||""}));
   setPinMessage(`Location found: ${office.District}, ${office.State}`);
  }catch(error){setPinMessage(error.message||"Unable to fetch location. Enter city and state manually.");}
  finally{setPinLoading(false)}
 };
 const loadRazorpay=()=>new Promise(resolve=>{if(window.Razorpay)return resolve(true);const script=document.createElement("script");script.src="https://checkout.razorpay.com/v1/checkout.js";script.onload=()=>resolve(true);script.onerror=()=>resolve(false);document.body.appendChild(script)});
 const placeOrder=async e=>{
  e.preventDefault();
  if(!user?.id){toast.error("Please login before checkout");navigate("/login");return}
  if(!cartItems.length){toast.error("Your cart is empty");return}
  if(!/^[6-9]\d{9}$/.test(form.phone)){toast.error("Enter a valid 10-digit mobile number");return}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)){toast.error("Enter a valid email address");return}
  if(!/^\d{6}$/.test(form.pincode)){toast.error("Enter a valid 6-digit pincode");return}
  if(!form.city||!form.state){toast.error("Please enter a valid pincode to fetch city and state");return}
  setBusy(true);
  try{
   const response=await fetch(`${API_URL}/api/orders`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,user_id:user.id,items:cartItems.map(i=>({id:i.id,quantity:i.quantity})),payment_method:payment})});
   const data=await response.json();
   if(!response.ok)throw new Error(data.message||"Unable to place order");
   if(payment==="COD"){await clearCart();toast.success("Order placed successfully!");navigate("/");return}
   const loaded=await loadRazorpay();if(!loaded)throw new Error("Payment checkout could not load. Please try again.");
   const options={key:data.key_id,amount:data.amount,currency:data.currency,name:"Mittal Enterprises",description:"Tractor spare parts order",order_id:data.razorpay_order_id,prefill:{name:form.customer_name,email:form.email,contact:form.phone},theme:{color:"#1f5d32"},handler:async result=>{try{const verify=await fetch(`${API_URL}/api/orders/verify-payment`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...result,razorpay_order_id:data.razorpay_order_id})});const verified=await verify.json();if(!verify.ok)throw new Error(verified.message||"Payment verification failed");await clearCart();toast.success("Payment successful. Order placed!");navigate("/")}catch(err){toast.error(err.message)}}};
   const checkout=new window.Razorpay(options);checkout.on("payment.failed",()=>toast.error("Payment failed. Please try again."));checkout.open();
  }catch(err){toast.error(err.message)}finally{setBusy(false)}
 };
 return <><Navbar/><Breadcrumb currentPage="Checkout"/><form className="checkout-page" onSubmit={placeOrder}><div className="checkout-left"><h2>Checkout</h2><div className="checkout-card"><h3>Contact Information</h3><input name="customer_name" value={form.customer_name} onChange={change} required placeholder="Full Name"/><input name="email" type="email" value={form.email} onChange={change} required placeholder="Email Address"/><input name="phone" type="tel" inputMode="numeric" maxLength={10} pattern="[6-9][0-9]{9}" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value.replace(/\D/g,"").slice(0,10)}))} required placeholder="10-digit Phone Number"/></div><div className="checkout-card"><h3>Shipping Address</h3><input name="address" value={form.address} onChange={change} required placeholder="House number, street and area"/><input name="pincode" inputMode="numeric" maxLength={6} value={form.pincode} onChange={e=>{const v=e.target.value.replace(/\D/g,"").slice(0,6);setForm(f=>({...f,pincode:v}));if(v.length===6)lookupPincode(v);}} onBlur={()=>form.pincode.length===6&&!form.city&&lookupPincode()} required pattern="[0-9]{6}" placeholder="Enter 6-digit Pincode"/>
   {pinLoading&&<small>Finding city and state…</small>}{pinMessage&&<small className={pinMessage.startsWith("Location found")?"pincode-success":"pincode-error"}>{pinMessage}</small>}
   <input name="city" value={form.city} onChange={change} required placeholder="City (auto-filled; editable)"/><input name="state" value={form.state} onChange={change} required placeholder="State (auto-filled; editable)"/></div><div className="checkout-card"><h3>Payment Method</h3><label><input type="radio" name="payment" checked={payment==="COD"} onChange={()=>setPayment("COD")}/> Cash on Delivery</label><label><input type="radio" name="payment" checked={payment==="ONLINE"} onChange={()=>setPayment("ONLINE")}/> Pay Online (UPI / Cards / Netbanking)</label><p className="checkout-payment-note">Online payment requires your Razorpay test keys in Backend/.env.</p></div></div><aside className="checkout-right"><h2>Order Summary</h2>{cartItems.map(item=><div className="summary-item" key={item.id}><img src={getProductImageUrl(item.image)} alt={item.name} onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src="/product-placeholder.svg"}}/><div><h4>{item.name}</h4><p>Qty : {item.quantity}</p></div><span>₹{Number(item.quantity)*Number(item.new_price)}</span></div>)}<hr/><div className="summary-row"><span>Subtotal</span><span>₹{totalAmount}</span></div><div className="summary-row"><span>Shipping</span><span>Free</span></div><div className="summary-row total"><span>Total</span><span>₹{totalAmount}</span></div><button className="place-order" disabled={busy||!cartItems.length}>{busy?"Processing…":payment==="COD"?"Place COD Order":"Continue to Payment"}</button><Link to="/cart" className="back-cart">← Back To Cart</Link></aside></form><Footer/></>;
};
export default Checkout;
