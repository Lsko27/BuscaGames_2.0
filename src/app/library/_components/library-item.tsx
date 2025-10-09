import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Play } from "lucide-react"
import Image from "next/image"
import dayjs from "dayjs"
import "dayjs/locale/pt-br"

dayjs.locale("pt-br")

interface LibraryItemProps {
  game: {
    id: string
    title: string
    categories: string[]
    purchasedAt: Date
    image: string
  }
}

const LibraryItem = ({ game }: LibraryItemProps) => {
  return (
    <Card className="max-w-xl overflow-hidden p-0 dark:bg-slate-950">
      <CardContent className="p-0">
        <div className="flex flex-col items-stretch justify-between sm:flex-row">
          <div className="relative h-56 w-full sm:h-auto sm:w-1/2">
            <Image
              src={game.image}
              alt={game.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-between gap-4 p-6 text-center sm:w-1/2 sm:text-left">
            <p className="text-xl font-semibold">{game.title}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {game.categories.join(" • ")}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              adquirido em:{" "}
              <span className="text-md text-gray-900 dark:text-slate-100">
                {dayjs(game.purchasedAt).format("DD/MM/YYYY")}
              </span>
            </p>

            <Button className="flex w-full items-center justify-center gap-2 bg-green-600 text-lg text-white hover:bg-green-500">
              <Play size={18} />
              Jogar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default LibraryItem
