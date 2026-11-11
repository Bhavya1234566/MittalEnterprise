"""Copy product images into Flask static storage and update DB paths.
Run from Backend after setting DATABASE_URL in .env and backing up the database.
"""
from pathlib import Path
import shutil
from app import app
from models import db, Product

BACKEND_DIR = Path(__file__).resolve().parent
ASSET_DIR = BACKEND_DIR.parent / "Frontend" / "src" / "Components" / "assets"
PRODUCT_DIR = BACKEND_DIR / "static" / "uploads" / "products"
PRODUCT_DIR.mkdir(parents=True, exist_ok=True)

# Copy all image files from the existing product asset directory into Backend.
allowed = {".png", ".jpg", ".jpeg", ".webp", ".gif"}
source_by_lower_name = {}
for source in ASSET_DIR.rglob("*"):
    if source.is_file() and source.suffix.lower() in allowed:
        source_by_lower_name[source.name.lower()] = source
        destination = PRODUCT_DIR / source.name
        if not destination.exists():
            shutil.copy2(source, destination)

with app.app_context():
    updated = 0
    missing = []
    for product in Product.query.all():
        current = (product.image or "").replace("\\", "/")
        filename = current.rsplit("/", 1)[-1]
        source = source_by_lower_name.get(filename.lower())
        if source is None:
            # Also support a matching filename already present in the target folder.
            target_match = next((p for p in PRODUCT_DIR.iterdir() if p.is_file() and p.name.lower() == filename.lower()), None)
            if target_match is None:
                if filename:
                    missing.append(f"Product {product.id}: {filename}")
                continue
            filename = target_match.name
        else:
            filename = source.name
        product.image = f"/static/uploads/products/{filename}"
        updated += 1
    db.session.commit()
    print(f"Copied product images to: {PRODUCT_DIR}")
    print(f"Updated {updated} product image paths.")
    if missing:
        print("Images not found (check these product records):")
        for item in missing:
            print(f" - {item}")
