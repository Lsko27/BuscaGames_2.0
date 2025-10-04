import { Calendar, CheckCircle, ClockFading, Loader } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"

interface QuestCardsProps {
  params: {
    title: string
    description: string
    points: number
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
    <Card className="max-h-[270px] min-h-[270px] max-w-[350px] min-w-[350px] border-blue-500 bg-gray-900">
      <CardContent className="flex h-full flex-col">
        <div className="flex items-center justify-between">
          <IconComponent className="text-pink-600" size={32} />
          {progressPercentage === 100 ? (
            <CheckCircle className="text-green-500" />
          ) : (
            <Loader className="text-blue-500" />
          )}
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-white">{params.title}</h3>
          <p className="mt-4 text-sm text-gray-400">
            {params.progress} de {params.totalSteps} etapas concluídas
          </p>

          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-700">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                progressPercentage === 100 ? "bg-green-500" : "bg-pink-600"
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <p className="text-md font-semibold text-green-500">
            {params.points} XP
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
      </CardContent>
    </Card>
  )
}

export default QuestCards
