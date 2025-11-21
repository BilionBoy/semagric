import { useState } from "react";
import { segmentosApi } from "../api/segmentos";
import type { Segmento } from "@/@types";

export function useSegmentos() {
  const [loading, setLoading] = useState(false);

  const create = async (descricao: string): Promise<Segmento> => {
    setLoading(true);
    try {
      return await segmentosApi.create({ descricao });
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: number, descricao: string): Promise<Segmento> => {
    setLoading(true);
    try {
      return await segmentosApi.update(id, { descricao });
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: number): Promise<void> => {
    setLoading(true);
    try {
      await segmentosApi.delete(id);
    } finally {
      setLoading(false);
    }
  };

  return { create, update, remove, loading };
}
