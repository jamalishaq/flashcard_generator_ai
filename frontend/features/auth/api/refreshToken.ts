import { axiosInstance } from "../../../lib/axios";

const api = axiosInstance;

export async function refreshToken() {
  const { data } = await api.post("/auth/token/refresh/");
  return data;
}