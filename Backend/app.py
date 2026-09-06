from flask import Flask
from flask_cors import CORS

from config import Config
from models import db

from routes.auth import auth, bcrypt
from routes.products import products
from routes.wishlist import wishlist
from routes.cart import cart


app = Flask(__name__)

app.config.from_object(Config)

# ==========================================================
# DATABASE
# ==========================================================

db.init_app(app)

# ==========================================================
# BCRYPT
# ==========================================================

bcrypt.init_app(app)

# ==========================================================
# CORS
# ==========================================================

CORS(app)

# ==========================================================
# BLUEPRINTS
# ==========================================================

app.register_blueprint(auth)

app.register_blueprint(products)

app.register_blueprint(wishlist)

app.register_blueprint(cart)


# ==========================================================
# HOME
# ==========================================================

@app.route("/")
def home():

    return {
        "message":
        "Mittal Enterprises Backend is running!"
    }


# ==========================================================
# START SERVER
# ==========================================================

if __name__ == "__main__":

    with app.app_context():

        db.create_all()

    app.run(
        debug=True
    )