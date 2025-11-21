import { api } from "@/src/lib/api"
import type { Segmento } from "@/src/@types"

export const segmentosApi = {
  list: () => api.get<Segmento[]>("/e_segmentos"),

  getById: (id: number) => api.get<Segmento>(`/e_segmentos/${id}`),
}
