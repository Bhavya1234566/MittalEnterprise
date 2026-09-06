from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# ==========================================================
# DATABASE
# ==========================================================

db = SQLAlchemy()


# ==========================================================
# USER MODEL
# ==========================================================

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    name = db.Column(
        db.String(100),
        nullable=False
    )

    email = db.Column(
        db.String(150),
        unique=True,
        nullable=False
    )

    phone = db.Column(
        db.String(20),
        nullable=True
    )

    password = db.Column(
        db.String(255),
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )


# ==========================================================
# PRODUCT MODEL
# ==========================================================

class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    name = db.Column(
        db.String(200),
        nullable=False
    )

    description = db.Column(
        db.Text,
        nullable=True
    )

    category = db.Column(
        db.String(100),
        nullable=True
    )

    brand = db.Column(
        db.String(100),
        nullable=True
    )

    model = db.Column(
        db.String(150),
        nullable=True
    )

    badge = db.Column(
        db.String(100),
        nullable=True
    )

    image = db.Column(
        db.String(255),
        nullable=True
    )

    old_price = db.Column(
        db.Float,
        nullable=True
    )

    new_price = db.Column(
        db.Float,
        nullable=False
    )

    sku = db.Column(
        db.String(100),
        nullable=True
    )

    material = db.Column(
        db.String(150),
        nullable=True
    )

    weight = db.Column(
        db.String(100),
        nullable=True
    )

    warranty = db.Column(
        db.String(150),
        nullable=True
    )

    features = db.Column(
        db.JSON,
        nullable=True
    )

    applications = db.Column(
        db.JSON,
        nullable=True
    )

    keywords = db.Column(
        db.Text,
        nullable=True
    )

    stock = db.Column(
        db.Integer,
        nullable=False,
        default=0
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )


# ==========================================================
# WISHLIST MODEL
# ==========================================================

class Wishlist(db.Model):
    __tablename__ = "wishlist"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    product_id = db.Column(
        db.Integer,
        db.ForeignKey("products.id"),
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    __table_args__ = (
        db.UniqueConstraint(
            "user_id",
            "product_id",
            name="unique_user_product_wishlist"
        ),
    )


# ==========================================================
# CART ITEM MODEL
# ==========================================================

class CartItem(db.Model):
    __tablename__ = "cart_items"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    product_id = db.Column(
        db.Integer,
        db.ForeignKey("products.id"),
        nullable=False
    )

    quantity = db.Column(
        db.Integer,
        nullable=False,
        default=1
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    __table_args__ = (
        db.UniqueConstraint(
            "user_id",
            "product_id",
            name="unique_user_product_cart"
        ),
    )