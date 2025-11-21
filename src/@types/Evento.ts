export interface Evento {
  id: number
  nome: string
  data_inicio: string
  data_fim: string
  local: string
  descricao?: string
  status: string
}

export interface CreateEventoDTO {
  nome: string
  data_inicio: string
  data_fim: string
  local: string
  descricao?: string
  status?: string
}
