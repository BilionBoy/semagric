"use client"

import { useState } from "react"
import { tiposExpositoresApi } from "../api/tipos-expositores"
import type { TipoExpositor, CreateTipoExpositorDTO } from "@/src/@types"

export function useTiposManager() {
  const [isAdding, setIsAdding] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const addTipo = async (data: CreateTipoExpositorDTO): Promise<TipoExpositor> => {
    setIsAdding(true)
    try {
      const created = await tiposExpositoresApi.create(data)
      return created
    } finally {
      setIsAdding(false)
    }
  }

  const deleteTipo = async (id: number): Promise<void> => {
    setIsDeleting(true)
    try {
      await tiposExpositoresApi.delete(id)
    } finally {
      setIsDeleting(false)
    }
  }

  return {
    addTipo,
    deleteTipo,
    isAdding,
    isDeleting,
  }
}
