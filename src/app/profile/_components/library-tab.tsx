import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Joystick, History } from "lucide-react"
import Link from "next/link"

const LibraryTab = () => {
  return (
    <>
      <Card className="border-0 bg-gray-800 text-white">
        <CardContent>
          <h2 className="mb-6 text-xl font-semibold">
            Minha Biblioteca de Jogos
          </h2>
          <div className="flex flex-col items-center justify-center gap-3">
            <Joystick size={45} className="text-gray-400" />
            <p className="text-lg font-medium text-gray-400">
              Você ainda não possui jogos na sua biblioteca
            </p>
            <Button variant="ghost" className="w-full bg-purple-700" asChild>
              <Link href="/games">Explorar Jogos</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-5 border-0 bg-gray-800 text-white">
        <CardContent>
          <h2 className="mb-6 text-xl font-semibold">Jogados recentemente</h2>
          <div className="flex flex-col items-center justify-center gap-3">
            <History size={45} className="text-gray-400" />
            <p className="text-lg font-medium text-gray-400">
              Nenhum jogo jogado recentemente
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default LibraryTab
