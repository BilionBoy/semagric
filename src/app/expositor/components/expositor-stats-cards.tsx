"use client"

import { motion } from "framer-motion"
import { Users, DollarSign, BarChart2, TrendingUp } from "lucide-react"

interface ExpositorStatsCardsProps {
  totalClientes: number
  totalValue: number
  dealsClosed: number
}

export function ExpositorStatsCards({ totalClientes, totalValue, dealsClosed }: ExpositorStatsCardsProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="amazon-gradient w-12 h-12 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <TrendingUp className="w-5 h-5 text-green-600" />
        </div>
        <p className="text-gray-600 text-sm mb-1">Total de Clientes</p>
        <p className="text-3xl font-bold text-green-800">{totalClientes}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="earth-gradient w-12 h-12 rounded-full flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <TrendingUp className="w-5 h-5 text-orange-600" />
        </div>
        <p className="text-gray-600 text-sm mb-1">Volume Total</p>
        <p className="text-3xl font-bold text-orange-700">
          R$ {totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="amazon-gradient w-12 h-12 rounded-full flex items-center justify-center">
            <BarChart2 className="w-6 h-6 text-white" />
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-1">Vendas Fechadas</p>
        <p className="text-3xl font-bold text-green-800">{dealsClosed}</p>
      </motion.div>
    </div>
  )
}
