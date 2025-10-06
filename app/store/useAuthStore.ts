import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { User } from "~/models/user";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }, false, "setUser"),
        clearUser: () => set({ user: null }, false, "clearUser")
      }),
      {
        name: "auth-storage" // localStorage key
      }
    ),
    { name: "AuthStore" } // <-- appears in Redux DevTools
  )
);
