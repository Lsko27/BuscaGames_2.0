"use client"

import { generateProjectionData, ProjectionData } from "@/_utils/generate-projection-data"
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

interface ResourceDepreciationGraphProps {
  initial?: number
  rate?: number
  months?: number
}

export default function ResourceDepreciationGraph({
  initial = 100000,
  rate = 0.05,
  months = 12,
}: ResourceDepreciationGraphProps) {
  const data: ProjectionData[] = useMemo(
    () => generateProjectionData(initial, rate, months, "decay"),
    [initial, rate, months],
  )

  return (
    <div className="h-80 w-full rounded-2xl bg-white p-4 dark:bg-gray-900">
      <h2 className="mb-4 text-xl font-bold dark:text-purple-300">
        Depreciação de Recursos
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            formatter={(v: number) => [
              `R$ ${v.toLocaleString("pt-BR")}`,
              "Valor Atual",
            ]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#ef4444"
            strokeWidth={3}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
