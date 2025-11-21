"use client";

import { useState, useEffect, useCallback } from "react";
import { expositoresApi } from "../api/expositores";
import { clientesApi } from "../api/clientes";
import { negociacoesApi } from "../api/negociacoes";
import { segmentosApi } from "../api/segmentos";
import { tiposExpositoresApi } from "../api/tipos-expositores";
import type {
  Expositor,
  Cliente,
  Negociacao,
  Segmento,
  TipoExpositor,
} from "@/@types";

export function useAdminData() {
  const [expositores, setExpositores] = useState<Expositor[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [negociacoes, setNegociacoes] = useState<Negociacao[]>([]);
  const [segmentos, setSegmentos] = useState<Segmento[]>([]);
  const [tiposExpositores, setTiposExpositores] = useState<TipoExpositor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      // Se não estiver autenticado, não faz requisição
      if (!token) {
        setLoading(false);
        return;
      }

      setLoading(true);

      const [
        expositoresData,
        clientesData,
        negociacoesData,
        segmentosData,
        tiposData,
      ] = await Promise.all([
        expositoresApi.list(),
        clientesApi.list(),
        negociacoesApi.list(),
        segmentosApi.list(),
        tiposExpositoresApi.list(),
      ]);

      setExpositores(expositoresData);
      setClientes(clientesData);
      setNegociacoes(negociacoesData);
      setSegmentos(segmentosData);
      setTiposExpositores(tiposData);
      setError(null);
    } catch (err: any) {
      console.error("[AdminData] Erro ao carregar:", err);
      setError(err.message || "Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [loadData]);

  return {
    expositores,
    clientes,
    negociacoes,
    segmentos,
    tiposExpositores,
    loading,
    error,
    reload: loadData,
    setSegmentos,
    setTiposExpositores,
  };
}
