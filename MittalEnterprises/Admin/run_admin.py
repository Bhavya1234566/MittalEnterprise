"""Start the Python/Flask API used by the separate React Admin interface.
Run this file from the project root with the Backend virtual environment active.
"""
from pathlib import Path
import sys

PROJECT_ROOT = Path(__file__).resolve().parent.parent
BACKEND_DIR = PROJECT_ROOT / "Backend"
sys.path.insert(0, str(BACKEND_DIR))

from app import app  # noqa: E402
from models import db  # noqa: E402

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="127.0.0.1", port=5000, debug=True)
