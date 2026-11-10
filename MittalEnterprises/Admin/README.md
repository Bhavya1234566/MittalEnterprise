# Mittal Enterprises Admin

The Admin area is kept separate from the customer Frontend and the Backend API.
The admin screens are in `Frontend/src/Admin` and are available at `/admin` and `/admin/login`.
The Python launcher in this folder starts the Flask API that powers those screens.

## Start the admin API

1. Open PowerShell in the project root.
2. Activate the backend environment: `Backend\\venv\\Scripts\\Activate.ps1`
3. Run: `python Admin\\run_admin.py`
4. Start the React frontend in another terminal: `cd Frontend` then `npm run dev`.
5. Open `http://localhost:5173/admin/login`.

Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `SECRET_KEY` in `Backend/.env` before logging in.
