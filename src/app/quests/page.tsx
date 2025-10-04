import QuestCards from "../_components/quest-cards"

const QuestsPage = () => {
  const mockQuests = [
    {
      title: "Entre no jogo hoje",
      description: "Faça login na sua conta pelo menos uma vez hoje.",
      xp: 50,
      progress: 1,
      totalSteps: 1,
      type: "DAILY" as const,
    },
    {
      title: "Jogue 3 partidas",
      description: "Complete 3 partidas em qualquer modo de jogo.",
      xp: 100,
      progress: 0,
      totalSteps: 3,
      type: "DAILY" as const,
    },
    {
      title: "Complete uma missão semanal",
      description: "Finalize qualquer missão especial durante a semana.",
      xp: 300,
      progress: 1,
      totalSteps: 2,
      type: "WEEKLY" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 p-10">
      <h1 className="mb-6 text-2xl font-bold text-white">Quests Disponíveis</h1>

      <div className="flex justify-between gap-4">
        {mockQuests.map((quest, i) => (
          <QuestCards key={i} params={quest} />
        ))}
      </div>
    </div>
  )
}

export default QuestsPage
