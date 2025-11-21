"use client";

import { useState } from "react";
import { Trash2, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Expositor } from "@/@types";
import { useToast } from "@/hooks/use-toast";
import { useExpositoresManager } from "../hooks/use-expositores-manager";
import { expositoresApi } from "../api/expositores";

interface Props {
  expositores: Expositor[];
  onUpdate: (data: Expositor[]) => void;
}

export function ExpositoresManager({ expositores, onUpdate }: Props) {
  const { toast } = useToast();
  const { remove } = useExpositoresManager();

  const [showPassModal, setShowPassModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [password, setPassword] = useState("");

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

  const openPasswordModal = (id: number) => {
    setSelectedId(id);
    setPassword("");
    setShowPassModal(true);
  };

  const handleSavePassword = async () => {
    if (!selectedId || !password) return;

    try {
      await expositoresApi.updatePassword(selectedId, password);

      toast({
        title: "Senha definida",
        description: "Senha salva com sucesso.",
      });

      setShowPassModal(false);
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
    <>
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        {expositores.map((exp) => (
          <div
            key={exp.id}
            className="flex justify-between items-center bg-green-50 p-4 rounded"
          >
            <div>
              <p className="font-semibold">
                {exp.empresa || exp.nome_completo}
              </p>
              <p className="text-sm text-gray-500">{exp.email_contato}</p>
            </div>

            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => openPasswordModal(exp.id)}
                className="text-blue-600"
              >
                <KeyRound className="w-4 h-4" />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className="text-red-600"
                onClick={() => handleDelete(exp.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showPassModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
            <h3 className="text-lg font-bold text-green-800">
              Definir senha do expositor
            </h3>

            <Input
              type="password"
              placeholder="Nova senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowPassModal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSavePassword}>Salvar</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
