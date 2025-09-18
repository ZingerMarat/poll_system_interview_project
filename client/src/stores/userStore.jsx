import { create } from "zustand"

export const useUserStore = create((set) => ({
  userId: null,

  setUser: (id) => set({ userId: id }),
}))
