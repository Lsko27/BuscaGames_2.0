"use client"

import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Card, CardContent } from "./ui/card"

const ProfileHeader = () => {
  const { data: session } = useSession()
  const userProgress = 50
  if (!session) return

  const user = session.user
  const userName =
    user.userName || user.name || user.email?.split("@")[0] || "Usuário"
  const avatar = user.image

  return (
    <Card className="border-0 bg-gradient-to-br from-rose-950 to-purple-900 px-4">
      <CardContent className="w-full px-12 py-10">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          {/* ESQUERDA */}
          <div className="flex w-full max-w-md flex-col items-center md:items-start">
            <div className="flex items-center gap-5">
              <Avatar className="h-24 w-24">
                {avatar ? (
                  <AvatarImage src={avatar} alt={userName} />
                ) : (
                  <AvatarFallback className="bg-gray-800 text-lg">
                    {userName[0].toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="flex flex-col">
                <p className="text-2xl font-semibold text-white">{userName}</p>
                <p className="text-gray-300">Nível 1</p>
              </div>
            </div>

            <div className="mt-6 flex w-full flex-row items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-700">
                <div
                  className="h-full rounded-full bg-green-500 transition-all duration-300"
                  style={{ width: `${userProgress}%` }}
                />
              </div>
              <p className="w-24 text-right text-sm text-gray-300">
                {userProgress}/100 XP
              </p>
            </div>
          </div>

          {/* DIREITA */}
          <div className="grid w-full max-w-2xl grid-cols-3 gap-6 text-white">
            {[
              { value: 0, label: "Jogos" },
              { value: 0, label: "Favoritos" },
              { value: 1, label: "Conquistas" },
            ].map((item, index) => (
              <Card
                key={index}
                className="flex-1 border-blue-500 bg-slate-950/90 text-center transition-all duration-300 hover:scale-105 hover:border-blue-400"
              >
                <CardContent className="flex flex-col items-center justify-center py-4">
                  <h3 className="text-2xl font-bold text-white">
                    {item.value}
                  </h3>
                  <p className="text-sm text-gray-300">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfileHeader
