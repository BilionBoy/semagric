import { api } from "@/src/lib/api"

export interface Evento {
  id: number
  nome: string
  descricao: string
  data_inicio: string
  data_fim: string
  local: string
  status: string
}

export const eventosApi = {
  list: () => api.get<Evento[]>("/e_eventos"),

  getById: (id: number) => api.get<Evento>(`/e_eventos/${id}`),

  create: (data: Partial<Evento>) => api.post<Evento>("/e_eventos", data),

  update: (id: number, data: Partial<Evento>) => api.put<Evento>(`/e_eventos/${id}`, data),

  delete: (id: number) => api.delete(`/e_eventos/${id}`),
}
