import LoadingScreen from "@/components/loading-screen"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import LibraryItem from "@/app/library/_components/library-item"
import { Joystick, History } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"

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

const OverviewTab = () => {
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
        console.error("Erro ao carregar biblioteca:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchLibrary()
  }, [session])

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

          {loading ? (
            <LoadingScreen />
          ) : libraryGames.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3">
              <Joystick
                size={45}
                className="text-gray-600 dark:text-gray-400"
              />
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
        </CardContent>
      </Card>
    </>
  )
}

export default OverviewTab
