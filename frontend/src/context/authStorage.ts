export const STORAGE_KEYS = {
  USER: "user",
  TOKEN: "token",
} as const;

export const storage = {
  getUser: () => {
    try {
      const userStr = localStorage.getItem(STORAGE_KEYS.USER);
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },
  setUser: (fullName: string, isAdmin: boolean) => {
    const user = { fullName, is_admin: isAdmin };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },
  clearAuth: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  },
};
