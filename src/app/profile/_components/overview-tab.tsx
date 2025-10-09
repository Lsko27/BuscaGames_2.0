import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Joystick, History } from "lucide-react"
import Link from "next/link"

const OverviewTab = () => {
  return (
    <>
      <Card className="mt-5 border-0 bg-slate-200 dark:bg-gray-800">
        <CardContent>
          <h2 className="mb-6 text-xl font-semibold">Atividades Recentes</h2>
          <div className="flex flex-col items-center justify-center gap-3">
            <History size={45} className="text-gray-600 dark:text-gray-400" />
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
              Nenhuma Atividade recente
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8 border-0 bg-slate-200 dark:bg-gray-800">
        <CardContent>
          <h2 className="mb-6 text-xl font-semibold">
            Minha Biblioteca de Jogos
          </h2>
          <div className="flex flex-col items-center justify-center gap-3">
            <Joystick size={45} className="text-gray-600 dark:text-gray-400" />
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
              Você ainda não possui jogos na sua biblioteca
            </p>
            <Button
              variant="ghost"
              className="w-full bg-purple-700 text-white"
              asChild
            >
              <Link href="/games">Explorar Jogos</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default OverviewTab
