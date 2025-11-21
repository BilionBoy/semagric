import { api } from "@/lib/api";
import type { Expositor } from "@/@types";

export const expositoresApi = {
  list: () => api.get<Expositor[]>("/e_expositores"),

  getById: (id: number) => api.get<Expositor>(`/e_expositores/${id}`),

  create: (data: Partial<Expositor>) =>
    api.post<Expositor>("/e_expositores", data),

  update: (id: number, data: Partial<Expositor>) =>
    api.put<Expositor>(`/e_expositores/${id}`, data),

  delete: (id: number) => api.delete(`/e_expositores/${id}`),
};
