import axios from "axios";
import { getApiBaseUrl } from "../lib/apiBaseUrl";
import { getStoredToken } from "./authApi";

const API_BASE_URL = getApiBaseUrl();

export async function createPostWithImage({
  title,
  categoryId,
  description,
  content,
  statusId,
  imageFile,
}) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("category_id", String(categoryId));
  formData.append("description", description);
  formData.append("content", content);
  formData.append("status_id", String(statusId));
  formData.append("imageFile", imageFile);

  const token = getStoredToken();
  const { data } = await axios.post(`${API_BASE_URL}/posts`, formData, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  return data;
}
