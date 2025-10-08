import { Calendar, CheckCircle, ClockFading, Loader } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Quest, QuestStatus } from "@/types/quest"
interface QuestCardsProps {
  quest: Quest
}

const QuestCards = ({ quest }: QuestCardsProps) => {
  const { status, type, title, progress, totalSteps, points } = quest
  const isCompleted = status === QuestStatus.COMPLETED
  const IconComponent = type === "DAILY" ? ClockFading : Calendar

  return (
    <Card className="min-h-[270px] w-full border-blue-500 bg-gray-900">
      <CardContent className="flex h-full flex-col">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between">
          <IconComponent className="text-pink-600" size={32} />
          {isCompleted ? (
            <CheckCircle className="text-green-500" size={32} />
          ) : (
            <Loader className="text-blue-500" size={32} />
          )}
        </div>

        {/* Conteúdo */}
        <div className="mt-6 flex-1">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="mt-4 text-sm text-gray-400">
            {progress} de {totalSteps} etapas concluídas
          </p>

          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-700">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isCompleted ? "bg-green-500" : "bg-pink-600"
              }`}
              style={{ width: `${(progress / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Rodapé */}
        <div className="mt-auto flex items-center justify-between">
          <p className="text-md font-semibold text-green-500">{points} XP</p>
          <Button
            variant="ghost"
            className={`text-lg text-white ${
              isCompleted ? "bg-green-600" : "bg-pink-600"
            }`}
            disabled={isCompleted}
          >
            {isCompleted
              ? "Concluído"
              : status === QuestStatus.NOT_STARTED
                ? "Iniciar"
                : "Continuar"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default QuestCards
