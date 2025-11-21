"use client"

import { useState, useEffect } from "react"
import { expositoresApi } from "../api/expositores"
import { clientesApi } from "../api/clientes"
import { negociacoesApi } from "../api/negociacoes"
import { segmentosApi } from "../api/segmentos"
import { tiposExpositoresApi } from "../api/tipos-expositores"
import type { Expositor, Cliente, Negociacao, Segmento, TipoExpositor } from "@/src/@types"

export function useAdminData() {
  const [expositores, setExpositores] = useState<Expositor[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [negociacoes, setNegociacoes] = useState<Negociacao[]>([])
  const [segmentos, setSegmentos] = useState<Segmento[]>([])
  const [tiposExpositores, setTiposExpositores] = useState<TipoExpositor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = async () => {
    try {
      setLoading(true)
      const [expositoresData, clientesData, negociacoesData, segmentosData, tiposData] = await Promise.all([
        expositoresApi.list(),
        clientesApi.list(),
        negociacoesApi.list(),
        segmentosApi.list(),
        tiposExpositoresApi.list(),
      ])

      setExpositores(expositoresData)
      setClientes(clientesData)
      setNegociacoes(negociacoesData)
      setSegmentos(segmentosData)
      setTiposExpositores(tiposData)
      setError(null)
    } catch (err: any) {
      console.error("[v0] Error loading admin data:", err)
      setError(err.message || "Erro ao carregar dados")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

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
  }
}
