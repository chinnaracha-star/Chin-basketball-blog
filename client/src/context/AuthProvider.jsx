import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  clearStoredToken,
  getCurrentUser,
  getStoredToken,
  loginUser,
  storeToken,
} from "../services/authApi";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(Boolean(getStoredToken()));

  useEffect(() => {
    const token = getStoredToken();
    if (!token) return;

    getCurrentUser()
      .then(setUser)
      .catch(() => clearStoredToken())
      .finally(() => setIsAuthLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: Boolean(user),
      isAuthLoading,
      async login(email, password) {
        const result = await loginUser({ email, password });
        storeToken(result.access_token);

        try {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
          return currentUser;
        } catch (error) {
          clearStoredToken();
          throw error;
        }
      },
      logout() {
        clearStoredToken();
        setUser(null);
      },
    }),
    [isAuthLoading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
