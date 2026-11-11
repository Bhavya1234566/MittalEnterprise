# Mittal Enterprises – Feature updates

## Included changes
- Signup validation: full name, valid email, 10-digit Indian mobile number, strong password (8+ characters with uppercase, lowercase, number and special character), and confirm-password match. Backend validates the same rules and stores the phone number.
- Product stock quantity is no longer displayed on the customer-facing PDP specifications. Admin stock management remains available.
- Language selector for English, Hindi and Punjabi using the Google Translate website widget. An internet connection is required; translation quality is provided by Google Translate.
- Dark/light mode toggle, with the selected theme saved in the browser.
- Checkout shipping pincode lookup: entering a valid 6-digit Indian PIN automatically fills district/city and state. City and state remain editable. Lookup uses the India Post public pincode endpoint and requires internet access.

## Run the project
1. Create the MySQL database named `mittal_enterprises` (or update `DATABASE_URL`).
2. In `Backend`, copy `.env.example` to `.env` and set your own database URL, secret key and admin credentials. Never commit `.env`.
3. Open a terminal in `Backend`: `py -m venv venv`, activate it with `venv\Scripts\Activate.ps1`, run `pip install -r requirements.txt`, then `py app.py`.
4. Open another terminal in `Frontend`: run `npm install`, then `npm run dev`.
5. Open the Vite URL shown in the terminal. Backend API default is `http://127.0.0.1:5000`.

## Important notes
- The uploaded project's actual `.env` file has intentionally not been included in this ZIP to protect credentials. Make a local copy from `.env.example`.
- The checkout pincode lookup fills city/state from the first matching India Post delivery office. If the public service is unavailable, enter city/state manually.
- Browser language translation is a third-party Google Translate feature, not a professionally reviewed translation.
- Stock remains available in the admin area and backend for inventory control; only customer PDP display is hidden.


## Admin and dark-mode corrections (11 Nov 2026)

- Admin sign-in is served by the React frontend at `http://localhost:5173/admin/login`.
- The store navigation and customer login page now both link to Admin Login.
- The admin login screen uses the same login-page design as the customer frontend.
- Flask remains an API at `http://127.0.0.1:5000`; it is not an admin webpage.
- Invalid/expired admin tokens are cleared after 401/403 and the browser returns to `/admin/login`.
- Dark-mode hero heading text and login/admin screens use readable high-contrast colors.


## Inventory and restock alerts
- Low stock is defined as 5 or fewer units; zero stock is out of stock.
- Admin dashboard's Low stock items card opens the filtered product inventory list.
- Admin can adjust stock with + / − controls or the stock quantity field.
- Customers cannot add out-of-stock products to cart or place orders above available stock.
- Customers can request a restock reminder on an out-of-stock product page. When admin raises stock from zero to a positive quantity, the customer gets an in-app toast on their next visit. Optional email notifications can be enabled with MAIL_SERVER, MAIL_PORT, MAIL_USERNAME and MAIL_PASSWORD in Backend/.env.
- COD orders decrement stock when placed; online orders decrement stock only after Razorpay payment verification.
