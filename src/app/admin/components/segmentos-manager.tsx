"use client";

import { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Segmento } from "@/@types";
import { useToast } from "@/hooks/use-toast";
import { useSegmentos } from "../hooks/use-segmentos";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
  segmentos: Segmento[];
  onUpdate: (segmentos: Segmento[]) => void;
}

export function SegmentosManager({ segmentos, onUpdate }: Props) {
  const { toast } = useToast();
  const { create, update, remove } = useSegmentos();

  const [novo, setNovo] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleCreate = async () => {
    if (!novo.trim()) return;

    try {
      const created = await create(novo);
      onUpdate([...segmentos, created]);
      setNovo("");

      toast({
        title: "Segmento criado",
        description: "Registro criado com sucesso.",
      });
    } catch (e: any) {
      toast({
        title: "Erro",
        description: e.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async (seg: Segmento) => {
    try {
      const updated = await update(seg.id, seg.descricao);
      const list = segmentos.map((s) => (s.id === seg.id ? updated : s));
      onUpdate(list);

      toast({
        title: "Atualizado",
        description: "Registro atualizado com sucesso.",
      });
    } catch (e: any) {
      toast({
        title: "Erro",
        description: e.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedId) return;

    try {
      await remove(selectedId);
      const list = segmentos.filter((s) => s.id !== selectedId);
      onUpdate(list);

      toast({
        title: "Removido",
        description: "Registro removido com sucesso.",
      });
    } catch (e: any) {
      toast({
        title: "Erro",
        description: e.message,
        variant: "destructive",
      });
    } finally {
      setShowConfirm(false);
      setSelectedId(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      {/* Criar novo */}
      <div className="flex gap-2">
        <Input
          placeholder="Novo segmento..."
          value={novo}
          onChange={(e) => setNovo(e.target.value)}
        />
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar
        </Button>
      </div>

      {/* Lista */}
      <div className="space-y-3">
        {segmentos.map((seg) => (
          <div
            key={seg.id}
            className="flex gap-2 items-center bg-green-50 p-3 rounded"
          >
            <Input
              value={seg.descricao}
              onChange={(e) => {
                const list = segmentos.map((s) =>
                  s.id === seg.id ? { ...s, descricao: e.target.value } : s
                );
                onUpdate(list);
              }}
            />

            <Button
              size="icon"
              onClick={() => handleUpdate(seg)}
              variant="ghost"
              className="text-green-700"
            >
              <Save className="w-4 h-4" />
            </Button>

            <Button
              size="icon"
              onClick={() => handleDeleteClick(seg.id)}
              variant="ghost"
              className="text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Modal de Confirmação */}
      <AlertDialog open={showConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir segmento</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover este segmento?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirm(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
