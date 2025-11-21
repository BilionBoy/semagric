"use client"

import { useState, useEffect } from "react"
import { expositoresApi } from "../api/expositores"
import { clientesApi } from "../api/clientes"
import { negociacoesApi } from "../api/negociacoes"
import type { Expositor, Cliente, Negociacao } from "@/src/@types"

export function useExpositorData(expositorId: number) {
  const [expositor, setExpositor] = useState<Expositor | null>(null)
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [negociacoes, setNegociacoes] = useState<Negociacao[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = async () => {
    try {
      setLoading(true)
      const [expositorData, clientesData, negociacoesData] = await Promise.all([
        expositoresApi.getById(expositorId),
        clientesApi.getByExpositor(expositorId),
        negociacoesApi.getByExpositor(expositorId),
      ])

      setExpositor(expositorData)
      setClientes(clientesData)
      setNegociacoes(negociacoesData)
      setError(null)
    } catch (err: any) {
      console.error("[v0] Error loading expositor data:", err)
      setError(err.message || "Erro ao carregar dados")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [expositorId])

  return {
    expositor,
    clientes,
    negociacoes,
    loading,
    error,
    reload: loadData,
  }
}
