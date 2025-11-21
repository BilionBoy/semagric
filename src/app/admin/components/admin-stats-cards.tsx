"use client";

import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  DollarSign,
  BarChart3,
  TrendingUp,
} from "lucide-react";

interface Props {
  totalExpositores: number;
  totalClientes: number;
  totalNegociacoes: number;
  totalValue: number;
  ticketMedio?: number;
}

export function AdminStatsCards({
  totalExpositores,
  totalClientes,
  totalNegociacoes,
  totalValue,
  ticketMedio = 0,
}: Props) {
  const cards = [
    {
      title: "Expositores",
      value: totalExpositores,
      icon: Users,
      color: "bg-green-600",
    },
    {
      title: "Visitantes",
      value: totalClientes,
      icon: UserCheck,
      color: "bg-green-600",
    },
    {
      title: "Volume Total",
      value: `R$ ${Number(totalValue || 0).toLocaleString("pt-BR")}`,
      icon: DollarSign,
      color: "bg-orange-600",
    },
    {
      title: "Negócios",
      value: totalNegociacoes,
      icon: BarChart3,
      color: "bg-green-600",
    },
    {
      title: "Ticket Médio",
      value: `R$ ${Number(ticketMedio || 0).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      })}`,
      icon: TrendingUp,
      color: "bg-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="bg-white p-6 rounded-2xl shadow"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-full text-white ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold">{card.title}</span>
          </div>

          <div className="text-2xl font-bold text-green-700">{card.value}</div>
        </motion.div>
      ))}
    </div>
  );
}
