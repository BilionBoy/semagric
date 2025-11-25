"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Users, DollarSign, Plus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useExpositorData } from "@/app/cadastro-expositor/hooks/use-expositor-data";
import { ExpositorStatsCards } from "@/app/cadastro-expositor/components/expositor-stats-cards";
import { auth } from "@/lib/auth"; // ✅ NOVO

export default function ExhibitorDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [expositorId, setExpositorId] = useState<number | null>(null);

  const { clientes, negociacoes, loading, expositor, error } =
    useExpositorData(expositorId);

  // =====================
  // CARREGA ID DO EXPOSITOR PELO TOKEN (JWT)
  // =====================
  useEffect(() => {
    const id = auth.getExpositorIdFromToken();

    if (!id) {
      toast({
        title: "Sessão expirada",
        description: "Faça login novamente como expositor.",
        variant: "destructive",
      });

      router.push("/");
      return;
    }

    setExpositorId(Number(id));
  }, [router, toast]);

  // =====================
  // LOGOUT
  // =====================
  const handleLogout = () => {
    auth.logout(); // ✅ AGORA LIMPA TUDO CERTO

    toast({
      title: "Logout Realizado",
      description: "Você foi desconectado com sucesso.",
    });

    router.push("/");
  };

  const formatDateTime = (isoString: string) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =====================
  // LOADING
  // =====================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-orange-50">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // =====================
  // ERRO
  // =====================
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-orange-50">
        <div className="text-center space-y-4">
          <p className="text-red-600 font-semibold">{error}</p>
          <Button onClick={() => router.push("/")}>Voltar</Button>
        </div>
      </div>
    );
  }

  // =====================
  // STATS
  // =====================
  const stats = {
    totalClientes: clientes.length,
    totalValue: negociacoes.reduce((sum, n) => sum + Number(n.valor || 0), 0),
    dealsClosed: negociacoes.filter((n) => n.status === "fechada").length,
  };

  // =====================
  // RENDER
  // =====================
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      <header className="amazon-gradient text-white py-4 shadow-lg sticky top-0 z-20">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="text-white hover:bg-green-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-green-100">Expositor</p>
              <p className="font-semibold">
                {expositor?.empresa || expositor?.nome_completo}
              </p>
            </div>

            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-white hover:bg-green-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="mb-8 flex justify-between items-center gap-4">
            <h1 className="text-3xl font-bold text-green-800">
              Painel de Controle
            </h1>

            <Button
              onClick={() => router.push("/registro-cliente")}
              className="amazon-gradient hover:opacity-90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Registrar Cliente
            </Button>
          </div>

          <ExpositorStatsCards {...stats} />

          {/* CLIENTES */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100 mb-8">
            <h2 className="text-xl font-bold text-green-800 mb-4">
              Clientes Registrados
            </h2>

            {clientes.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum cliente registrado ainda</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-green-100">
                      <th className="text-left py-3 px-4">Nome</th>
                      <th className="text-left py-3 px-4">Contato</th>
                      <th className="text-left py-3 px-4">Endereço</th>
                      <th className="text-left py-3 px-4">Interesse</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientes.map((cliente) => (
                      <tr key={cliente.id} className="border-b">
                        <td className="py-3 px-4">{cliente.nome}</td>
                        <td className="py-3 px-4">
                          <div>{cliente.email}</div>
                          <div className="text-gray-500">
                            {cliente.telefone}
                          </div>
                        </td>
                        <td className="py-3 px-4">{cliente.endereco}</td>
                        <td className="py-3 px-4">{cliente.interesse}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* NEGOCIAÇÕES */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100">
            <h2 className="text-xl font-bold text-green-800 mb-4">
              Negociações
            </h2>

            {negociacoes.length === 0 ? (
              <div className="text-center py-12">
                <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Nenhuma negociação registrada</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-green-100">
                      <th className="text-left py-3 px-4">Item</th>
                      <th className="text-left py-3 px-4">Quantidade</th>
                      <th className="text-left py-3 px-4">Valor</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {negociacoes.map((neg) => (
                      <tr key={neg.id} className="border-b">
                        <td className="py-3 px-4">{neg.item}</td>
                        <td className="py-3 px-4">{neg.quantidade}</td>
                        <td className="py-3 px-4 text-green-700 font-semibold">
                          R${" "}
                          {Number(neg.valor).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="py-3 px-4">{neg.status}</td>
                        <td className="py-3 px-4 text-gray-600">
                          {formatDateTime(neg.data_hora)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
