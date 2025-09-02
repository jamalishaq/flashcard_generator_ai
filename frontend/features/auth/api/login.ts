import { axiosInstance } from "../../../lib/axios";

const api = axiosInstance;

export async function login(credentials: {
  email: string;
  password: string;
}) {
  const { data } = await api.post("/auth/token/", credentials);
  console.log('login', data)
  return data;
}