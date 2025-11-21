import type { Usuario } from "./Usuario";

export interface LoginResponse {
  token: string;
  user: Usuario;
  error?: string;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
