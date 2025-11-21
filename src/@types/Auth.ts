import type { Usuario } from "./Usuario"

export interface LoginResponse {
  token: string
  user: Usuario
}

export interface LoginCredentials {
  email: string
  password: string
}
