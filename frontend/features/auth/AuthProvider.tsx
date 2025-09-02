import {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useMemo,
} from "react";
import { login, register, logout, refreshToken } from "./api";
import { createApi } from "@shared/api/fetcher";
import { User } from "./types";

export type AuthContextValue = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  api: ReturnType<typeof createApi>;
  loginUser: (creds: { email: string; password: string }) => Promise<void>;
  registerUser: (creds: { email: string; password: string }) => Promise<void>;
  logoutUser: () => Promise<void>;
  tryRefresh: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user && !!accessToken;

  const api = useMemo(
    () => createApi(() => accessToken, setAccessToken),
    [accessToken]
  );

  // 🔄 Refresh logic
  const tryRefresh = useCallback(async () => {
    try {
      const { accessToken, user } = await refreshToken();
      setAccessToken(accessToken);
      setUser(user);
    } catch {
      setAccessToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("Refreshed")
    tryRefresh(); // run on mount
  }, [tryRefresh]);

  useEffect(() => {
    if (!accessToken) return;

    try {
      const { exp } = JSON.parse(atob(accessToken.split(".")[1]));
      const expiry = exp * 1000;

      const timeout = setTimeout(() => {
        tryRefresh();
      }, expiry - Date.now() - 60_000); // refresh 1 min early

      return () => clearTimeout(timeout);
    } catch {
      // invalid token format → force logout
      setAccessToken(null);
      setUser(null);
    }
  }, [accessToken, tryRefresh]);

  const loginUser = async (creds: { email: string; password: string }) => {
    const { accessToken, user } = await login(creds);
    setAccessToken(accessToken);
    setUser(user);
  };

  const registerUser = async (creds: { email: string; password: string }) => {
    const { accessToken, user } = await register(creds);
    setAccessToken(accessToken);
    setUser(user);
  };

  const logoutUser = async () => {
    await logout();
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        loading,
        api,
        loginUser,
        registerUser,
        logoutUser,
        tryRefresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
