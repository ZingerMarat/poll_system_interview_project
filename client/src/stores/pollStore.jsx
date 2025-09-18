import { create } from "zustand"
import { api } from "../endpoints/api.js"
import { useUserStore } from "../stores/userStore.jsx"

const userId = useUserStore.getState().userId

export const usePollsStore = create((set, get) => ({
  polls: [],
  loading: false,

  loadPolls: async (userId) => {
    if (!userId) return
    set({ loading: true })
    try {
      const res = await api.get(`/user/polls/${userId}`)
      set({ polls: res.data })
    } catch (err) {
      console.error(err)
    } finally {
      set({ loading: false })
    }
  },
}))
