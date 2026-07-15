import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";

const STORAGE_KEY = "chin-basketball-blog-auth";

function readStoredAuth() {
  if (typeof window === "undefined") return false;

  return window.localStorage.getItem(STORAGE_KEY) === "true";
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(readStoredAuth);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, String(isLoggedIn));
  }, [isLoggedIn]);

  const value = useMemo(
    () => ({
      isLoggedIn,
      login() {
        setIsLoggedIn(true);
      },
      logout() {
        setIsLoggedIn(false);
      },
    }),
    [isLoggedIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
