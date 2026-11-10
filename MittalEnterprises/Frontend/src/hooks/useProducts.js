import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_URL}/api/products/`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Products API returned ${response.status}`);
        return response.json();
      })
      .then((data) => setProducts(Array.isArray(data.products) ? data.products : []))
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message || "Could not load products");
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  return { products, loading, error };
}
