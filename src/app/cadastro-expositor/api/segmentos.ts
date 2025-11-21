import { api } from "@/lib/api";
import type { Segmento } from "@/@types";

export const segmentosApi = {
  list: () => api.get<Segmento[]>("/e_segmentos"),

  getById: (id: number) => api.get<Segmento>(`/e_segmentos/${id}`),
};
