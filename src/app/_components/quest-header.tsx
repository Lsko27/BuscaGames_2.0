"use client"

import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { useSession } from "next-auth/react"

const QuestHeader = () => {
  const userProgress = 50
  const { data: session, status } = useSession()

  if (status === "loading" || !session?.user) return null

  const user = session.user
  const userName = user.userName || user.name || user.email?.split("@")[0] || "Usuário"
  const avatar = user.image

  return (
    <div className="flex w-full flex-col gap-6 md:flex-row md:items-center md:gap-6">
      {/* ESQUERDA */}
      <div className="flex w-full flex-col gap-3">
        <h3 className="text-4xl font-bold">Quests & Missões</h3>
        <p className="text-lg text-gray-400">
          Complete desafios, ganhe XP e desbloqueie recompensas exclusivas!
        </p>
      </div>

      {/* DIREITA */}
      <div className="flex w-full justify-center md:justify-start">
        <Card className="w-full max-w-4xl border-blue-300 bg-zinc-900">
          <CardContent>
            <div className="flex items-center justify-start gap-3">
              <div className="relative">
                <Avatar className="h-16 w-16">
                  {avatar ? (
                    <AvatarImage src={avatar} alt={userName} />
                  ) : (
                    <AvatarFallback className="bg-gray-800">
                      {userName[0].toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>

                <div className="absolute -right-1 -bottom-1 rounded-full border-2 border-gray-900 bg-green-500 px-2 py-0.5 text-xs font-bold text-black">
                  1
                </div>
              </div>

              <div className="flex w-full flex-col gap-2">
                <p className="text-xl text-white">{userName}</p>

                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                  <div
                    className="h-full rounded-full bg-green-500 transition-all duration-300"
                    style={{ width: `${userProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400">{userProgress}/100 XP</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default QuestHeader
