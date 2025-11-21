"use client"

import { useState } from "react"
import { segmentosApi } from "../api/segmentos"
import type { Segmento, CreateSegmentoDTO } from "@/src/@types"

export function useSegmentosManager() {
  const [isAdding, setIsAdding] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const addSegmento = async (data: CreateSegmentoDTO): Promise<Segmento> => {
    setIsAdding(true)
    try {
      const created = await segmentosApi.create(data)
      return created
    } finally {
      setIsAdding(false)
    }
  }

  const deleteSegmento = async (id: number): Promise<void> => {
    setIsDeleting(true)
    try {
      await segmentosApi.delete(id)
    } finally {
      setIsDeleting(false)
    }
  }

  return {
    addSegmento,
    deleteSegmento,
    isAdding,
    isDeleting,
  }
}
