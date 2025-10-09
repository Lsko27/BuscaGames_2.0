"use client"

import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Gift, ArrowRight } from "lucide-react"
import Link from "next/link"

interface RewardsCardProps {
  progress: number
}

const Rewards = ({ progress }: RewardsCardProps) => {
  return (
    <Card className="border-0 bg-slate-100 dark:bg-gray-800">
      <CardContent>
        <div className="flex items-center gap-2 text-purple-800 dark:text-purple-500">
          <Gift size={32} />
          <p className="text-xl font-bold">Recompensas</p>
        </div>
        <div className="mt-5 mb-7">
          <p className="dark:text-gray-300">
            Complete missões e ganhe XP para desbloquear cupons de desconto
            exclusivos!
          </p>
        </div>
        <div className="mb-7 w-full">
          <div className="mb-1 flex justify-between text-gray-500 dark:text-gray-300">
            <p>Nível 1</p>
            <p>{progress}/100 XP</p>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-300 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-green-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full bg-purple-700 text-lg text-white"
        >
          <Link href="/quests">
            <div className="flex items-center gap-2">
              Ver Quests e Missões
              <ArrowRight />
            </div>
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default Rewards
