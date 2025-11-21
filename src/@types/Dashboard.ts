import type { Cliente } from "./Cliente"
import type { Negociacao } from "./Negociacao"

export interface DashboardExpositor {
  total_vendas: number
  valor_total: number
  ticket_medio: number
  ultimas_negociacoes: Negociacao[]
  clientes: Cliente[]
}

export interface DashboardAdmin {
  total_expositores: number
  total_clientes: number
  total_negociacoes: number
  valor_total: number
  ranking: Array<{
    expositor: string
    total: number
  }>
}
