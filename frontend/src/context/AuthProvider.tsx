import { useState, type ReactNode } from "react";
import { AuthContext, type User, getInitialAuthState } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const initial = getInitialAuthState();
  const [user, setUser] = useState<User | null>(initial.user);
  const [token, setToken] = useState<string | null>(initial.token);

  const login = (userData: User, jwt: string) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem("token", jwt);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: !!user?.is_admin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
