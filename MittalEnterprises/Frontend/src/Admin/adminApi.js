export const API_URL = "http://127.0.0.1:5000";
export const getAdminToken = () => localStorage.getItem("mittalAdminToken");
export async function adminRequest(path, options = {}) {
  const headers = { ...(options.headers || {}), Authorization: `Bearer ${getAdminToken()}` };
  if (!(options.body instanceof FormData) && options.body) headers["Content-Type"] = "application/json";
  const response = await fetch(`${API_URL}/api/admin${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}
export const imageUrl = (value) => !value ? "" : value.startsWith("http") ? value : `${API_URL}${value.startsWith("/") ? value : `/static/uploads/products/${value}`}`;
