import create from "zustand";
import { persist } from "zustand/middleware";

export const useUsername = create(
  persist(
    (set, get) => ({
      username: null,

      //on login, writes to the local storage the username
      setUsername: (name) => {
        set((state) => ({ username: name }));
      },
    }),
    { name: "username-storage" }
  )
);
