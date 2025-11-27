const API_BASE_URL = "/api";

// Rotas que NÃO DEVEM enviar token
const PUBLIC_ENDPOINTS = ["/e_segmentos", "/e_segmentos/", "/e_expositores"];

class ApiClient {
  private getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  }

  private isPublic(endpoint: string) {
    return PUBLIC_ENDPOINTS.some(
      (path) => endpoint === path || endpoint.startsWith(path)
    );
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    // ✅ Só envia Authorization nas rotas privadas
    if (token && !this.isPublic(endpoint)) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const json = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(json?.error || json?.message || "Erro inesperado");
    }

    return json as T;
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint);
  }

  post<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  put<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  patch<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, {
      method: "DELETE",
    });
  }
}

export const api = new ApiClient();
