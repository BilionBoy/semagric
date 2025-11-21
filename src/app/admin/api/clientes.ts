import { api } from "@/lib/api";
import type { Cliente, CreateClienteDTO } from "@/@types";

export const clientesApi = {
  list: () => api.get<Cliente[]>("/e_clientes"),

  getById: (id: number) => api.get<Cliente>(`/e_clientes/${id}`),

  getByExpositor: (expositorId: number) =>
    api.get<Cliente[]>(`/e_clientes?e_expositor_id=${expositorId}`),

  // ✅ AGORA ESSE MÉTODO ACEITA DIRETAMENTE OS CAMPOS
  create: (data: CreateClienteDTO) =>
    api.post<Cliente>("/e_clientes", {
      e_cliente: data,
    }),

  update: (id: number, data: Partial<Cliente>) =>
    api.put<Cliente>(`/e_clientes/${id}`, {
      e_cliente: data,
    }),

  delete: (id: number) => api.delete(`/e_clientes/${id}`),
};
