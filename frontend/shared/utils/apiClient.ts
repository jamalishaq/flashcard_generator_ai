// shared/api.ts
import axios from "axios";
import { refreshToken } from "../../features/auth";

export function createApi(getAccessToken: () => string | null, setAccessToken: (token: string | null) => void) {
  const api = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true, // send cookies (refresh token)
  });

  // Attach access token before requests
  api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Handle expired tokens (401)
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (error.response?.status === 401 && !error.config.__isRetry) {
        try {
          error.config.__isRetry = true; // prevent infinite loop

          const { accessToken } = await refreshToken();
          setAccessToken(accessToken);

          // Retry original request with new token
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


// api.interceptors.response.use(
//     (res) => res,
//     async (error) => {
//       if (error.response?.status === 401 && !error.config.__isRetry) {
//         error.config.__isRetry = true;
//         const newToken = await tryRefresh(); // 👈 ask provider to refresh
//         if (newToken) {
//           error.config.headers.Authorization = `Bearer ${newToken}`;
//           return api(error.config); // retry original request
//         }
//       }
//       return Promise.reject(error);
//     }
//   );