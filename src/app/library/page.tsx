"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import RequireAuth from "@/components/require-auth"
import LibraryItem from "@/components/library-item"
import { Joystick } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import LoadingScreen from "@/components/loading-screen"

// --- Tipagem dos jogos da biblioteca ---
interface GameCategory {
  category: { name: string }
}

interface LibraryGame {
  id: string
  title: string
  categories: string[]
  purchasedAt: Date
  image: string
}

interface LibraryEntry {
  id: string
  purchasedAt: string
  game: {
    id: string
    title: string
    categories: GameCategory[]
    image: string
  }
}

const LibraryPage = () => {
  const { data: session } = useSession()
  const [libraryGames, setLibraryGames] = useState<LibraryGame[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session?.user?.id) return

    const fetchLibrary = async () => {
      try {
        const res = await fetch(
          `http://localhost:5050/library?userId=${session.user.id}`,
        )
        if (!res.ok) throw new Error("Erro ao buscar biblioteca")
        const data: LibraryEntry[] = await res.json()

        const games: LibraryGame[] = data.map((entry) => ({
          id: entry.game.id,
          title: entry.game.title,
          categories: entry.game.categories
            ? entry.game.categories.map((c) => c.category.name)
            : [],
          purchasedAt: new Date(entry.purchasedAt),
          image: entry.game.image,
        }))

        setLibraryGames(games)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchLibrary()
  }, [session])

  if (!session) return <p>Você precisa estar logado para ver sua biblioteca</p>

  return (
    <RequireAuth>
      <div className="relative h-auto min-h-[25vh] w-full p-10">
        <Image
          alt="Banner"
          src="/freepik__expand__92115.png"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <h1 className="text-4xl font-bold text-white">Minha biblioteca</h1>
          <p className="text-lg text-gray-300">
            Reviva suas jornadas, descubra novos mundos e acompanhe seu
            progresso em todos os jogos que você conquistou.
          </p>
        </div>
      </div>

      <div className="w-full px-4 py-10 sm:px-6 md:px-10 lg:px-24">
        <h2 className="mb-6 border-b border-gray-500 pb-6 text-center text-3xl font-semibold">
          Meus Jogos
        </h2>

        {loading ? (
          <LoadingScreen />
        ) : libraryGames.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center gap-3">
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
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {libraryGames.map((game) => (
              <LibraryItem key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
    </RequireAuth>
  )
}

export default LibraryPage
