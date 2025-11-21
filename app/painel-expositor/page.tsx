"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, Users, DollarSign, Plus, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useExpositorData } from "@/src/app/expositor/hooks/use-expositor-data"
import { ExpositorStatsCards } from "@/src/app/expositor/components/expositor-stats-cards"

export default function ExhibitorDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [expositorId, setExpositorId] = useState<number | null>(null)
  const { clientes, negociacoes, loading, expositor } = useExpositorData()

  useEffect(() => {
    const id = localStorage.getItem("currentExpositorId")

    if (!id) {
      toast({
        title: "Acesso Negado",
        description: "Você precisa estar cadastrado como expositor.",
        variant: "destructive",
      })
      router.push("/cadastro-expositor")
      return
    }

    setExpositorId(Number.parseInt(id))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("currentExpositorId")
    toast({
      title: "Logout Realizado",
      description: "Você foi desconectado com sucesso.",
    })
    router.push("/")
  }

  const formatDateTime = (isoString: string) => {
    if (!isoString) return "-"
    const date = new Date(isoString)
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const stats = {
    totalClientes: clientes.length,
    totalValue: negociacoes.reduce((sum, n) => sum + Number.parseFloat(String(n.valor)), 0),
    dealsClosed: negociacoes.filter((n) => n.status === "fechada").length,
  }

  if (loading || !expositorId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      <header className="amazon-gradient text-white py-4 shadow-lg sticky top-0 z-20">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Button variant="ghost" onClick={() => router.push("/")} className="text-white hover:bg-green-700">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-green-100">Expositor</p>
              <p className="font-semibold">{expositor?.empresa || expositor?.nome_completo}</p>
            </div>
            <Button variant="ghost" onClick={handleLogout} className="text-white hover:bg-green-700">
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
          <div className="mb-8 flex flex-wrap justify-between items-center gap-4">
            <h1 className="text-3xl font-bold text-green-800">Painel de Controle</h1>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => router.push("/registro-cliente")} className="amazon-gradient hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" /> Registrar Cliente
              </Button>
            </div>
          </div>

          <ExpositorStatsCards {...stats} />

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100 mb-8">
            <h2 className="text-xl font-bold text-green-800 mb-4">Clientes Registrados</h2>
            {clientes.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Nenhum cliente registrado ainda</p>
                <Button onClick={() => router.push("/registro-cliente")} className="amazon-gradient hover:opacity-90">
                  Registrar Primeiro Cliente
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-green-100">
                      <th className="text-left py-3 px-4 text-green-800 font-semibold">Nome</th>
                      <th className="text-left py-3 px-4 text-green-800 font-semibold">Contato</th>
                      <th className="text-left py-3 px-4 text-green-800 font-semibold">Endereço</th>
                      <th className="text-left py-3 px-4 text-green-800 font-semibold">Interesse</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientes.map((cliente, index) => (
                      <motion.tr
                        key={cliente.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-green-50 hover:bg-green-50 transition-colors"
                      >
                        <td className="py-3 px-4 font-medium">{cliente.nome}</td>
                        <td className="py-3 px-4">
                          <div>{cliente.email}</div>
                          <div className="text-gray-500">{cliente.telefone}</div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{cliente.endereco}</td>
                        <td className="py-3 px-4">{cliente.interesse}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100">
            <h2 className="text-xl font-bold text-green-800 mb-4">Negociações</h2>
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
                      <th className="text-left py-3 px-4 text-green-800 font-semibold">Item</th>
                      <th className="text-left py-3 px-4 text-green-800 font-semibold">Quantidade</th>
                      <th className="text-left py-3 px-4 text-green-800 font-semibold">Valor</th>
                      <th className="text-left py-3 px-4 text-green-800 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 text-green-800 font-semibold">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {negociacoes.map((neg) => (
                      <tr key={neg.id} className="border-b border-green-50 hover:bg-green-50">
                        <td className="py-3 px-4 font-medium">{neg.item}</td>
                        <td className="py-3 px-4">{neg.quantidade}</td>
                        <td className="py-3 px-4 font-semibold text-green-700">
                          R${" "}
                          {Number.parseFloat(String(neg.valor)).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {neg.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{formatDateTime(neg.data_hora)}</td>
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
  )
}
