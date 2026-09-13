import axios from "axios";
import { getApiBaseUrl } from "../lib/apiBaseUrl";
import { getStoredToken } from "./authApi";

const API_BASE_URL = getApiBaseUrl();

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
