import { BellRing, Heart } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

const FavoriteTab = () => {
  return (
    <>
      <Card className="border-0 bg-gray-800 text-white">
        <CardContent>
          <h2 className="mb-6 text-xl font-semibold">Meus Jogos Favoritos</h2>
          <div className="flex flex-col items-center justify-center gap-3">
            <Heart size={45} className="fill-gray-400 text-gray-400" />
            <p className="text-lg font-medium text-gray-400">
              Você ainda não adicionou jogos aos favoritos
            </p>
            <Button variant="ghost" className="w-full bg-purple-700">
              Explorar Jogos
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-5 border-0 bg-gray-800 text-white">
        <CardContent>
          <h2 className="mb-6 text-xl font-semibold">Alerta de Preços</h2>
          <div className="flex flex-col items-center justify-center gap-3">
            <BellRing size={45} className="fill-gray-400 text-gray-400" />
            <p className="text-lg font-medium text-gray-400">
              Você não configurou alertas de preços
            </p>
            <p className="text-gray-500">
              Adicione jogos aos favoritos e configure alertas de preço para
              receber notificações quando os preços baixarem
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default FavoriteTab
