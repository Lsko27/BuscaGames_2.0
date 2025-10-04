import { Calendar, CheckCircle, ClockFading, Loader } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"

interface QuestCardsProps {
  params: {
    title: string
    description: string
    xp: number
    progress: number
    totalSteps: number
    type: "DAILY" | "WEEKLY"
  }
}

const QuestCards = ({ params }: QuestCardsProps) => {
  const IconComponent = params.type === "DAILY" ? ClockFading : Calendar

  const progressPercentage =
    params.totalSteps > 0
      ? Math.min((params.progress / params.totalSteps) * 100, 100)
      : 0

  return (
    <Card className="h-full w-full bg-gray-900">
      <CardContent className="flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <IconComponent className="text-pink-600" size={32} />
            {progressPercentage === 100 ? (
              <CheckCircle className="text-green-500" />
            ) : (
              <Loader className="text-blue-500" />
            )}
          </div>
          <h3 className="text-xl font-semibold text-white">{params.title}</h3>
          <p className="text-sm text-gray-400">
            {params.progress} de {params.totalSteps} etapas concluídas
          </p>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                progressPercentage === 100 ? "bg-green-500" : "bg-pink-600"
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-md font-semibold text-green-500">
              {params.xp} XP
            </p>
            <Button
              variant="ghost"
              className={`text-lg text-white ${
                progressPercentage === 100 ? "bg-green-600" : "bg-pink-600"
              }`}
              disabled={progressPercentage === 100}
            >
              {progressPercentage === 100
                ? "Concluído"
                : progressPercentage === 0
                  ? "Iniciar"
                  : "Continuar"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default QuestCards
