import { api } from "@/lib/api";
import type { TipoExpositor } from "@/@types";

export const tiposExpositoresApi = {
  list: () => api.get<TipoExpositor[]>("/e_tipo_expositores"),

  getById: (id: number) => api.get<TipoExpositor>(`/e_tipo_expositores/${id}`),

  create: (data: Partial<TipoExpositor>) =>
    api.post<TipoExpositor>("/e_tipo_expositores", data),

  update: (id: number, data: Partial<TipoExpositor>) =>
    api.put<TipoExpositor>(`/e_tipo_expositores/${id}`, data),

  delete: (id: number) => api.delete(`/e_tipo_expositores/${id}`),
};
