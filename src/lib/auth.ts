import { api } from "@/lib/api";

export const auth = {
  loginAdmin: async (email: string, password: string) => {
    const json = await api.post<any>("/auth/login", { email, password });
    const data = json.data ?? json;

    if (!data?.token) throw new Error("Token não retornado");

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", "admin");
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  },

  loginExpositor: async (email: string, password: string) => {
    const json = await api.post<any>("/expositor/login", { email, password });
    const data = json.data ?? json;

    if (!data?.token) throw new Error("Token não retornado");

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", "expositor");
    localStorage.setItem("user", JSON.stringify(data.expositor));

    return data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
  },

  getToken: () => localStorage.getItem("token"),

  getRole: () => localStorage.getItem("role"),

  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  getExpositorIdFromToken: () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.expositor_id ?? null;
    } catch {
      return null;
    }
  },
};
