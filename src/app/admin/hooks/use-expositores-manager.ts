"use client";

import { expositoresApi } from "../api/expositores";
import type { Expositor } from "@/@types";

export function useExpositoresManager() {
  const list = async () => {
    return await expositoresApi.list();
  };

  const remove = async (id: number) => {
    return await expositoresApi.delete(id);
  };

  return {
    list,
    remove,
  };
}
