# Mittal Enterprises - Local Setup

Project folders:
- `Frontend/` - customer website and React admin screens (`/admin/login`).
- `Backend/` - Flask API, SQLAlchemy models, database access and uploaded images.
- `Admin/` - separate Python launcher and setup notes for the admin API.

## 1. Backend setup (PowerShell)

```powershell
cd Backend
py -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
```

Edit `Backend/.env` and set your MySQL database URL, secret key, admin email and admin password. Create the `mittal_enterprises` database in phpMyAdmin if it does not already exist.

Start the backend:

```powershell
python app.py
```

The API runs at `http://127.0.0.1:5000`.

## 2. Move product images into Backend storage

Make sure the database exists and the backend environment is active. From the `Backend` folder run:

```powershell
python migrate_product_images.py
```

This copies existing product image files from `Frontend/src/Components/assets` into `Backend/static/uploads/products` and updates each product's `image` value. Product cards on Home, PLP and PDP then use the backend image URL.

## 3. Frontend setup

Open another terminal:

```powershell
cd Frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal (normally `http://localhost:5173`).

## 4. Admin

Set these values in `Backend/.env`:

```env
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=use-a-strong-password
SECRET_KEY=replace-with-a-long-random-secret
```

Open `http://localhost:5173/admin/login`. Admin API routes are protected and are served by the Flask backend. The separate `Admin/run_admin.py` launcher can be used to start that API from the project root after activating `Backend/venv`.

## Notes

- Do not upload `.env`, `venv/`, `node_modules/`, or database backups to source control.
- Back up your database before running image migration or schema changes.
- `db.create_all()` creates missing tables; it does not alter existing table columns.


## Inventory management
- Dashboard Low stock items opens the products page filtered to stock <= 5.
- In Products, use + / − for one-unit adjustments or Edit to enter a quantity directly.
- Zero stock disables Add to Cart and Buy Now. Customers can request a restock reminder.
- When stock changes from 0 to a positive value, the customer receives an in-app toast on their next visit (the app checks every 30 seconds while signed in). Optional email delivery uses MAIL_SERVER, MAIL_PORT, MAIL_USERNAME and MAIL_PASSWORD.
- Checkout revalidates available quantity on the backend. COD orders decrement inventory at order placement; online orders decrement after payment verification.
