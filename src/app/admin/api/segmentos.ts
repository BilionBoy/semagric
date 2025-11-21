import { api } from "@/lib/api";
import type { Segmento } from "@/@types";

export const segmentosApi = {
  list: () => api.get<any>("/e_segmentos"),

  getById: (id: number) => api.get<any>(`/e_segmentos/${id}`),

  create: (data: Partial<Segmento>) =>
    api.post<any>("/e_segmentos", {
      e_segmento: data,
    }),

  update: (id: number, data: Partial<Segmento>) =>
    api.put<any>(`/e_segmentos/${id}`, {
      e_segmento: data,
    }),

  delete: (id: number) => api.delete(`/e_segmentos/${id}`),
};
