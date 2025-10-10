"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import GameCard from ".@/components/game-card"
import LoadingScreen from ".@/components/loading-screen"
import CategoryFilter from ".@/components/category-filter"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from ".@/components/ui/sheet"
import { Button } from ".@/components/ui/button"
import { MenuIcon } from "lucide-react"

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
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const maxPrice = searchParams.get("maxPrice")
  const { data: session } = useSession()

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (category) params.set("category", category)
        if (maxPrice) params.set("maxPrice", maxPrice)

        const res = await fetch(
          `http://localhost:5050/games?${params.toString()}`,
        )
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
        console.error("Erro ao carregar jogos:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [category, maxPrice])

  if (loading) return <LoadingScreen />

  return (
    <div className="flex flex-col items-start justify-center gap-6 bg-slate-300 px-4 py-6 md:flex-row md:px-10 dark:bg-zinc-900">
      {/* Sheet para mobile / tablet */}
      <div className="mb-4 block w-full md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-center bg-blue-600 text-white"
            >
              <MenuIcon className="mr-2" /> Filtros
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="h-full w-[70%] overflow-y-auto p-4 text-white dark:bg-zinc-800 [&::-webkit-scrollbar]:hidden"
          >
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            <CategoryFilter isSheet />
          </SheetContent>
        </Sheet>
      </div>

      {/* Sidebar desktop */}
      <div className="hidden w-[250px] flex-shrink-0 md:block">
        <CategoryFilter />
      </div>

      {/* Grid de jogos */}
      <div className="grid w-full max-w-[1800px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <GameCard
            key={game.id}
            params={game}
            userId={session?.user?.id ?? ""}
          />
        ))}
      </div>
    </div>
  )
}

export default GamesPage
