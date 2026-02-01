/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import { storage } from "./authStorage";

interface AuthContextType {
  username: string | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  login: (fullName: string, isAdmin: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => {
      const user = storage.getUser();
      if (user) {
        setUsername(user.fullName);
        setIsAdmin(user.is_admin);
      } else {
        setUsername(null);
        setIsAdmin(false);
      }
    });
  }, []);

  const login = useCallback((fullName: string, isAdmin: boolean) => {
    setUsername(fullName);
    setIsAdmin(isAdmin);
    storage.setUser(fullName, isAdmin);
  }, []);

  const logout = useCallback(() => {
    setUsername(null);
    setIsAdmin(false);
    storage.clearAuth();
  }, []);

  const value: AuthContextType = {
    username,
    isAdmin,
    isAuthenticated: username !== null,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
