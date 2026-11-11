import os
import uuid
from functools import wraps
from itsdangerous import URLSafeTimedSerializer, BadSignature, SignatureExpired
from flask import Blueprint, current_app, jsonify, request
from werkzeug.utils import secure_filename
from models import db, Product, User, Order, Brand, Category

admin = Blueprint("admin", __name__, url_prefix="/api/admin")
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp", "gif"}
MAX_IMAGE_BYTES = 5 * 1024 * 1024

def serializer():
    return URLSafeTimedSerializer(current_app.config["SECRET_KEY"], salt="mittal-admin-session")

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        header = request.headers.get("Authorization", "")
        token = header[7:] if header.startswith("Bearer ") else ""
        if not token:
            return jsonify(success=False, message="Admin login required."), 401
        try:
            payload = serializer().loads(token, max_age=12 * 60 * 60)
        except (BadSignature, SignatureExpired):
            return jsonify(success=False, message="Admin session expired. Please login again."), 401
        if payload.get("role") != "admin":
            return jsonify(success=False, message="Admin access only."), 403
        return fn(*args, **kwargs)
    return wrapper

def product_dict(p):
    return {column.name: getattr(p, column.name) for column in Product.__table__.columns}

def valid_image(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@admin.post("/login")
def login():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    admin_email = (os.getenv("ADMIN_EMAIL") or "").strip().lower()
    admin_password = os.getenv("ADMIN_PASSWORD") or ""
    if not admin_email or not admin_password or admin_password.startswith("change-this"):
        return jsonify(success=False, message="Set a real ADMIN_EMAIL and ADMIN_PASSWORD in Backend/.env."), 503
    if email != admin_email or password != admin_password:
        return jsonify(success=False, message="Invalid admin email or password."), 401
    token = serializer().dumps({"role": "admin", "email": email})
    return jsonify(success=True, token=token, admin={"email": email, "name": "Mittal Enterprises Admin"})

@admin.get("/me")
@admin_required
def me():
    return jsonify(success=True, admin=True)

@admin.get("/dashboard")
@admin_required
def dashboard():
    revenue = db.session.query(db.func.coalesce(db.func.sum(Order.total_amount), 0)).filter(Order.payment_status == "paid").scalar() or 0
    return jsonify(success=True, stats={
        "products": Product.query.count(),
        "customers": User.query.count(),
        "orders": Order.query.count(),
        "revenue": float(revenue),
        "pending_orders": Order.query.filter_by(status="Pending").count(),
        "low_stock": Product.query.filter(Product.stock <= 5).count(),
        "out_of_stock": Product.query.filter(Product.stock <= 0).count()
    }, recent_orders=[o.to_dict() for o in Order.query.order_by(Order.created_at.desc()).limit(8).all()])

@admin.route("/products", methods=["GET", "POST"])
@admin_required
def products():
    if request.method == "GET":
        return jsonify(success=True, products=[product_dict(p) for p in Product.query.order_by(Product.id.desc()).all()])
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    if not name or data.get("new_price") in (None, ""):
        return jsonify(success=False, message="Product name and selling price are required."), 400
    try:
        price = float(data["new_price"])
        old_price = float(data["old_price"]) if data.get("old_price") not in (None, "") else None
        stock = int(data.get("stock") or 0)
        if price < 0 or stock < 0 or (old_price is not None and old_price < 0):
            raise ValueError
    except (TypeError, ValueError):
        return jsonify(success=False, message="Enter valid price and stock values."), 400
    p = Product(name=name, description=data.get("description"), category=data.get("category"), brand=data.get("brand"),
        model=data.get("model"), badge=data.get("badge"), image=data.get("image"), old_price=old_price,
        new_price=price, sku=data.get("sku"), material=data.get("material"), weight=data.get("weight"),
        warranty=data.get("warranty"), features=data.get("features") or [], applications=data.get("applications") or [],
        keywords=data.get("keywords"), stock=stock)
    db.session.add(p); db.session.commit()
    return jsonify(success=True, message="Product created.", product=product_dict(p)), 201

@admin.route("/products/<int:product_id>", methods=["PUT", "DELETE"])
@admin_required
def product_detail(product_id):
    p = Product.query.get_or_404(product_id)
    if request.method == "DELETE":
        db.session.delete(p); db.session.commit()
        return jsonify(success=True, message="Product deleted.")
    data = request.get_json(silent=True) or {}
    old_stock = int(p.stock or 0)
    fields = {"name","description","category","brand","model","badge","image","old_price","new_price","sku","material","weight","warranty","features","applications","keywords","stock"}
    try:
        for key in fields.intersection(data):
            value = data[key]
            if key in ("new_price", "old_price") and value not in (None, ""): value = float(value)
            if key == "stock": value = int(value)
            setattr(p, key, value)
        if not p.name or p.new_price is None or p.new_price < 0 or p.stock < 0: raise ValueError
    except (TypeError, ValueError):
        db.session.rollback()
        return jsonify(success=False, message="Please check product name, price and stock."), 400
    restock_alerts = 0
    if old_stock <= 0 and int(p.stock or 0) > 0:
        from models import StockAlert
        alerts = StockAlert.query.filter_by(product_id=p.id, notified=False).all()
        for alert in alerts:
            alert.notified = True
            restock_alerts += 1
    db.session.commit()
    return jsonify(success=True, message="Product updated.", product=product_dict(p), restock_alerts_triggered=restock_alerts)

@admin.post("/upload")
@admin_required
def upload_image():
    image = request.files.get("image")
    if not image or not image.filename or not valid_image(image.filename):
        return jsonify(success=False, message="Choose a PNG, JPG, WEBP or GIF image."), 400
    image.stream.seek(0, os.SEEK_END); size = image.stream.tell(); image.stream.seek(0)
    if size > MAX_IMAGE_BYTES:
        return jsonify(success=False, message="Image must be 5 MB or smaller."), 413
    ext = secure_filename(image.filename).rsplit(".", 1)[1].lower()
    filename = f"{uuid.uuid4().hex}.{ext}"
    folder = os.path.join(current_app.root_path, "static", "uploads", "products")
    os.makedirs(folder, exist_ok=True)
    image.save(os.path.join(folder, filename))
    return jsonify(success=True, image=f"/static/uploads/products/{filename}")

@admin.get("/customers")
@admin_required
def customers():
    rows = User.query.order_by(User.created_at.desc()).all()
    return jsonify(success=True, customers=[{"id":u.id,"name":u.name,"email":u.email,"phone":u.phone,"created_at":u.created_at.isoformat() if u.created_at else None} for u in rows])

@admin.get("/orders")
@admin_required
def orders():
    return jsonify(success=True, orders=[o.to_dict() for o in Order.query.order_by(Order.created_at.desc()).all()])

@admin.patch("/orders/<int:order_id>")
@admin_required
def update_order(order_id):
    order = Order.query.get_or_404(order_id)
    data = request.get_json(silent=True) or {}
    if data.get("status") in {"Pending","Processing","Shipped","Delivered","Cancelled"}: order.status = data["status"]
    if data.get("payment_status") in {"pending","paid","failed","refunded"}: order.payment_status = data["payment_status"]
    db.session.commit()
    return jsonify(success=True, order=order.to_dict())

@admin.route("/brands", methods=["GET", "POST"])
@admin_required
def brands():
    if request.method == "GET":
        existing = {b.name.lower() for b in Brand.query.all()}
        for (name,) in db.session.query(Product.brand).distinct().all():
            if name and name.lower() not in existing:
                db.session.add(Brand(name=name.strip())); existing.add(name.lower())
        db.session.commit()
        return jsonify(success=True, brands=[{"id":b.id,"name":b.name} for b in Brand.query.order_by(Brand.name).all()])
    name = ((request.get_json(silent=True) or {}).get("name") or "").strip()
    if not name: return jsonify(success=False, message="Brand name is required."), 400
    if Brand.query.filter(db.func.lower(Brand.name) == name.lower()).first(): return jsonify(success=False, message="Brand already exists."), 409
    item = Brand(name=name); db.session.add(item); db.session.commit()
    return jsonify(success=True, brand={"id":item.id,"name":item.name}), 201

@admin.delete("/brands/<int:item_id>")
@admin_required
def delete_brand(item_id):
    item = Brand.query.get_or_404(item_id); db.session.delete(item); db.session.commit()
    return jsonify(success=True, message="Brand removed.")

@admin.route("/categories", methods=["GET", "POST"])
@admin_required
def categories():
    if request.method == "GET":
        existing = {c.name.lower() for c in Category.query.all()}
        for (name,) in db.session.query(Product.category).distinct().all():
            if name and name.lower() not in existing:
                db.session.add(Category(name=name.strip())); existing.add(name.lower())
        db.session.commit()
        return jsonify(success=True, categories=[{"id":c.id,"name":c.name} for c in Category.query.order_by(Category.name).all()])
    name = ((request.get_json(silent=True) or {}).get("name") or "").strip()
    if not name: return jsonify(success=False, message="Category name is required."), 400
    if Category.query.filter(db.func.lower(Category.name) == name.lower()).first(): return jsonify(success=False, message="Category already exists."), 409
    item = Category(name=name); db.session.add(item); db.session.commit()
    return jsonify(success=True, category={"id":item.id,"name":item.name}), 201

@admin.delete("/categories/<int:item_id>")
@admin_required
def delete_category(item_id):
    item = Category.query.get_or_404(item_id); db.session.delete(item); db.session.commit()
    return jsonify(success=True, message="Category removed.")


@admin.get("/inventory/low-stock")
@admin_required
def low_stock_inventory():
    threshold = request.args.get("threshold", 5, type=int)
    threshold = max(0, min(threshold, 100000))
    rows = Product.query.filter(Product.stock <= threshold).order_by(Product.stock.asc(), Product.name.asc()).all()
    return jsonify(success=True, threshold=threshold, products=[product_dict(p) for p in rows])

@admin.patch("/inventory/<int:product_id>")
@admin_required
def adjust_inventory(product_id):
    product = Product.query.get_or_404(product_id)
    data = request.get_json(silent=True) or {}
    try:
        if "stock" in data:
            new_stock = int(data["stock"])
        else:
            new_stock = int(product.stock or 0) + int(data.get("adjustment", 0))
        if new_stock < 0:
            raise ValueError
    except (TypeError, ValueError):
        return jsonify(success=False, message="Stock must be a valid non-negative whole number."), 400
    old_stock = int(product.stock or 0)
    product.stock = new_stock
    # Notify every customer who requested a restock alert when inventory becomes available.
    notified_count = 0
    if old_stock <= 0 and new_stock > 0:
        from models import StockAlert
        alerts = StockAlert.query.filter_by(product_id=product.id, notified=False).all()
        for alert in alerts:
            alert.notified = True
            notified_count += 1
        # Email is optional; in-app notification is always recorded for the customer.
        try:
            import smtplib
            from email.message import EmailMessage
            host = os.getenv("MAIL_SERVER"); username = os.getenv("MAIL_USERNAME"); password = os.getenv("MAIL_PASSWORD")
            if host and username and password:
                for alert in alerts:
                    msg = EmailMessage(); msg["Subject"] = f"Back in stock: {product.name}"
                    msg["From"] = username; msg["To"] = alert.email
                    msg.set_content(f"Good news! {product.name} is back in stock at Mittal Enterprises. Available quantity: {new_stock}.")
                    with smtplib.SMTP(host, int(os.getenv("MAIL_PORT", "587")), timeout=10) as server:
                        server.starttls(); server.login(username, password); server.send_message(msg)
        except Exception:
            current_app.logger.exception("Restock email could not be sent; in-app alert is retained.")
    db.session.commit()
    return jsonify(success=True, message="Inventory updated.", product=product_dict(product), restock_alerts_triggered=notified_count)
