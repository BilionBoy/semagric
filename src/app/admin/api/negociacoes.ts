import { api } from "@/src/lib/api"
import type { Negociacao } from "@/src/@types"

export const negociacoesApi = {
  list: () => api.get<Negociacao[]>("/e_negociacoes"),

  getById: (id: number) => api.get<Negociacao>(`/e_negociacoes/${id}`),

  create: (data: Partial<Negociacao>) => api.post<Negociacao>("/e_negociacoes", data),

  update: (id: number, data: Partial<Negociacao>) => api.put<Negociacao>(`/e_negociacoes/${id}`, data),

  delete: (id: number) => api.delete(`/e_negociacoes/${id}`),
}
