# Mittal Enterprises Admin

The admin interface is a React page served by the same Vite frontend as the customer store.
It is **not** a separate Flask webpage.

- Customer website: `http://localhost:5173/`
- Admin sign-in: `http://localhost:5173/admin/login`
- Admin dashboard: `http://localhost:5173/admin/dashboard` (after successful sign-in)
- Flask is an API only: `http://127.0.0.1:5000`

## Start

1. In PowerShell, start Flask from the Backend folder:
   ```powershell
   cd Backend
   .\\venv\\Scripts\\Activate.ps1
   py app.py
   ```
2. In a second PowerShell window, start the React frontend:
   ```powershell
   cd Frontend
   npm run dev
   ```
3. Open `http://localhost:5173/admin/login` in your browser.

## Admin credentials

Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `Backend/.env`. The values in `.env.example` are placeholders only. Restart Flask after changing `.env`.

If an old/invalid admin token was stored in the browser, the app now clears it after a 401/403 response and returns to the frontend admin login page.
