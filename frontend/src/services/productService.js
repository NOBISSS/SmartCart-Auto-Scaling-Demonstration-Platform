
const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

async function request(path) {
  const response = await fetch(`${API_URL}${path}`);
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || `Request failed: ${response.status}`);
  }

  return data;
}

export const getProducts = () => request("/api/products");
export const checkBackendHealth = () => request("/health");
