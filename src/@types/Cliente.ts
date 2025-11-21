export interface Cliente {
  id: number;
  e_expositor_id?: number;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  interesse: string;
  cidade?: string;
  estado?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateClienteDTO {
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  interesse: string;
  cidade?: string;
  estado?: string;
}

export interface UpdateClienteDTO {
  nome?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  interesse?: string;
  cidade?: string;
  estado?: string;
}
