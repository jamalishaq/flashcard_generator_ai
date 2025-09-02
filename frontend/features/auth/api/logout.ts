import { axiosInstance } from "../../../lib/axios";

const api = axiosInstance;


export async function logout() {
  await api.post("/auth/logout/");
}