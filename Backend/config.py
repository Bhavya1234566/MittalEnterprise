import os
from dotenv import load_dotenv

load_dotenv()


class Config:

    SQLALCHEMY_DATABASE_URI = (
        "mysql+pymysql://root:@localhost/mittal_enterprises"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Used for password reset token
    SECRET_KEY = os.getenv(
        "SECRET_KEY",
        "mittal-enterprises-secret-key-change-this"
    )

    # Email settings
    MAIL_SERVER = "smtp.gmail.com"
    MAIL_PORT = 587
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")