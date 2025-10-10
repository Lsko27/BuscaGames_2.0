"use client"

import RequireAuth from ".@/components/require-auth"
import HypeIndexGraph from "@/components/hype-index"
import ResourceDepreciationGraph from "@/components/resource-depreciation-graph"
import RevenueProjectionGraph from "@/components/revenue-projection-graph"

const DashboardPage = () => {
  return (
    <RequireAuth>
      <div className="min-h-screen w-full space-y-10 bg-slate-200 p-8 dark:bg-gray-900">
        <h1 className="mb-8 text-4xl font-bold text-purple-900 dark:text-white">
          Painel de Gerenciamento
        </h1>

        {/* Projeção de Receita */}
        <div className="rounded-2xl bg-white p-6 dark:bg-gray-900">
          <RevenueProjectionGraph
            initialRevenue={5000}
            growthRate={0.2}
            months={12}
          />
        </div>

        {/* Hype Index */}
        <div className="rounded-2xl bg-white p-6 dark:bg-gray-900">
          <h2 className="mb-4 text-2xl font-bold text-purple-900 dark:text-purple-300">
            Hype Index
          </h2>
          <HypeIndexGraph
            gameName="Marvel's Spider-man 2"
            base={50}
            months={12}
          />
        </div>

        {/* Depreciação de Recursos */}
        <div className="rounded-2xl bg-white p-6 dark:bg-gray-900">
          <ResourceDepreciationGraph initial={150000} rate={0.08} months={12} />
        </div>
      </div>
    </RequireAuth>
  )
}

export default DashboardPage
