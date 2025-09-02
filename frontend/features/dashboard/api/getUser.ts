import useAuth from "../../auth/hooks/useAuth";

export async function getPosts() {
  const { api } = useAuth(); // <-- comes from AuthContext
  const { data } = await api.get("/posts");
  return data;
}