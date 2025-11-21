export interface Expositor {
  id: number
  empresa: string | null
  cnpj: string | null
  nome_completo: string | null
  cpf: string | null
  responsavel: string | null
  email_contato: string
  telefone_contato: string
  cidade: string
  estado: string
  stand: string | null
  e_evento_id: number
  e_tipo_expositor_id: number
  e_segmento_id: number
  status: string
}

export interface CreateExpositorDTO {
  tipo: "PJ" | "PF"
  empresa?: string
  cnpj?: string
  nome_completo?: string
  cpf?: string
  responsavel?: string
  email_contato: string
  telefone_contato: string
  cidade: string
  estado: string
  e_segmento_id: number
}
