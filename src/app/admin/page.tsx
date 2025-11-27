"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

import { TopExpositoresChart } from "@/app/admin/components/top-expositores-chart";
import { TopInteressesChart } from "@/app/admin/components/top-interesses-chart";
import { TopCidadesChart } from "@/app/admin/components/top-cidades-chart";

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
  // PROTEÇÃO DE ROTA (SEM auth.isAuthenticated)
  // =======================
  useEffect(() => {
    const token = auth.getToken();

    if (!token) {
      router.replace("/login");
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  // =======================
  // LOGOUT
  // =======================
  const handleLogout = () => {
    auth.logout();
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
  // CÁLCULOS
  // =======================
  const totalValor = negociacoes.reduce((s, n) => s + Number(n.valor || 0), 0);

  const ticketMedio =
    negociacoes.length > 0 ? totalValor / negociacoes.length : 0;

  const stats = {
    totalExpositores: expositores.length,
    totalClientes: clientes.length,
    totalNegociacoes: negociacoes.length,
    totalValue: totalValor,
    ticketMedio,
  };

  const topExpositores = expositores.map((e) => ({
    name: e.empresa || e.nome_completo || "Sem Nome",
    value: negociacoes
      .filter((n) => n.e_expositor_id === e.id)
      .reduce((s, n) => s + Number(n.valor || 0), 0),
  }));

  const topInteresses = clientes.reduce((acc: any[], c) => {
    if (!c.interesse) return acc;
    const found = acc.find((i) => i.name === c.interesse);
    if (found) found.value++;
    else acc.push({ name: c.interesse, value: 1 });
    return acc;
  }, []);

  const topCidades = clientes.reduce((acc: any[], c) => {
    if (!c.cidade) return acc;
    const found = acc.find((i) => i.name === c.cidade);
    if (found) found.value++;
    else acc.push({ name: c.cidade, value: 1 });
    return acc;
  }, []);

  // =======================
  // LOADING
  // =======================
  if (isCheckingAuth || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  // =======================
  // RENDER
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

      <main className="p-8 max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-green-800">
          Dashboard Administrativo
        </h1>

        <AdminStatsCards {...stats} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TopExpositoresChart data={topExpositores} />
          <TopInteressesChart data={topInteresses} />
        </div>

        <TopCidadesChart data={topCidades} />

        <Tabs defaultValue="exhibitors">
          <TabsList className="grid w-full grid-cols-5 bg-green-100">
            <TabsTrigger value="exhibitors">Expositores</TabsTrigger>
            <TabsTrigger value="visitors">Visitantes</TabsTrigger>
            <TabsTrigger value="negotiations">Negociações</TabsTrigger>
            <TabsTrigger value="segments">Segmentos</TabsTrigger>
            <TabsTrigger value="types">Tipos</TabsTrigger>
          </TabsList>

          <TabsContent value="exhibitors">
            <ExpositoresManager expositores={expositores} onUpdate={() => {}} />
          </TabsContent>

          <TabsContent value="segments">
            <SegmentosManager segmentos={segmentos} onUpdate={setSegmentos} />
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
      </main>
    </div>
  );
}
