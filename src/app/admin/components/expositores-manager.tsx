"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Expositor } from "@/@types";
import { useToast } from "@/hooks/use-toast";
import { useExpositoresManager } from "../hooks/use-expositores-manager";

interface Props {
  expositores: Expositor[];
  onUpdate: (data: Expositor[]) => void;
}

export function ExpositoresManager({ expositores, onUpdate }: Props) {
  const { toast } = useToast();
  const { remove } = useExpositoresManager();

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja remover este expositor?")) return;

    try {
      await remove(id);

      const list = expositores.filter((e) => e.id !== id);
      onUpdate(list);

      toast({
        title: "Removido",
        description: "Expositor removido com sucesso.",
      });
    } catch (e: any) {
      toast({
        title: "Erro",
        description: e.message,
        variant: "destructive",
      });
    }
  };

  if (!expositores.length) {
    return (
      <div className="text-center text-gray-500 py-10">
        Nenhum expositor encontrado.
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      {expositores.map((exp) => (
        <div
          key={exp.id}
          className="flex justify-between items-center bg-green-50 p-4 rounded"
        >
          <div>
            <p className="font-semibold">{exp.empresa || exp.nome_completo}</p>
            <p className="text-sm text-gray-500">{exp.email_contato}</p>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="text-red-600"
            onClick={() => handleDelete(exp.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
