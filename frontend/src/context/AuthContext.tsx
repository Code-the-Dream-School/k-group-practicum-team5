import { createContext } from "react";
import { storage } from "./authStorage";

export function getInitialAuthState() {
  const user = storage.getUser();
  const token = localStorage.getItem("token");
  return { user, token };
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  is_admin: boolean;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
