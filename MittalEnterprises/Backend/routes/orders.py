import os
from flask import Blueprint, request, jsonify
from models import db, Product, User, Order

orders = Blueprint("orders", __name__)

@orders.post("/api/orders")
def create_order():
    data = request.get_json(silent=True) or {}
    required = ["user_id","customer_name","email","phone","address","city","state","pincode"]
    if any(not data.get(k) for k in required):
        return jsonify(success=False, message="Please complete all contact and shipping fields."), 400
    user = User.query.get(data.get("user_id"))
    if not user:
        return jsonify(success=False, message="Please login again."), 401
    raw_items = data.get("items") or []
    if not raw_items:
        return jsonify(success=False, message="Your cart is empty."), 400
    items=[]; total=0
    for row in raw_items:
        try:
            product_id=int(row.get("id")); quantity=int(row.get("quantity",1))
        except (TypeError,ValueError):
            return jsonify(success=False,message="Invalid cart item."),400
        product=Product.query.get(product_id)
        if not product or quantity < 1:
            return jsonify(success=False,message="A product in your cart is unavailable."),400
        if product.stock and quantity > product.stock:
            return jsonify(success=False,message=f"Only {product.stock} units of {product.name} are available."),400
        line=float(product.new_price)*quantity; total+=line
        items.append({"id":product.id,"name":product.name,"image":product.image,"quantity":quantity,"new_price":float(product.new_price),"line_total":line})
    method=(data.get("payment_method") or "COD").upper()
    if method not in {"COD","ONLINE"}: method="COD"
    order=Order(user_id=user.id,customer_name=data["customer_name"],email=data["email"],phone=data["phone"],address=data["address"],city=data["city"],state=data["state"],pincode=data["pincode"],payment_method=method,payment_status="pending",status="Pending",total_amount=total,items=items)
    db.session.add(order); db.session.commit()
    if method=="ONLINE":
        key_id=os.getenv("RAZORPAY_KEY_ID",""); key_secret=os.getenv("RAZORPAY_KEY_SECRET","")
        if not key_id or not key_secret or key_id.startswith("rzp_test_your"):
            db.session.delete(order); db.session.commit()
            return jsonify(success=False,message="Online payment is not configured yet. Please use Cash on Delivery or add Razorpay test keys."),503
        try:
            import razorpay
            client=razorpay.Client(auth=(key_id,key_secret))
            rp=client.order.create({"amount":int(round(total*100)),"currency":"INR","receipt":f"ME-{order.id}"})
            order.razorpay_order_id=rp["id"]; db.session.commit()
            return jsonify(success=True,order_id=order.id,key_id=key_id,amount=rp["amount"],currency=rp["currency"],razorpay_order_id=rp["id"])
        except Exception:
            db.session.delete(order); db.session.commit()
            return jsonify(success=False,message="Could not create Razorpay order. Check gateway credentials."),502
    return jsonify(success=True,message="Order placed successfully.",order=order.to_dict()),201

@orders.post("/api/orders/verify-payment")
def verify_payment():
    data=request.get_json(silent=True) or {}
    order=Order.query.filter_by(razorpay_order_id=data.get("razorpay_order_id")).first()
    if not order:
        return jsonify(success=False,message="Order not found."),404
    key_secret=os.getenv("RAZORPAY_KEY_SECRET","")
    try:
        import razorpay
        client=razorpay.Client(auth=(os.getenv("RAZORPAY_KEY_ID",""),key_secret))
        client.utility.verify_payment_signature({
            "razorpay_order_id":data.get("razorpay_order_id"),
            "razorpay_payment_id":data.get("razorpay_payment_id"),
            "razorpay_signature":data.get("razorpay_signature")
        })
        order.payment_status="paid"; order.status="Processing"; db.session.commit()
        return jsonify(success=True,message="Payment verified.",order=order.to_dict())
    except Exception:
        order.payment_status="failed"; db.session.commit()
        return jsonify(success=False,message="Payment verification failed."),400
