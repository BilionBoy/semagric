import { useState } from "react";
import { segmentosApi } from "../api/segmentos";
import type { Segmento } from "@/@types";

export function useSegmentos() {
  const [loading, setLoading] = useState(false);

  const create = async (descricao: string): Promise<Segmento> => {
    setLoading(true);
    try {
      return await segmentosApi.create({ descricao });
    } catch (err: any) {
      console.error("Erro CREATE segmento:", err.response?.data || err);
      throw new Error(err.response?.data?.message || "Erro ao criar segmento");
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: number, descricao: string): Promise<Segmento> => {
    setLoading(true);
    try {
      return await segmentosApi.update(id, { descricao });
    } catch (err: any) {
      console.error("Erro UPDATE segmento:", err.response?.data || err);
      throw new Error(
        err.response?.data?.message || "Erro ao atualizar segmento"
      );
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: number): Promise<void> => {
    setLoading(true);
    try {
      await segmentosApi.delete(id);
    } catch (err: any) {
      console.error("Erro DELETE segmento:", err.response?.data || err);
      throw new Error(
        err.response?.data?.message || "Erro ao remover segmento"
      );
    } finally {
      setLoading(false);
    }
  };

  return { create, update, remove, loading };
}
