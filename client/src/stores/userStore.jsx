import { create } from "zustand"

export const useUserStore = create((set) => ({
  userId: null,
  username: "",

  setUser: (id, name) => set({ userId: id, username: name }),
}))
