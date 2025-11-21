import { api } from "@/lib/api";
import type { Expositor } from "@/@types";

export const expositoresApi = {
  create: (data: {
    e_expositor: {
      e_evento_id: number;
      e_tipo_expositor_id: number;
      e_segmento_id: number;
      status: string;
      empresa?: string | null;
      cnpj?: string | null;
      nome_completo?: string | null;
      cpf?: string | null;
      responsavel: string;
      email_contato: string;
      telefone_contato: string;
      cidade: string;
      estado: string;
    };
  }) => api.post<Expositor>("/e_expositores", data),

  getById: (id: number) => api.get<Expositor>(`/e_expositores/${id}`),

  update: (id: number, data: Partial<Expositor>) =>
    api.put<Expositor>(`/e_expositores/${id}`, data),
};
