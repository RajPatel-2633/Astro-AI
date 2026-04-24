import { create } from 'zustand'

const useAppStore = create((set) => ({
  user: null,
  login: (email) => set({ user: { email } }),
  logout: () => set({ user: null }),
}))

export default useAppStore
