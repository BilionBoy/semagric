import { api } from "./api"
import type { LoginResponse } from "@/src/@types"

export const auth = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", { email, password })
    if (response.token) {
      localStorage.setItem("token", response.token)
      localStorage.setItem("user", JSON.stringify(response.user))
    }
    return response
  },

  logout: (): void => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  },

  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false
    return !!localStorage.getItem("token")
  },

  getUser: (): any => {
    if (typeof window === "undefined") return null
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  },

  getToken: (): string | null => {
    if (typeof window === "undefined") return null
    return localStorage.getItem("token")
  },
}
