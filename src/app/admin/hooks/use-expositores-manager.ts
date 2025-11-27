"use client";

import { expositoresApi } from "../api/expositores";
import type { Expositor } from "@/@types";

export function useExpositoresManager() {
  const list = async () => {
    return await expositoresApi.list();
  };

  const remove = async (id: number) => {
    try {
      const resp = await expositoresApi.delete(id);
      return resp;
    } catch (err: any) {
      console.error("Erro DELETE expositor:", err.response?.data || err);
      throw new Error(
        err.response?.data?.message || "Erro ao excluir expositor."
      );
    }
  };

  return {
    list,
    remove,
  };
}
