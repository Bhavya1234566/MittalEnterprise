from flask import Blueprint, request, jsonify

from models import db, Product


products = Blueprint("products", __name__)


# ==========================================
# PRODUCT RESPONSE HELPER
# ==========================================

def product_to_dict(product):

    return {
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "category": product.category,
        "brand": product.brand,
        "model": product.model,
        "badge": product.badge,
        "image": product.image,
        "old_price": product.old_price,
        "new_price": product.new_price,
        "sku": product.sku,
        "material": product.material,
        "weight": product.weight,
        "warranty": product.warranty,
        "features": product.features,
        "applications": product.applications,
        "keywords": product.keywords,
        "stock": product.stock
    }


# ==========================================
# GET ALL PRODUCTS
# ==========================================

@products.route("/api/products/", methods=["GET"])
def get_products():

    product_list = Product.query.order_by(
        Product.id.desc()
    ).all()

    result = []

    for product in product_list:

        result.append(
            product_to_dict(product)
        )

    return jsonify({
        "success": True,
        "count": len(result),
        "products": result
    }), 200


# ==========================================
# SEARCH PRODUCTS
# ==========================================

@products.route("/api/products/search", methods=["GET"])
def search_products():

    query = request.args.get(
        "q",
        ""
    ).strip().lower()

    if not query:

        return jsonify({
            "success": False,
            "message": "Search query is required."
        }), 400

    search_words = query.split()

    all_products = Product.query.all()

    matched_products = []

    for product in all_products:

        name = (
            product.name or ""
        ).lower()

        description = (
            product.description or ""
        ).lower()

        category = (
            product.category or ""
        ).lower()

        brand = (
            product.brand or ""
        ).lower()

        model = (
            product.model or ""
        ).lower()

        keywords = (
            product.keywords or ""
        ).lower()

        score = 0

        # ==================================
        # EXACT PHRASE IN PRODUCT NAME
        # ==================================

        if query in name:
            score += 20

        # ==================================
        # INDIVIDUAL SEARCH WORDS
        # ==================================

        for word in search_words:

            if word in name:
                score += 10

            if word in category:
                score += 8

            if word in brand:
                score += 7

            if word in model:
                score += 7

            if word in keywords:
                score += 5

            if word in description:
                score += 2

        # ==================================
        # ADD MATCHED PRODUCT
        # ==================================

        if score > 0:

            matched_products.append({
                "product": product,
                "score": score
            })

    # ==================================
    # HIGHEST SCORE FIRST
    # ==================================

    matched_products.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    result = []

    for item in matched_products:

        product = item["product"]

        result.append(
            product_to_dict(product)
        )

    return jsonify({
        "success": True,
        "query": query,
        "count": len(result),
        "products": result
    }), 200


# ==========================================
# GET SINGLE PRODUCT
# ==========================================

@products.route(
    "/api/products/<int:product_id>",
    methods=["GET"]
)
def get_product(product_id):

    product = Product.query.get(
        product_id
    )

    if not product:

        return jsonify({
            "success": False,
            "message": "Product not found."
        }), 404

    return jsonify({
        "success": True,
        "product": product_to_dict(product)
    }), 200


# ==========================================
# RELATED PRODUCTS
# ==========================================

@products.route(
    "/api/products/<int:product_id>/related",
    methods=["GET"]
)
def related_products(product_id):

    current_product = Product.query.get(
        product_id
    )

    if not current_product:

        return jsonify({
            "success": False,
            "message": "Product not found."
        }), 404

    # ==================================
    # SAME CATEGORY PRODUCTS
    # ==================================

    related = Product.query.filter(
        Product.id != current_product.id,
        Product.category == current_product.category
    ).limit(8).all()

    # ==================================
    # FALLBACK PRODUCTS
    # ==================================

    if len(related) < 4:

        related = Product.query.filter(
            Product.id != current_product.id
        ).limit(8).all()

    result = []

    for product in related:

        result.append(
            product_to_dict(product)
        )

    return jsonify({
        "success": True,
        "product_id": current_product.id,
        "products": result
    }), 200