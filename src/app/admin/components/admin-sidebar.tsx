"use client"

import { Button } from "@/components/ui/button"
import { LayoutDashboard, Building2, UsersRound, Handshake, Tags, UserCog, LogOut } from "lucide-react"

interface AdminSidebarProps {
  onLogout: () => void
}

export function AdminSidebar({ onLogout }: AdminSidebarProps) {
  return (
    <aside className="w-64 bg-white border-r-2 border-green-100 shadow-lg">
      <nav className="p-4 space-y-2">
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2 px-3">Principal</p>
          <Button
            variant="ghost"
            className="w-full justify-start text-green-800 hover:bg-green-50"
            onClick={() => document.getElementById("dashboard-section")?.scrollIntoView({ behavior: "smooth" })}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Button>
        </div>

        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2 px-3">Dados</p>
          <Button
            variant="ghost"
            className="w-full justify-start text-green-800 hover:bg-green-50"
            onClick={() => document.getElementById("expositores-tab")?.click()}
          >
            <Building2 className="w-5 h-5 mr-3" />
            Expositores
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-green-800 hover:bg-green-50"
            onClick={() => document.getElementById("visitantes-tab")?.click()}
          >
            <UsersRound className="w-5 h-5 mr-3" />
            Visitantes
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-green-800 hover:bg-green-50"
            onClick={() => document.getElementById("negociacoes-tab")?.click()}
          >
            <Handshake className="w-5 h-5 mr-3" />
            Negociações
          </Button>
        </div>

        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2 px-3">Configurações</p>
          <Button
            variant="ghost"
            className="w-full justify-start text-green-800 hover:bg-green-50"
            onClick={() => document.getElementById("segmentos-tab")?.click()}
          >
            <Tags className="w-5 h-5 mr-3" />
            Segmentos
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-green-800 hover:bg-green-50"
            onClick={() => document.getElementById("tipos-tab")?.click()}
          >
            <UserCog className="w-5 h-5 mr-3" />
            Tipos de Expositor
          </Button>
        </div>

        <div className="pt-4 mt-4 border-t border-green-100">
          <Button variant="ghost" onClick={onLogout} className="w-full justify-start text-red-600 hover:bg-red-50">
            <LogOut className="w-5 h-5 mr-3" />
            Sair do Sistema
          </Button>
        </div>
      </nav>
    </aside>
  )
}
