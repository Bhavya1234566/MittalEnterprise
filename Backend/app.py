from flask import Flask
from flask_cors import CORS

from config import Config
from models import db
from routes.auth import auth, bcrypt


app = Flask(__name__)

# Configuration
app.config.from_object(Config)

# Database
db.init_app(app)

# Password hashing
bcrypt.init_app(app)

# React frontend
CORS(app)


# Authentication routes
app.register_blueprint(auth)


@app.route("/")
def home():

    return {
        "message": "Mittal Enterprises Backend is running!"
    }


if __name__ == "__main__":

    with app.app_context():

        db.create_all()

    app.run(
        debug=True
    )