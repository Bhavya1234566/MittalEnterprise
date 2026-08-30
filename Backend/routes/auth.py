from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt

from models import db, User


auth = Blueprint("auth", __name__)
bcrypt = Bcrypt()


# ==========================================
# SIGNUP
# ==========================================

@auth.route("/api/auth/signup", methods=["POST"])
def signup():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "Invalid request."
        }), 400

    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    phone = data.get("phone", "").strip()
    password = data.get("password", "")

    # Required fields
    if not name or not email or not password:
        return jsonify({
            "success": False,
            "message": "Name, email and password are required."
        }), 400

    # Check existing email
    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({
            "success": False,
            "message": "An account with this email already exists."
        }), 409

    # Hash password
    hashed_password = bcrypt.generate_password_hash(
        password
    ).decode("utf-8")

    # Create user
    new_user = User(
        name=name,
        email=email,
        password=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Account created successfully.",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email
        }
    }), 201


# ==========================================
# LOGIN
# ==========================================

@auth.route("/api/auth/login", methods=["POST"])
def login():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "Invalid request."
        }), 400

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({
            "success": False,
            "message": "Email and password are required."
        }), 400

    # Find user
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({
            "success": False,
            "message": "Invalid email or password."
        }), 401

    # Check password
    if not bcrypt.check_password_hash(
        user.password,
        password
    ):
        return jsonify({
            "success": False,
            "message": "Invalid email or password."
        }), 401

    return jsonify({
        "success": True,
        "message": "Login successful.",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }), 200


# ==========================================
# FORGOT PASSWORD - CHECK EMAIL
# ==========================================

@auth.route("/api/auth/forgot-password", methods=["POST"])
def forgot_password():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "Invalid request."
        }), 400

    email = data.get("email", "").strip().lower()

    if not email:
        return jsonify({
            "success": False,
            "message": "Email address is required."
        }), 400

    # Check email in database
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({
            "success": False,
            "message": "No account found with this email."
        }), 404

    # Email exists
    return jsonify({
        "success": True,
        "message": "Email verified. You can reset your password.",
        "user_id": user.id,
        "email": user.email
    }), 200


# ==========================================
# RESET PASSWORD
# ==========================================

@auth.route("/api/auth/reset-password", methods=["POST"])
def reset_password():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "Invalid request."
        }), 400

    email = data.get("email", "").strip().lower()
    new_password = data.get("password", "")
    confirm_password = data.get("confirmPassword", "")

    if not email or not new_password or not confirm_password:
        return jsonify({
            "success": False,
            "message": "All fields are required."
        }), 400

    # Password match
    if new_password != confirm_password:
        return jsonify({
            "success": False,
            "message": "Passwords do not match."
        }), 400

    # Password length
    if len(new_password) < 6:
        return jsonify({
            "success": False,
            "message": "Password must be at least 6 characters."
        }), 400

    # Find user
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({
            "success": False,
            "message": "Account not found."
        }), 404

    # Hash new password
    hashed_password = bcrypt.generate_password_hash(
        new_password
    ).decode("utf-8")

    # Update database
    user.password = hashed_password

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Password updated successfully."
    }), 200