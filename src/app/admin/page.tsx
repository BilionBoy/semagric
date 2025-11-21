"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

import { auth } from "@/lib/auth";
import { useAdminData } from "@/app/admin/hooks/use-admin-data";
import { useTiposManager } from "@/app/admin/hooks/use-tipos-manager";
import { AdminStatsCards } from "@/app/admin/components/admin-stats-cards";
import { SegmentosManager } from "@/app/admin/components/segmentos-manager";
import { ExpositoresManager } from "@/app/admin/components/expositores-manager";

export default function AdminDashboard() {
  const router = useRouter();
  const { toast } = useToast();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [newTipoExpositor, setNewTipoExpositor] = useState("");

  // =======================
  // PROTEÇÃO DE ROTA
  // =======================
  useEffect(() => {
    const isAuth = auth.isAuthenticated();

    if (!isAuth) {
      router.replace("/login");
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  const {
    expositores,
    clientes,
    negociacoes,
    segmentos,
    tiposExpositores,
    loading,
    setSegmentos,
    setTiposExpositores,
  } = useAdminData();

  const { addTipo, deleteTipo } = useTiposManager();

  // =======================
  // LOGOUT
  // =======================
  const handleLogout = () => {
    auth.logout();

    toast({
      title: "Logout realizado",
      description: "Você saiu do sistema.",
    });

    router.push("/");
  };

  // =======================
  // CRUD TIPOS
  // =======================
  const handleAddTipo = async () => {
    if (!newTipoExpositor.trim()) return;

    try {
      const created = await addTipo({ descricao: newTipoExpositor });
      setTiposExpositores([...tiposExpositores, created]);
      setNewTipoExpositor("");
    } catch (e: any) {
      toast({
        title: "Erro",
        description: e?.message || "Erro ao salvar tipo.",
        variant: "destructive",
      });
    }
  };

  // =======================
  // STATS
  // =======================
  const stats = {
    totalExpositores: expositores.length,
    totalClientes: clientes.length,
    totalNegociacoes: negociacoes.length,
    totalValue: negociacoes.reduce((s, n) => s + Number(n.valor || 0), 0),
  };

  // =======================
  // LOADING AUTENTICAÇÃO
  // =======================
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  // =======================
  // LOADING DADOS
  // =======================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  // =======================
  // RENDER PRINCIPAL
  // =======================
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      <header className="amazon-gradient text-white py-4 shadow sticky top-0 z-20">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6" />
            <span className="font-bold">Admin - AGROTEC PVH</span>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="text-white hover:bg-green-700"
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Início
            </Button>

            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-white hover:bg-red-600"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        <main className="flex-1 p-8" id="dashboard-section">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto space-y-8"
          >
            <h1 className="text-3xl font-bold text-green-800">
              Dashboard Administrativo
            </h1>

            <AdminStatsCards {...stats} />

            <Tabs defaultValue="exhibitors">
              <TabsList className="grid w-full grid-cols-5 bg-green-100">
                <TabsTrigger id="expositores-tab" value="exhibitors">
                  Expositores
                </TabsTrigger>
                <TabsTrigger id="visitantes-tab" value="visitors">
                  Visitantes
                </TabsTrigger>
                <TabsTrigger id="negociacoes-tab" value="negotiations">
                  Negociações
                </TabsTrigger>
                <TabsTrigger id="segmentos-tab" value="segments">
                  Segmentos
                </TabsTrigger>
                <TabsTrigger id="tipos-tab" value="types">
                  Tipos
                </TabsTrigger>
              </TabsList>
              <TabsContent value="exhibitors">
                <ExpositoresManager
                  expositores={expositores}
                  onUpdate={() => {}}
                />
              </TabsContent>
              <TabsContent value="segments">
                <SegmentosManager
                  segmentos={segmentos}
                  onUpdate={setSegmentos}
                />
              </TabsContent>

              <TabsContent value="types">
                <div className="bg-white p-6 rounded-xl shadow">
                  <div className="flex gap-2 mb-6">
                    <Input
                      placeholder="Novo tipo"
                      value={newTipoExpositor}
                      onChange={(e) => setNewTipoExpositor(e.target.value)}
                    />
                    <Button onClick={handleAddTipo}>Adicionar</Button>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {tiposExpositores.map((t) => (
                      <div
                        key={t.id}
                        className="bg-green-50 p-3 rounded flex justify-between items-center"
                      >
                        <span>{t.descricao}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTipo(t.id)}
                          className="text-red-600"
                        >
                          <LogOut className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
