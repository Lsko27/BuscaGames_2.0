"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/progress"
import { Earth, Zap } from "lucide-react"

const ESGModule = () => {
  const [usageHours, setUsageHours] = useState<number>(1)
  const [result, setResult] = useState<number | null>(null)

  const handleSimulate = () => {
    // 1h de uso ≈ 0.05 kWh (estimativa média)
    const energy = usageHours * 0.05
    setResult(energy)
  }

  const getFeedback = () => {
    if (!result) return ""
    if (result < 0.1)
      return "Excelente! Seu impacto energético é muito baixo 🌱"
    if (result < 0.3)
      return "Bom uso! Considere pausas automáticas e modo escuro para economizar ⚡"
    return "Atenção! Que tal reduzir o tempo de tela ou ativar modos de economia? 💡"
  }

  return (
    <div className="space-y-6">
      {/* Seção Educacional ESG */}
      <Card className="rounded-2xl bg-white shadow-md dark:bg-gray-900">
        <CardContent className="p-6">
          <div className="flex gap-3">
            <Earth size={30} />
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Educação ESG — Consumo Consciente
            </h2>
          </div>
          <p className="leading-relaxed text-gray-600 dark:text-gray-300">
            O <strong>BuscaGames</strong> promove a responsabilidade digital.
            Jogar é ótimo — mas também é importante entender o impacto
            energético e as boas práticas sustentáveis.
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>Ative o modo escuro para reduzir o consumo de energia.</li>
            <li>Evite deixar o jogo em segundo plano por longos períodos.</li>
            <li>
              Desligue notificações desnecessárias para otimizar recursos.
            </li>
            <li>Prefira servidores locais e horários de menor tráfego.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Simulador de Consumo Energético */}
      <Card className="rounded-2xl bg-white shadow-md dark:bg-gray-900">
        <CardContent className="space-y-4 p-6">
          <div className="flex gap-3">
            <Zap size={30} />
            <h2 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Simulador de Consumo Energético
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Informe quantas horas por dia você usa o BuscaGames para estimar seu
            consumo energético digital:
          </p>

          <div className="mt-3 flex items-center gap-3">
            <input
              type="number"
              min="0"
              step="0.5"
              value={usageHours}
              onChange={(e) => setUsageHours(Number(e.target.value))}
              className="w-24 rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-center text-gray-800 dark:border-gray-700 dark:text-gray-100"
            />
            <span className="text-gray-600 dark:text-gray-300">horas/dia</span>
            <Button onClick={handleSimulate}>Simular</Button>
          </div>

          {result !== null && (
            <div className="mt-4">
              <p className="mb-2 text-gray-700 dark:text-gray-200">
                Consumo estimado: <strong>{result.toFixed(2)} kWh/dia</strong>
              </p>
              <Progress
                value={Math.min(result * 200, 100)}
                className="h-3 bg-gray-200 dark:bg-gray-700"
              />
              <p className="mt-2 text-sm text-gray-500 italic dark:text-gray-400">
                {getFeedback()}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ESGModule
