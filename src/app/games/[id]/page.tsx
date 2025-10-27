"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Image from "next/image"
import LoadingScreen from "@/components/loading-screen"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart } from "lucide-react"

interface CategoriesGame {
  category: {
    id: string
    name: string
  }
}

interface Game {
  id: string
  title: string
  description: string
  price: number
  image?: string
  categories?: CategoriesGame[]
  platform?: string
  discount?: number
}

const GamePage = () => {
  const params = useParams()
  const id = params?.id
  const [game, setGame] = useState<Game | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (!id) return

    const fetchGame = async () => {
      try {
        const res = await fetch(`http://localhost:5050/games/${id}`)
        if (!res.ok) throw new Error("Erro ao carregar o jogo")
        const data: Game = await res.json()
        setGame(data)
      } catch (err: unknown) {
        toast.error(err instanceof Error ? err.message : "Erro desconhecido")
      } finally {
        setLoading(false)
      }
    }

    fetchGame()
  }, [id])

  if (loading) return <LoadingScreen />
  if (!game) return <p>Jogo não encontrado</p>

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 p-8">
      {/* Seção principal */}
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Imagem do jogo */}
        <div className="relative h-80 flex-shrink-0 overflow-hidden shadow-lg md:h-[28rem] md:w-2/3">
          <Image
            src={game.image || "/placeholder.png"}
            alt={game.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Info do jogo */}
        <motion.div
          className="flex flex-1 flex-col gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold">{game.title}</h1>

          {/* Badges */}
          <div className="mt-2 flex flex-wrap gap-2">
            {game.platform && (
              <Badge className="bg-gray-700">{game.platform}</Badge>
            )}
            {game.categories?.map((cat) => (
              <Badge key={cat.category.id} className="bg-blue-600 text-white">
                {cat.category.name}
              </Badge>
            ))}
            {(game.discount ?? 0) > 0 && (
              <Badge className="bg-green-600 px-2 py-1 text-sm font-bold text-white">
                -{game.discount}%
              </Badge>
            )}
          </div>

          {/* Preço */}
          <p className="mt-2 text-2xl font-bold text-green-500">
            {game.price === 0
              ? "Gratuito"
              : Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(game.price)}
          </p>

          {/* Descrição curta */}
          <p className="line-clamp-3 text-gray-300">{game.description}</p>

          {/* Botões */}
          <div className="mt-4 flex gap-4">
            <Button className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2 text-white transition-all hover:bg-green-700">
              <ShoppingCart /> Adicionar
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="rounded-full"
              //   onClick={toggleFavorite}
            >
              <Heart
                className={`transition-all duration-300 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-white"
                }`}
              />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Galeria de screenshots / vídeos */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">Screenshots</h2>
        <div className="flex gap-4 overflow-x-auto">
          {/* Map screenshots */}
          {/* <Image src={screenshot.url} width={400} height={200} className="rounded-lg" /> */}
        </div>
      </div>

      {/* Reviews */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">Avaliações</h2>
        {/* Listar reviews */}
      </div>
    </div>
  )
}

export default GamePage
