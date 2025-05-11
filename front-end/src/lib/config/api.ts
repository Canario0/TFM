export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/v1/users/login`,
  LOGOUT: `${API_BASE_URL}/v1/users/logout`,
  CATEGORIES: `${API_BASE_URL}/v1/categories`,
  PRODUCTS: `${API_BASE_URL}/v1/products`,
  REGISTER: `${API_BASE_URL}/v1/users/register`,
} as const;
