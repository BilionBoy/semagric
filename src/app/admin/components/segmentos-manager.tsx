"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tags, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useSegmentosManager } from "../hooks/use-segmentos-manager"
import type { Segmento } from "@/src/@types"

interface SegmentosManagerProps {
  segmentos: Segmento[]
  onUpdate: (segmentos: Segmento[]) => void
}

export function SegmentosManager({ segmentos, onUpdate }: SegmentosManagerProps) {
  const { toast } = useToast()
  const { addSegmento, deleteSegmento, isAdding, isDeleting } = useSegmentosManager()
  const [newSegmento, setNewSegmento] = useState("")

  const handleAdd = async () => {
    if (!newSegmento.trim()) return

    try {
      const created = await addSegmento({ descricao: newSegmento })
      onUpdate([...segmentos, created])
      setNewSegmento("")
      toast({
        title: "Segmento Adicionado",
        description: "Segmento cadastrado com sucesso!",
      })
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível adicionar o segmento.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este segmento?")) return

    try {
      await deleteSegmento(id)
      onUpdate(segmentos.filter((s) => s.id !== id))
      toast({
        title: "Segmento Excluído",
        description: "Segmento removido com sucesso!",
      })
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível excluir o segmento.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-green-800">Gerenciar Segmentos</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Nome do segmento"
            value={newSegmento}
            onChange={(e) => setNewSegmento(e.target.value)}
            className="w-64"
          />
          <Button onClick={handleAdd} disabled={isAdding || !newSegmento.trim()}>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        </div>
      </div>

      {segmentos.length === 0 ? (
        <div className="text-center py-12">
          <Tags className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Nenhum segmento cadastrado</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {segmentos.map((seg) => (
            <div
              key={seg.id}
              className="bg-green-50 rounded-lg p-4 flex justify-between items-center border border-green-200"
            >
              <div className="flex items-center gap-3">
                <Tags className="w-5 h-5 text-green-700" />
                <span className="font-semibold text-green-800">{seg.descricao}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(seg.id)}
                className="text-red-600 hover:bg-red-50"
                disabled={isDeleting}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
