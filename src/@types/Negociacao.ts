export interface Negociacao {
  id: number
  e_expositor_id: number
  e_cliente_id: number
  item: string
  quantidade: number
  valor: number
  data_hora: string
  status: string
}

export interface CreateNegociacaoDTO {
  e_cliente_id: number
  item: string
  quantidade: number
  valor: number
  status: string
}
