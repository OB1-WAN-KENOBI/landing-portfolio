import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import type { ApiUser } from "../../../shared/api/http/types";
import { mockAuth } from "../../../shared/api/mocks/mockAuth";
import { storage } from "../../../shared/lib/storage/localStorage";

interface AuthContextType {
  user: ApiUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "portfolio_auth_user";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Восстанавливаем user из localStorage при инициализации
  useEffect(() => {
    const validator = (value: unknown): value is ApiUser => {
      return (
        typeof value === "object" &&
        value !== null &&
        "id" in value &&
        "name" in value &&
        "email" in value &&
        "role" in value &&
        typeof (value as ApiUser).id === "string" &&
        typeof (value as ApiUser).name === "string" &&
        typeof (value as ApiUser).email === "string" &&
        ((value as ApiUser).role === "admin" ||
          (value as ApiUser).role === "user")
      );
    };

    const storedUser = storage.get<ApiUser | null>(
      STORAGE_KEY,
      null,
      validator
    );
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const userData = await mockAuth.login(email, password);
      setUser(userData);
      storage.set(STORAGE_KEY, userData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await mockAuth.logout();
      setUser(null);
      storage.remove(STORAGE_KEY);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Logout failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isAdmin, loading, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
