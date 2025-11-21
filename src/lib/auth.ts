import type { LoginResponse } from "@/@types";
import { api } from "./api";

export const auth = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const json = await api.post<any>("/auth/login", {
        email,
        password,
      });

      // DEBUG CORRETO
      console.log("LOGIN RESPONSE =>", json);

      // Suporta JsonResponse e formato direto
      const data = json.data ?? json;

      if (!data?.token) {
        throw new Error(json?.message || "Token não retornado pela API");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return data as LoginResponse;
    } catch (err: any) {
      throw new Error(err.message || "Erro inesperado no login");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  isAuthenticated: () => !!localStorage.getItem("token"),

  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  getToken: () => localStorage.getItem("token"),
};
