import { api } from "@/src/lib/api"
import type { Cliente } from "@/src/@types"

export const clientesApi = {
  list: () => api.get<Cliente[]>("/e_clientes"),

  create: (data: {
    e_cliente: {
      e_expositor_id: number
      nome: string
      telefone: string
      email: string
      endereco: string
      interesse: string
    }
  }) => api.post<Cliente>("/e_clientes", data),

  getByExpositor: (expositorId: number) =>
    api.get<Cliente[]>("/e_clientes").then((clientes) => clientes.filter((c) => c.e_expositor_id === expositorId)),
}
