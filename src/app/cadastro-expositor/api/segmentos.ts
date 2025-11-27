import type { Segmento } from "@/@types";

const API = "http://31.97.168.215:4000/api/v1";

export const segmentosApi = {
  list: async (): Promise<Segmento[]> => {
    const res = await fetch(`${API}/e_segmentos`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Erro ao carregar segmentos");
    }

    return res.json();
  },

  getById: async (id: number): Promise<Segmento> => {
    const res = await fetch(`${API}/e_segmentos/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Erro ao carregar segmento");
    }

    return res.json();
  },
};
