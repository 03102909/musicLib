import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { AuthUser } from "../types";
import { loginUser, registerUser } from "../services/api";

type AuthContextType = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isUser: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem("auth_user");
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("auth_token");
  });

  useEffect(() => {
    if (token && user) {
      localStorage.setItem("auth_token", token);
      localStorage.setItem("auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }
  }, [token, user]);

  const login = async (email: string, password: string) => {
    const response = await loginUser(email, password);
    setToken(response.token);
    setUser(response.user);
  };

  const register = async (email: string, password: string, role?: string) => {
    const response = await registerUser(email, password, role);
    setToken(response.token);
    setUser(response.user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isUser: user?.role === "user",
    isAdmin: user?.role === "admin",
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
