"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import FavoriteCards from "@/components/favorites-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BellRing, Heart } from "lucide-react"
import Link from "next/link"
import LoadingScreen from "@/components/loading-screen"
import { toast } from "sonner"

interface FavoriteGame {
  id: string
  title: string
  image: string
  price: number
}

const FavoriteTab = () => {
  const { data: session } = useSession()
  const [favoriteGames, setFavoriteGames] = useState<FavoriteGame[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch(
          `http://localhost:5050/favorites/${session?.user?.id}`,
        )
        if (!res.ok) throw new Error("Erro ao buscar favoritos")
        const favoriteIds: string[] = await res.json()

        if (!favoriteIds || favoriteIds.length === 0) {
          setFavoriteGames([])
          return
        }

        const gameRequests = favoriteIds.map((id) =>
          fetch(`http://localhost:5050/games/${id}`).then((res) => res.json()),
        )
        const games = await Promise.all(gameRequests)
        setFavoriteGames(games)
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error)
        toast.error("Erro ao carregar seus jogos favoritos.")
      } finally {
        setLoading(false)
      }
    }

    if (session?.user?.id) {
      fetchFavorites()
    } else {
      setLoading(false)
    }
  }, [session])

  const handleRemoveFavorite = async (id: string) => {
    try {
      if (!session) return
      await fetch("http://localhost:5050/favorites", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id, gameId: id }),
      })
      // Atualiza o estado local
      setFavoriteGames((prev) => prev.filter((game) => game.id !== id))
      toast.success("Removido dos favoritos")
    } catch (err) {
      console.error(err)
      toast.error("Erro ao remover dos favoritos")
    }
  }

  // No render:
  {
    favoriteGames.map((game) => (
      <FavoriteCards
        key={game.id}
        favoriteCard={game}
        handleRemoveFavorite={handleRemoveFavorite}
      />
    ))
  }

  if (loading) return <LoadingScreen />

  return (
    <>
      <Card className="border-0 bg-slate-200 dark:bg-gray-800">
        {favoriteGames.length === 0 ? (
          <CardContent>
            <h2 className="mb-6 text-xl font-semibold">Meus Jogos Favoritos</h2>
            <div className="flex flex-col items-center justify-center gap-3">
              <Heart
                size={45}
                className="fill-gray-600 text-gray-600 dark:fill-gray-400 dark:text-gray-400"
              />
              <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                Você ainda não adicionou jogos aos favoritos
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
        ) : (
          <div className="px-10">
            <h2 className="mb-6 text-xl font-semibold">Meus Jogos Favoritos</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {favoriteGames.map((game) => (
                <FavoriteCards
                  key={game.id}
                  favoriteCard={game}
                  handleRemoveFavorite={handleRemoveFavorite}
                />
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card className="mt-5 border-0 bg-slate-200 dark:bg-gray-800">
        <CardContent>
          <h2 className="mb-6 text-xl font-semibold">Alerta de Preços</h2>
          <div className="flex flex-col items-center justify-center gap-3">
            <BellRing
              size={45}
              className="fill-gray-600 text-gray-600 dark:fill-gray-400 dark:text-gray-400"
            />
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
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
