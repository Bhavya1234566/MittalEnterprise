const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

export function getProductImageUrl(value) {
  if (!value) return "/product-placeholder.svg";
  if (/^(https?:|data:)/i.test(value)) return value;
  if (value.startsWith("/static/")) return `${API_URL}${value}`;
  const filename = value.split("/").pop();
  return `${API_URL}/static/uploads/products/${encodeURIComponent(filename)}`;
}
