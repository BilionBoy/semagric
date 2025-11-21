import { api } from "@/lib/api";
import type { Negociacao } from "@/@types";

export const negociacoesApi = {
  list: () => api.get<Negociacao[]>("/e_negociacoes"),

  getById: (id: number) => api.get<Negociacao>(`/e_negociacoes/${id}`),

  // ✅ ADICIONE ISSO
  getByExpositor: (expositorId: number) =>
    api.get<Negociacao[]>(`/e_negociacoes?e_expositor_id=${expositorId}`),

  create: (data: Partial<Negociacao>) =>
    api.post<Negociacao>("/e_negociacoes", data),

  update: (id: number, data: Partial<Negociacao>) =>
    api.put<Negociacao>(`/e_negociacoes/${id}`, data),

  delete: (id: number) => api.delete(`/e_negociacoes/${id}`),
};
