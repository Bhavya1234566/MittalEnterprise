from flask import Blueprint, request, jsonify

from models import db, CartItem, Product
from routes.products import product_to_dict


cart = Blueprint(
    "cart",
    __name__,
    url_prefix="/api/cart"
)


# ==========================================================
# GET USER CART
# ==========================================================

@cart.route("/<int:user_id>", methods=["GET"])
def get_cart(user_id):

    items = CartItem.query.filter_by(
        user_id=user_id
    ).order_by(
        CartItem.created_at.desc()
    ).all()

    cart_products = []

    for item in items:

        product = Product.query.get(
            item.product_id
        )

        if product:

            product_data = product_to_dict(
                product
            )

            product_data["quantity"] = item.quantity

            cart_products.append(
                product_data
            )

    return jsonify({
        "success": True,
        "cart": cart_products
    })


# ==========================================================
# ADD TO CART
# ==========================================================

@cart.route("/add", methods=["POST"])
def add_to_cart():

    data = request.get_json() or {}

    user_id = data.get("user_id")
    product_id = data.get("product_id")
    quantity = data.get("quantity", 1)

    if not user_id or not product_id:

        return jsonify({
            "success": False,
            "message": "user_id and product_id are required"
        }), 400

    try:
        quantity = int(quantity)

    except (TypeError, ValueError):

        quantity = 1

    if quantity < 1:
        quantity = 1

    product = Product.query.get(
        product_id
    )

    if not product:

        return jsonify({
            "success": False,
            "message": "Product not found"
        }), 404

    existing = CartItem.query.filter_by(
        user_id=user_id,
        product_id=product_id
    ).first()

    if existing:

        existing.quantity += quantity

    else:

        existing = CartItem(
            user_id=user_id,
            product_id=product_id,
            quantity=quantity
        )

        db.session.add(existing)

    # ======================================================
    # IMPORTANT:
    # ADD TO CART => REMOVE FROM WISHLIST
    # ======================================================

    from models import Wishlist

    wishlist_item = Wishlist.query.filter_by(
        user_id=user_id,
        product_id=product_id
    ).first()

    if wishlist_item:

        db.session.delete(
            wishlist_item
        )

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Product added to cart"
    })


# ==========================================================
# UPDATE CART QUANTITY
# ==========================================================

@cart.route(
    "/update/<int:user_id>/<int:product_id>",
    methods=["PUT"]
)
def update_cart_quantity(
    user_id,
    product_id
):

    data = request.get_json() or {}

    quantity = data.get("quantity")

    try:
        quantity = int(quantity)

    except (TypeError, ValueError):

        return jsonify({
            "success": False,
            "message": "Invalid quantity"
        }), 400

    if quantity < 1:

        return jsonify({
            "success": False,
            "message": "Quantity must be at least 1"
        }), 400

    item = CartItem.query.filter_by(
        user_id=user_id,
        product_id=product_id
    ).first()

    if not item:

        return jsonify({
            "success": False,
            "message": "Cart item not found"
        }), 404

    item.quantity = quantity

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Cart quantity updated"
    })


# ==========================================================
# REMOVE CART ITEM
# ==========================================================

@cart.route(
    "/remove/<int:user_id>/<int:product_id>",
    methods=["DELETE"]
)
def remove_cart_item(
    user_id,
    product_id
):

    item = CartItem.query.filter_by(
        user_id=user_id,
        product_id=product_id
    ).first()

    if not item:

        return jsonify({
            "success": False,
            "message": "Cart item not found"
        }), 404

    db.session.delete(item)

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Product removed from cart"
    })


# ==========================================================
# CLEAR CART
# ==========================================================

@cart.route(
    "/clear/<int:user_id>",
    methods=["DELETE"]
)
def clear_cart(user_id):

    CartItem.query.filter_by(
        user_id=user_id
    ).delete()

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Cart cleared"
    })