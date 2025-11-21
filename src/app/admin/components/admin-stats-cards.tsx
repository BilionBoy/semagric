"use client"

import { motion } from "framer-motion"
import { Building2, Users, DollarSign, BarChartHorizontal } from "lucide-react"

interface AdminStatsCardsProps {
  totalExpositores: number
  totalClientes: number
  totalNegociacoes: number
  totalValue: number
}

export function AdminStatsCards({
  totalExpositores,
  totalClientes,
  totalNegociacoes,
  totalValue,
}: AdminStatsCardsProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="amazon-gradient w-12 h-12 rounded-full flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-1">Expositores</p>
        <p className="text-2xl font-bold text-green-800">{totalExpositores}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="amazon-gradient w-12 h-12 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-1">Visitantes</p>
        <p className="text-2xl font-bold text-green-800">{totalClientes}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="earth-gradient w-12 h-12 rounded-full flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-1">Volume Total</p>
        <p className="text-2xl font-bold text-green-800">R$ {totalValue.toLocaleString("pt-BR")}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="amazon-gradient w-12 h-12 rounded-full flex items-center justify-center">
            <BarChartHorizontal className="w-6 h-6 text-white" />
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-1">Negócios</p>
        <p className="text-2xl font-bold text-green-800">{totalNegociacoes}</p>
      </motion.div>
    </div>
  )
}
