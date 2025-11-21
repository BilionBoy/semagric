import { api } from "@/src/lib/api"
import type { Negociacao } from "@/src/@types"

export const negociacoesApi = {
  list: () => api.get<Negociacao[]>("/e_negociacoes"),

  getByExpositor: (expositorId: number) =>
    api.get<Negociacao[]>("/e_negociacoes").then((negs) => negs.filter((n) => n.e_expositor_id === expositorId)),

  create: (data: Partial<Negociacao>) => api.post<Negociacao>("/e_negociacoes", data),
}
