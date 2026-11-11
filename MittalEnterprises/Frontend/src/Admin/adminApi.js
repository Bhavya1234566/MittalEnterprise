export const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
export const getAdminToken = () => localStorage.getItem("mittalAdminToken");

export async function adminRequest(path, options = {}) {
  const token = getAdminToken();
  if (!token) {
    if (window.location.pathname.startsWith("/admin") && window.location.pathname !== "/admin/login") {
      window.location.replace("/admin/login");
    }
    throw new Error("Please sign in with your admin account.");
  }

  const headers = { ...(options.headers || {}), Authorization: `Bearer ${token}` };
  if (!(options.body instanceof FormData) && options.body) headers["Content-Type"] = "application/json";

  const response = await fetch(`${API_URL}/api/admin${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));

  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("mittalAdminToken");
    localStorage.removeItem("mittalAdminEmail");
    if (window.location.pathname.startsWith("/admin") && window.location.pathname !== "/admin/login") {
      window.location.replace("/admin/login");
    }
    throw new Error(data.message || "Admin session expired. Please login again.");
  }
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}

export const imageUrl = (value) =>
  !value ? "" : value.startsWith("http") ? value : `${API_URL}${value.startsWith("/") ? value : `/static/uploads/products/${value}`}`;
