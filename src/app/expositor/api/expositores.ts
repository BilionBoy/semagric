import { api } from "@/src/lib/api"
import type { Expositor } from "@/src/@types"

export const expositoresApi = {
  getById: (id: number) => api.get<Expositor>(`/api/v1/e_expositores/${id}`).then((res) => res.data),
}
