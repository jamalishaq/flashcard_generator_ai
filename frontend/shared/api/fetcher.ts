import { axiosInstance } from "../../lib/axios";
import { refreshToken } from "../../features/auth/api/refreshToken";

export function createApi(
  getAccessToken: () => string | null,
  setAccessToken: (token: string | null) => void
) {
  const api = axiosInstance;

  // Request interceptor
  api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response interceptor
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (error.response?.status === 401 && !error.config.__isRetry) {
        try {
          error.config.__isRetry = true;
          const { accessToken } = await refreshToken();
          setAccessToken(accessToken);

          // Try the original request again
          error.config.headers.Authorization = `Bearer ${accessToken}`;
          return api(error.config);
        } catch (err) {
          setAccessToken(null);
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}
