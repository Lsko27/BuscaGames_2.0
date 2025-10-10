"use client"

import { useMemo } from "react"
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface RevenueProjectionGraphProps {
  initialRevenue?: number
  growthRate?: number
  months?: number
}

interface RevenueData {
  month: string
  revenue: number
}

/**
 * Gera os dados de projeção de receita com crescimento exponencial
 * Fórmula: Receita no mês n = receitaInicial * (1 + taxaCrescimento) ^ n
 */
function generateRevenueData(
  initialRevenue = 1000,
  growthRate = 0.1,
  months = 12,
): RevenueData[] {
  const monthNames = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ]

  const data: RevenueData[] = []
  const today = new Date()

  for (let i = 0; i < months; i++) {
    const monthIndex = (today.getMonth() + i) % 12
    const projectedRevenue = Math.round(
      initialRevenue * Math.pow(1 + growthRate, i),
    )

    data.push({
      month: monthNames[monthIndex],
      revenue: projectedRevenue,
    })
  }

  return data
}

export default function RevenueProjectionGraph({
  initialRevenue = 1000,
  growthRate = 0.1,
  months = 12,
}: RevenueProjectionGraphProps) {
  const data: RevenueData[] = useMemo(
    () => generateRevenueData(initialRevenue, growthRate, months),
    [initialRevenue, growthRate, months],
  )

  return (
    <div className="h-80 w-full rounded-2xl bg-white p-4 dark:bg-gray-900">
      <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-purple-300">
        Projeção de Receita
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            formatter={(val: number) => [
              `R$ ${val.toLocaleString("pt-BR")}`,
              "Receita",
            ]}
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#10b981"
            strokeWidth={3}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
