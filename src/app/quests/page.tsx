import Image from "next/image"
import QuestCards from ".@/components/quest-cards"
import QuestHeader from ".@/components/quest-header"
import RequireAuth from ".@/components/require-auth"
import { Quest } from "@/types/quest"

const QuestsPage = async () => {
  const res = await fetch("http://localhost:5050/quests", {
    cache: "no-store",
  })
  const quests: Quest[] = await res.json()

  const dailyQuests = quests.filter((q) => q.type === "DAILY")
  const weeklyQuests = quests.filter((q) => q.type === "WEEKLY")

  return (
    <RequireAuth>
      <div className="min-h-screen w-full bg-slate-300 dark:bg-slate-950">
        {/* HEADER */}
        <div className="relative h-auto w-full p-10">
          <Image
            alt="Banner"
            src="/freepik__expand__92115.png"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />

          <div className="relative flex w-full justify-center px-6 py-8 md:px-12 lg:px-24">
            <QuestHeader />
          </div>
        </div>

        {/* CONTEÚDO */}
        <div className="w-full space-y-16 px-4 py-10 sm:px-6 md:px-10 lg:px-24">
          {/* Quests Diárias */}
          <div>
            <h2 className="mb-8 text-center text-2xl font-semibold sm:text-3xl">
              Quests Diárias
            </h2>
            <div className="flex justify-center">
              <div className="grid auto-rows-min grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {dailyQuests.map((q) => (
                  <QuestCards key={q.id} quest={q} />
                ))}
              </div>
            </div>
          </div>

          {/* Quests Semanais */}
          <div>
            <h2 className="mb-8 text-center text-2xl font-semibold sm:text-3xl">
              Quests Semanais
            </h2>
            <div className="flex justify-center">
              <div className="grid auto-rows-min grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {weeklyQuests.map((q) => (
                  <QuestCards key={q.id} quest={q} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  )
}

export default QuestsPage
