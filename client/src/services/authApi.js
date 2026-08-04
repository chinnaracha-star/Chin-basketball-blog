import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
const TOKEN_KEY = "chin-basketball-blog-access-token";

const authApi = axios.create({ baseURL: `${API_BASE_URL}/auth` });

export function getStoredToken() {
  return window.localStorage.getItem(TOKEN_KEY);
}

export function storeToken(token) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearStoredToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

function authHeaders() {
  const token = getStoredToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function registerUser(values) {
  const { data } = await authApi.post("/register", values);
  return data;
}

export async function loginUser(credentials) {
  const { data } = await authApi.post("/login", credentials);
  return data;
}

export async function getCurrentUser() {
  const { data } = await authApi.get("/get-user", { headers: authHeaders() });
  return data;
}

export async function changePassword(oldPassword, newPassword) {
  const { data } = await authApi.put(
    "/reset-password",
    { oldPassword, newPassword },
    { headers: authHeaders() },
  );
  return data;
}

export function getApiError(error, fallback) {
  return error.response?.data?.error || fallback;
}
