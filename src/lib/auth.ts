import type { LoginResponse } from "@/@types";
import { api } from "./api";

export const auth = {
  loginAdmin: async (email: string, password: string) => {
    const json = await api.post<any>("/auth/login", { email, password });
    const data = json.data ?? json;

    if (!data?.token) {
      throw new Error(json?.message || "Token não retornado pela API");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", "admin");
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  },

  loginExpositor: async (email: string, password: string) => {
    const json = await api.post<any>("/expositor/login", {
      email,
      password,
    });

    const data = json.data ?? json;

    if (!data?.token) {
      throw new Error(json?.message || "Token não retornado pela API");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", "expositor");
    localStorage.setItem("currentExpositorId", String(data.expositor.id));
    localStorage.setItem("user", JSON.stringify(data.expositor));

    return data;
  },

  logout: () => localStorage.clear(),

  isAuthenticated: () => !!localStorage.getItem("token"),

  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  getToken: () => localStorage.getItem("token"),
  getRole: () => localStorage.getItem("role"),
};
