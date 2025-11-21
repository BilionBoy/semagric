import { api } from "@/lib/api";
import type { Cliente } from "@/@types";

export const clientesApi = {
  list: () => api.get<Cliente[]>("/e_clientes"),

  getById: (id: number) => api.get<Cliente>(`/e_clientes/${id}`),

  create: (data: Partial<Cliente>) => api.post<Cliente>("/e_clientes", data),

  update: (id: number, data: Partial<Cliente>) =>
    api.put<Cliente>(`/e_clientes/${id}`, data),

  delete: (id: number) => api.delete(`/e_clientes/${id}`),
};
