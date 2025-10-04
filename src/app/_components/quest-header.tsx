import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarImage } from "./ui/avatar"

const QuestHeader = () => {
  const userProgress = 50

  return (
    <div className="flex w-full items-center justify-center">
      {/* ESQUERDA */}
      <div className="flex w-full flex-col p-0">
        <h3 className="text-4xl font-bold">Quests & Missões</h3>
        <p className="text-lg text-gray-400">
          Complete desafios, ganhe XP e desbloqueie recompensas exclusivas!
        </p>
      </div>

      {/* DIREITA */}
      <div className="flex w-full items-center gap-3">
        <Card className="w-full border-blue-300 bg-zinc-900">
          <CardContent>
            <div className="flex items-center justify-start gap-3">
              <div className="relative">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src="/imagemAvatar.png"
                    className="object-cover"
                  />
                </Avatar>

                <div className="absolute -right-1 -bottom-1 rounded-full border-2 border-gray-900 bg-green-500 px-2 py-0.5 text-xs font-bold text-black">
                  1
                </div>
              </div>

              <div className="flex w-full flex-col gap-2">
                <p className="text-xl text-white">Yuri Lesko</p>

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
