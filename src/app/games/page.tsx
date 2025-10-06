"use client"

import { useEffect, useState } from "react"
import GameCard from "../_components/game-card"
import LoadingScreen from "../_components/loading-screen"

interface GameFromAPI {
  id: string
  title: string
  description: string
  image: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  releaseDate: string
  developer: string
  publisher: string
  tags: string[]
  categories: { category: { name: string } }[]
}

// Tipo que o GameCard espera
interface GameForCard {
  id: string
  title: string
  description: string
  image: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  categories: string[]
}

const GamesPage = () => {
  const [games, setGames] = useState<GameForCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch("http://localhost:5050/games")
        const data: GameFromAPI[] = await res.json()

        const formatted: GameForCard[] = data.map((g) => ({
          id: g.id,
          title: g.title,
          description: g.description,
          image: g.image,
          price: g.price,
          originalPrice: g.originalPrice,
          discount: g.discount,
          rating: g.rating,
          categories: g.categories?.map((c) => c.category.name) || [],
        }))

        setGames(formatted)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <div className="min-h-screen bg-zinc-900 p-10">
      <div className="grid grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} params={game} />
        ))}
      </div>
    </div>
  )
}

export default GamesPage
