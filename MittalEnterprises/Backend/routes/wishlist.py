from flask import Blueprint, request, jsonify

from models import db, Wishlist, Product
from routes.products import product_to_dict


wishlist = Blueprint(
    "wishlist",
    __name__,
    url_prefix="/api/wishlist"
)


# ==========================================================
# GET USER WISHLIST
# ==========================================================

@wishlist.route("/<int:user_id>", methods=["GET"])
def get_wishlist(user_id):

    items = Wishlist.query.filter_by(
        user_id=user_id
    ).order_by(
        Wishlist.created_at.desc()
    ).all()

    products = []

    for item in items:

        product = Product.query.get(
            item.product_id
        )

        if product:
            products.append(
                product_to_dict(product)
            )

    return jsonify({
        "success": True,
        "wishlist": products
    })


# ==========================================================
# ADD TO WISHLIST
# ==========================================================

@wishlist.route("/add", methods=["POST"])
def add_to_wishlist():

    data = request.get_json() or {}

    user_id = data.get("user_id")
    product_id = data.get("product_id")

    if not user_id or not product_id:
        return jsonify({
            "success": False,
            "message": "user_id and product_id are required"
        }), 400

    existing = Wishlist.query.filter_by(
        user_id=user_id,
        product_id=product_id
    ).first()

    if existing:
        return jsonify({
            "success": True,
            "message": "Product already in wishlist"
        })

    product = Product.query.get(product_id)

    if not product:
        return jsonify({
            "success": False,
            "message": "Product not found"
        }), 404

    item = Wishlist(
        user_id=user_id,
        product_id=product_id
    )

    db.session.add(item)

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Product added to wishlist",
        "product": product_to_dict(product)
    })


# ==========================================================
# REMOVE FROM WISHLIST
# ==========================================================

@wishlist.route(
    "/remove/<int:user_id>/<int:product_id>",
    methods=["DELETE"]
)
def remove_from_wishlist(
    user_id,
    product_id
):

    item = Wishlist.query.filter_by(
        user_id=user_id,
        product_id=product_id
    ).first()

    if not item:
        return jsonify({
            "success": False,
            "message": "Product not found in wishlist"
        }), 404

    db.session.delete(item)

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Product removed from wishlist"
    })


# ==========================================================
# CLEAR WISHLIST
# ==========================================================

@wishlist.route(
    "/clear/<int:user_id>",
    methods=["DELETE"]
)
def clear_wishlist(user_id):

    Wishlist.query.filter_by(
        user_id=user_id
    ).delete()

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Wishlist cleared"
    })