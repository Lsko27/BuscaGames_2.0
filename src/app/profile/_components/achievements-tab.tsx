"use client"

import LoadingScreen from "@/app/_components/loading-screen"
import QuestCards from "@/app/_components/quest-cards"
import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import { QuestStatus } from "@/types/quest"
import { History } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface Quest {
  id: string
  title: string
  description: string
  points: number
  progress: number
  totalSteps: number
  type: "daily" | "weekly"
}

const AchievementsTab = () => {
  const [completedQuests, setCompletedQuests] = useState<Quest[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const res = await fetch("http://localhost:5050/quests")
        if (!res.ok) throw new Error("Falha ao buscar quests")
        const data: Quest[] = await res.json()
        setCompletedQuests(data.filter((q) => q.progress >= q.totalSteps))
      } catch (err) {
        console.error(err)
        toast.error("Erro ao buscar conquistas!")
        setCompletedQuests([])
      } finally {
        setLoading(false)
      }
    }

    fetchQuests()
  }, [])

  if (loading) return <LoadingScreen />

  if (completedQuests.length === 0) {
    return (
      <Card className="border-0 bg-gray-800 p-10 text-white">
        <h2 className="mb-6 text-xl font-semibold">Minhas Conquistas</h2>
        <div className="flex flex-col items-center justify-center gap-3">
          <History size={45} className="text-gray-400" />
          <p className="text-lg font-medium text-gray-400">
            Nenhuma Conquista disponível
          </p>
          <Button variant="ghost" className="w-full bg-purple-700">
            Explorar Jogos
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <Card className="border-0 bg-gray-800 text-white">
        <CardContent>
          <h2 className="mb-6 text-xl font-semibold sm:text-2xl">
            Minhas Conquistas
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {completedQuests.map((quest) => {
              let status: QuestStatus

              if (quest.progress === 0) status = QuestStatus.NOT_STARTED
              else if (quest.progress >= quest.totalSteps)
                status = QuestStatus.COMPLETED
              else status = QuestStatus.IN_PROGRESS

              return (
                <QuestCards
                  key={quest.id}
                  quest={{
                    id: quest.id,
                    title: quest.title,
                    description: quest.description,
                    points: quest.points,
                    progress: quest.progress,
                    totalSteps: quest.totalSteps,
                    type: quest.type.toUpperCase() as "DAILY" | "WEEKLY",
                    status,
                  }}
                />
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AchievementsTab
