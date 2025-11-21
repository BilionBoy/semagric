import { api } from "@/src/lib/api"
import type { Cliente } from "@/src/@types"

export const clientesApi = {
  getByExpositor: (expositorId: number) =>
    api.get<Cliente[]>(`/api/v1/e_clientes?e_expositor_id=${expositorId}`).then((res) => res.data),
}
