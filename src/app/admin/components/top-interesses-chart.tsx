"use client";

import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface Props {
  data: { name: string; value: number }[];
}

const COLORS = ["#16a34a", "#f97316", "#0ea5e9", "#a855f7", "#22c55e"];

export function TopInteressesChart({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-bold mb-4 text-green-800">🔥 Top Interesses</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
