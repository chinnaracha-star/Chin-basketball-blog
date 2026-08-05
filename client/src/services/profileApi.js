import axios from "axios";
import { getStoredToken } from "./authApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export async function updateProfileOnServer({ name, username, imageFile }) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("username", username);

  if (imageFile) {
    formData.append("imageFile", imageFile);
  }

  const token = getStoredToken();
  const { data } = await axios.put(`${API_BASE_URL}/profiles`, formData, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  return data;
}
