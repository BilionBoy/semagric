import { api } from "@/src/lib/api"
import type { Segmento } from "@/src/@types"

export const segmentosApi = {
  list: () => api.get<Segmento[]>("/e_segmentos"),

  getById: (id: number) => api.get<Segmento>(`/e_segmentos/${id}`),

  create: (data: Partial<Segmento>) => api.post<Segmento>("/e_segmentos", data),

  update: (id: number, data: Partial<Segmento>) => api.put<Segmento>(`/e_segmentos/${id}`, data),

  delete: (id: number) => api.delete(`/e_segmentos/${id}`),
}
