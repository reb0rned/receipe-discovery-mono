import { create } from 'zustand'

interface AuthState {
  isLoggedIn: boolean
  token: string | null
  userId: number | null
  login: (token: string, userId: number) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: typeof window !== 'undefined' && !!localStorage.getItem('token'),
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  userId: typeof window !== 'undefined' ? Number(localStorage.getItem('userId')) || null : null,

  login: (token: string, userId: number) => {
    localStorage.setItem('token', token)
    localStorage.setItem('userId', String(userId))
    set({ isLoggedIn: true, token, userId })
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    set({ isLoggedIn: false, token: null, userId: null })
  },
}))
