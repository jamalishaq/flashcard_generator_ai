import { axiosInstance } from "../../../lib/axios";

const api = axiosInstance;

export async function register(credentials: {
  email: string;
  password: string;
}) {
  const { data } = await api.post("/auth/register/", credentials);
  return data;
}