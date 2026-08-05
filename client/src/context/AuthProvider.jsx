import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  clearStoredToken,
  getCurrentUser,
  getStoredToken,
  loginUser,
  storeToken,
} from "../services/authApi";

const PROFILE_STORAGE_KEY = "chin-basketball-blog-profile";

function getUserStorageId(user) {
  return user?.id || user?.email;
}

function mergeStoredProfile(user) {
  try {
    const storedValue = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!storedValue) return user;

    const storedProfile = JSON.parse(storedValue);
    if (storedProfile.ownerId !== getUserStorageId(user)) return user;

    return { ...user, ...storedProfile.profile };
  } catch {
    return user;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(Boolean(getStoredToken()));

  useEffect(() => {
    const token = getStoredToken();
    if (!token) return;

    getCurrentUser()
      .then((currentUser) => setUser(mergeStoredProfile(currentUser)))
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
          const userWithProfile = mergeStoredProfile(currentUser);
          setUser(userWithProfile);
          return userWithProfile;
        } catch (error) {
          clearStoredToken();
          throw error;
        }
      },
      logout() {
        clearStoredToken();
        setUser(null);
      },
      updateProfile(profile) {
        setUser((currentUser) => {
          if (!currentUser) return currentUser;

          const nextUser = { ...currentUser, ...profile };
          window.localStorage.setItem(
            PROFILE_STORAGE_KEY,
            JSON.stringify({
              ownerId: getUserStorageId(currentUser),
              profile,
            }),
          );
          return nextUser;
        });
      },
    }),
    [isAuthLoading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
