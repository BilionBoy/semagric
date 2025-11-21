"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { LogIn, Key, LogOut, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { auth } from "@/src/lib/auth"
import { useAdminData } from "@/src/app/admin/hooks/use-admin-data"
import { useTiposManager } from "@/src/app/admin/hooks/use-tipos-manager"
import { AdminStatsCards } from "@/src/app/admin/components/admin-stats-cards"
import { AdminSidebar } from "@/src/app/admin/components/admin-sidebar"
import { SegmentosManager } from "@/src/app/admin/components/segmentos-manager"

export default function AdminDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [loginLoading, setLoginLoading] = useState(false)

  const {
    expositores,
    clientes,
    negociacoes,
    segmentos,
    tiposExpositores,
    loading,
    setSegmentos,
    setTiposExpositores,
  } = useAdminData()

  const { addTipo, deleteTipo, isAdding: isAddingTipo } = useTiposManager()
  const [newTipoExpositor, setNewTipoExpositor] = useState("")

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    setIsAuthenticated(auth.isAuthenticated())
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)

    try {
      await auth.login(loginData.email, loginData.password)
      toast({
        title: "Login Realizado!",
        description: "Bem-vindo ao painel administrativo.",
      })
      setIsAuthenticated(true)
    } catch (error: any) {
      toast({
        title: "Erro no Login",
        description: error.message || "Email ou senha inválidos.",
        variant: "destructive",
      })
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = () => {
    auth.logout()
    toast({
      title: "Logout Realizado",
      description: "Você foi desconectado com sucesso.",
    })
    router.push("/")
  }

  const handleAddTipoExpositor = async () => {
    if (!newTipoExpositor.trim()) return

    try {
      const created = await addTipo({ descricao: newTipoExpositor })
      setTiposExpositores([...tiposExpositores, created])
      setNewTipoExpositor("")
      toast({
        title: "Tipo Adicionado",
        description: "Tipo de expositor cadastrado com sucesso!",
      })
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível adicionar o tipo.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteTipoExpositor = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este tipo de expositor?")) return

    try {
      await deleteTipo(id)
      setTiposExpositores(tiposExpositores.filter((t) => t.id !== id))
      toast({
        title: "Tipo Excluído",
        description: "Tipo de expositor removido com sucesso!",
      })
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível excluir o tipo.",
        variant: "destructive",
      })
    }
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
    totalExpositores: expositores.length,
    totalClientes: clientes.length,
    totalNegociacoes: negociacoes.length,
    totalValue: negociacoes.reduce((sum, n) => sum + Number.parseFloat(String(n.valor)), 0),
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
        <header className="amazon-gradient text-white py-4 shadow-lg">
          <div className="container mx-auto px-4">
            <Button variant="ghost" onClick={() => router.push("/")} className="text-white hover:bg-green-700">
              <LogOut className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[80vh]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-green-100">
              <div className="text-center mb-8">
                <div className="amazon-gradient w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-green-800 mb-2">Acesso Administrativo</h1>
                <p className="text-gray-600">Entre com suas credenciais</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-green-800 font-semibold">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={loginData.email}
                    onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                    className="border-green-200 focus:border-green-500"
                    placeholder="admin@admin.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-green-800 font-semibold">
                    Senha
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                    className="border-green-200 focus:border-green-500"
                    placeholder="••••••"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full amazon-gradient hover:opacity-90 text-lg py-6"
                  disabled={loginLoading}
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  {loginLoading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      <header className="amazon-gradient text-white py-4 shadow-lg sticky top-0 z-20">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6" />
            <span className="font-bold text-lg">AGROTEC PVH 2025</span>
            <span className="text-green-200">|</span>
            <span className="text-sm">Administração</span>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="text-white hover:bg-green-700 transition-all">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <div className="flex min-h-screen">
        <AdminSidebar onLogout={handleLogout} />

        <main className="flex-1 p-8" id="dashboard-section">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
            <div className="flex justify-between items-start mb-8">
              <h1 className="text-3xl font-bold text-green-800">Dashboard Geral</h1>
            </div>

            <AdminStatsCards {...stats} />

            <Tabs defaultValue="exhibitors" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-green-100">
                <TabsTrigger
                  id="expositores-tab"
                  value="exhibitors"
                  className="data-[state=active]:bg-green-700 data-[state=active]:text-white"
                >
                  Expositores
                </TabsTrigger>
                <TabsTrigger
                  id="visitantes-tab"
                  value="visitors"
                  className="data-[state=active]:bg-green-700 data-[state=active]:text-white"
                >
                  Visitantes
                </TabsTrigger>
                <TabsTrigger
                  id="negociacoes-tab"
                  value="negotiations"
                  className="data-[state=active]:bg-green-700 data-[state=active]:text-white"
                >
                  Negociações
                </TabsTrigger>
                <TabsTrigger
                  id="segmentos-tab"
                  value="segments"
                  className="data-[state=active]:bg-green-700 data-[state=active]:text-white"
                >
                  Segmentos
                </TabsTrigger>
                <TabsTrigger
                  id="tipos-tab"
                  value="types"
                  className="data-[state=active]:bg-green-700 data-[state=active]:text-white"
                >
                  Tipos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="exhibitors">
                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100">
                  <h2 className="text-xl font-bold text-green-800 mb-4">Lista de Expositores</h2>
                  {expositores.length === 0 ? (
                    <div className="text-center py-12">
                      <LogIn className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Nenhum expositor cadastrado</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2 border-green-100">
                            <th className="text-left p-3 text-green-800 font-semibold">Empresa/Nome</th>
                            <th className="text-left p-3 text-green-800 font-semibold">Documento</th>
                            <th className="text-left p-3 text-green-800 font-semibold">Contato</th>
                            <th className="text-left p-3 text-green-800 font-semibold">Cidade</th>
                            <th className="text-left p-3 text-green-800 font-semibold">Stand</th>
                          </tr>
                        </thead>
                        <tbody>
                          {expositores.map((ex) => (
                            <tr key={ex.id} className="border-b border-green-50 hover:bg-green-50 transition-colors">
                              <td className="p-3 font-semibold">{ex.empresa || ex.nome_completo}</td>
                              <td className="p-3 text-gray-600">{ex.cnpj || ex.cpf}</td>
                              <td className="p-3">
                                <div>{ex.email_contato}</div>
                                <div className="text-gray-500">{ex.telefone_contato}</div>
                              </td>
                              <td className="p-3">
                                {ex.cidade}/{ex.estado}
                              </td>
                              <td className="p-3">{ex.stand || "-"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="visitors">
                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100">
                  <h2 className="text-xl font-bold text-green-800 mb-4">Lista de Visitantes</h2>
                  {clientes.length === 0 ? (
                    <div className="text-center py-12">
                      <Key className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Nenhum visitante registrado</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2 border-green-100">
                            <th className="text-left p-3 text-green-800 font-semibold">Nome</th>
                            <th className="text-left p-3 text-green-800 font-semibold">Contato</th>
                            <th className="text-left p-3 text-green-800 font-semibold">Endereço</th>
                            <th className="text-left p-3 text-green-800 font-semibold">Interesse</th>
                          </tr>
                        </thead>
                        <tbody>
                          {clientes.map((v) => (
                            <tr key={v.id} className="border-b border-green-50 hover:bg-green-50 transition-colors">
                              <td className="p-3">{v.nome}</td>
                              <td className="p-3">
                                <div>{v.email}</div>
                                <div className="text-gray-500">{v.telefone}</div>
                              </td>
                              <td className="p-3 text-gray-600">{v.endereco}</td>
                              <td className="p-3">{v.interesse}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="negotiations">
                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100">
                  <h2 className="text-xl font-bold text-green-800 mb-4">Negociações</h2>
                  {negociacoes.length === 0 ? (
                    <div className="text-center py-12">
                      <Key className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Nenhuma negociação registrada</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2 border-green-100">
                            <th className="text-left p-3 text-green-800 font-semibold">Item</th>
                            <th className="text-left p-3 text-green-800 font-semibold">Quantidade</th>
                            <th className="text-left p-3 text-green-800 font-semibold">Valor</th>
                            <th className="text-left p-3 text-green-800 font-semibold">Status</th>
                            <th className="text-left p-3 text-green-800 font-semibold">Data</th>
                          </tr>
                        </thead>
                        <tbody>
                          {negociacoes.map((neg) => (
                            <tr key={neg.id} className="border-b border-green-50 hover:bg-green-50 transition-colors">
                              <td className="p-3">{neg.item}</td>
                              <td className="p-3">{neg.quantidade}</td>
                              <td className="p-3 font-semibold text-green-700">
                                R${" "}
                                {Number.parseFloat(String(neg.valor)).toLocaleString("pt-BR", {
                                  minimumFractionDigits: 2,
                                })}
                              </td>
                              <td className="p-3">
                                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                  {neg.status}
                                </span>
                              </td>
                              <td className="p-3 text-gray-600">{formatDateTime(neg.data_hora)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="segments">
                <SegmentosManager segmentos={segmentos} onUpdate={setSegmentos} />
              </TabsContent>

              <TabsContent value="types">
                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-green-800">Gerenciar Tipos de Expositores</h2>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Nome do tipo"
                        value={newTipoExpositor}
                        onChange={(e) => setNewTipoExpositor(e.target.value)}
                        className="w-64"
                      />
                      <Button onClick={handleAddTipoExpositor} disabled={isAddingTipo || !newTipoExpositor.trim()}>
                        <Key className="w-4 h-4 mr-2" />
                        Adicionar
                      </Button>
                    </div>
                  </div>

                  {tiposExpositores.length === 0 ? (
                    <div className="text-center py-12">
                      <Key className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Nenhum tipo cadastrado</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {tiposExpositores.map((tipo) => (
                        <div
                          key={tipo.id}
                          className="bg-green-50 rounded-lg p-4 flex justify-between items-center border border-green-200"
                        >
                          <div className="flex items-center gap-3">
                            <Key className="w-5 h-5 text-green-700" />
                            <span className="font-semibold text-green-800">{tipo.descricao}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTipoExpositor(tipo.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <LogOut className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
