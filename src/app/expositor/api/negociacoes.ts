import { api } from "@/src/lib/api"
import type { Negociacao } from "@/src/@types"

export const negociacoesApi = {
  getByExpositor: (expositorId: number) =>
    api.get<Negociacao[]>(`/api/v1/e_negociacoes?e_expositor_id=${expositorId}`).then((res) => res.data),
}
