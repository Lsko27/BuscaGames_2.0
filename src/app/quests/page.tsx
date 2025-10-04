import Image from "next/image"
import QuestCards from "../_components/quest-cards"
import QuestHeader from "../_components/quest-header"

interface Quest {
  id: string
  title: string
  description: string
  points: number
  progress: number
  totalSteps: number
  type: "DAILY" | "WEEKLY"
}

const QuestsPage = async () => {
  // Fetch das quests do backend
  const res = await fetch("http://localhost:5050/quests", {
    cache: "no-store", // para sempre buscar a versão mais recente
  })
  const quests: Quest[] = await res.json()

  const dailyQuests = quests.filter((q) => q.type === "DAILY")
  const weeklyQuests = quests.filter((q) => q.type === "WEEKLY")

  return (
    <>
      {/* Header */}
      <div className="relative h-[20vh] w-full">
        <Image
          alt="Banner"
          src="/freepik__expand__92115.png"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.3)]" />
        <div className="absolute w-full px-48 py-10">
          <QuestHeader />
        </div>
      </div>

      <div className="min-h-screen space-y-10 bg-slate-950 px-28 py-10">
        {/* Quests Diárias */}
        <div>
          <h2 className="my-8 text-center text-3xl font-semibold text-white">
            Quests Diárias
          </h2>
          <div className="flex justify-center gap-4">
            {dailyQuests.map((quest) => (
              <QuestCards key={quest.id} params={quest} />
            ))}
          </div>
        </div>

        {/* Quests Semanais */}
        <div>
          <h2 className="mt-12 mb-8 text-center text-3xl font-semibold text-white">
            Quests Semanais
          </h2>
          <div className="flex justify-center gap-6">
            {weeklyQuests.map((quest) => (
              <QuestCards key={quest.id} params={quest} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default QuestsPage
