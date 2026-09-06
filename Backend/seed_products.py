from app import app
from models import db, Product


products_data = [
    {
        "id": 1,
        "name": "Premium Oil Seals & Rubber Rings",
        "description": "High-quality oil seals and rubber rings for Mahindra tractor models.",
        "brand": "Mahindra",
        "category": "Oil Seals",
        "badge": "Bestseller",
        "image": "oil_seal_and_rubber_parts1.png",
        "new_price": 50,
        "old_price": 80,
        "sku": "ME-OS-001",
        "material": "Nitrile Rubber (NBR)",
        "weight": "250 gm",
        "warranty": "12 Months",
        "features": [
            "Leak Proof Design",
            "Heat Resistant",
            "Long Service Life",
            "OEM Quality",
            "High Pressure Resistant"
        ],
        "applications": [
            "Mahindra Tractor",
            "Hydraulic System",
            "Engine Assembly",
            "Transmission"
        ],
        "keywords": "oil seal rubber rings mahindra tractor",
        "stock": 10
    },

    {
        "id": 2,
        "name": "Premium Oil Seals & Rubber Rings",
        "description": "Industrial grade rubber O-rings for John Deere tractors.",
        "brand": "John Deere",
        "category": "Oil Seals",
        "badge": "Bestseller",
        "image": "oil seal and rubber parts2.png",
        "new_price": 85,
        "old_price": 120,
        "sku": "JD-OS-002",
        "material": "Nitrile Rubber",
        "weight": "300 gm",
        "warranty": "12 Months",
        "features": [
            "High Durability",
            "Oil Resistant",
            "Leak Proof",
            "OEM Finish",
            "Long Life"
        ],
        "applications": [
            "John Deere Tractor",
            "Engine",
            "Gear Box",
            "Hydraulic Pump"
        ],
        "keywords": "oil seal rubber o rings john deere tractor",
        "stock": 10
    },

    {
        "id": 3,
        "name": "Crankshaft Oil Seal",
        "description": "Durable oil seal for Sonalika tractor models.",
        "brand": "Sonalika",
        "category": "Oil Seals",
        "badge": "Bestseller",
        "image": "oil seal and rubber parts3.png",
        "new_price": 60,
        "old_price": 100,
        "sku": "SO-OS-003",
        "material": "NBR Rubber",
        "weight": "220 gm",
        "warranty": "12 Months",
        "features": [
            "Heat Resistant",
            "Leak Proof",
            "High Strength",
            "Long Life",
            "OEM Standard"
        ],
        "applications": [
            "Sonalika Tractor",
            "Crankshaft",
            "Engine",
            "Transmission"
        ],
        "keywords": "crankshaft oil seal sonalika tractor engine",
        "stock": 10
    },

    {
        "id": 4,
        "name": "Engine Rubber Gasket",
        "description": "Multi-purpose rubber gasket for New Holland tractors.",
        "brand": "New Holland",
        "category": "Rubber Parts",
        "badge": "Bestseller",
        "image": "oil seal and rubber parts4.png",
        "new_price": 100,
        "old_price": 150,
        "sku": "NH-RP-004",
        "material": "Synthetic Rubber",
        "weight": "350 gm",
        "warranty": "12 Months",
        "features": [
            "Flexible",
            "Heat Resistant",
            "OEM Quality",
            "Long Lasting",
            "Easy Installation"
        ],
        "applications": [
            "New Holland Tractor",
            "Engine",
            "Cylinder Head",
            "Hydraulic Unit"
        ],
        "keywords": "engine rubber gasket new holland tractor",
        "stock": 10
    },

    {
        "id": 5,
        "name": "Premium Gear Parts",
        "description": "Heavy-duty precision gear parts for Swaraj tractors.",
        "brand": "Swaraj",
        "category": "Gear Parts",
        "badge": "Bestseller",
        "image": "gear_part_1.png",
        "new_price": 45,
        "old_price": 70,
        "sku": "SW-GP-005",
        "material": "Alloy Steel",
        "weight": "700 gm",
        "warranty": "18 Months",
        "features": [
            "Precision Cut",
            "Rust Resistant",
            "Heavy Duty",
            "Long Service Life",
            "OEM Quality"
        ],
        "applications": [
            "Swaraj Tractor",
            "Gear Box",
            "Transmission",
            "Rear Axle"
        ],
        "keywords": "gear parts swaraj tractor gear box",
        "stock": 10
    },

    {
        "id": 6,
        "name": "Rubber Gasket Set",
        "description": "Multi-purpose rubber gaskets for tractor engines.",
        "brand": "Mahindra",
        "category": "Rubber Parts",
        "badge": "Popular",
        "image": "rubber_ring1.webp",
        "new_price": 30,
        "old_price": 50,
        "sku": "ME-RP-006",
        "material": "Rubber",
        "weight": "180 gm",
        "warranty": "6 Months",
        "features": [
            "Flexible",
            "Oil Resistant",
            "Leak Proof",
            "Easy Fit",
            "OEM Finish"
        ],
        "applications": [
            "Mahindra Tractor",
            "Engine",
            "Cylinder Head",
            "Hydraulic Unit"
        ],
        "keywords": "rubber gasket set mahindra tractor engine",
        "stock": 10
    },

    {
        "id": 7,
        "name": "Differential Gear Pair",
        "description": "Precision-cut differential gears for tractor rear axle.",
        "brand": "John Deere",
        "category": "Gears",
        "badge": "Popular",
        "image": "gear_part_2.png",
        "new_price": 110,
        "old_price": 160,
        "sku": "JD-GR-007",
        "material": "Forged Steel",
        "weight": "1.5 Kg",
        "warranty": "18 Months",
        "features": [
            "Heavy Duty",
            "Precision Teeth",
            "Rust Resistant",
            "Long Lasting",
            "OEM Standard"
        ],
        "applications": [
            "John Deere Tractor",
            "Rear Axle",
            "Gear Box",
            "Differential"
        ],
        "keywords": "differential gear john deere tractor rear axle",
        "stock": 10
    },

    {
        "id": 8,
        "name": "Hydraulic Pump",
        "description": "Heavy duty hydraulic pump.",
        "brand": "Mahindra",
        "category": "Hydraulic",
        "badge": "New",
        "image": "Hydraulic Pump.jpeg",
        "new_price": 150,
        "old_price": 220,
        "sku": "ME-HP-008",
        "material": "Cast Iron",
        "weight": "3 Kg",
        "warranty": "24 Months",
        "features": [
            "High Pressure",
            "Leak Proof",
            "Long Life",
            "OEM Quality",
            "Heavy Duty"
        ],
        "applications": [
            "Mahindra Tractor",
            "Hydraulic Lift",
            "Power Steering",
            "Hydraulic System"
        ],
        "keywords": "hydraulic pump mahindra tractor hydraulic system",
        "stock": 10
    }
]


with app.app_context():

    for data in products_data:

        existing_product = Product.query.filter_by(
            sku=data["sku"]
        ).first()

        if existing_product:
            print(f"Already exists: {data['name']}")
            continue

        product = Product(**data)

        db.session.add(product)

    db.session.commit()

    print("Products added successfully!")