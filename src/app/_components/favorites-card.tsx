import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Heart } from "lucide-react"

interface FavoriteTabProps {
  favoriteCard: {
    id: string
    title: string
    price: number
    image: string
  }
  handleRemoveFavorite: (id: string) => void
}

const FavoriteCards = ({
  favoriteCard,
  handleRemoveFavorite,
}: FavoriteTabProps) => {
  return (
    <Card className="w-full max-w-sm overflow-hidden rounded-2xl border-0 bg-gray-900 text-white shadow-lg">
      <CardContent>
        <div className="relative h-56 w-full">
          <Image
            src={favoriteCard.image}
            alt={favoriteCard.title}
            fill
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <div className="mt-5 flex flex-col gap-5">
          <h3 className="text-lg font-semibold">{favoriteCard.title}</h3>
          <div className="flex items-center justify-between">
            <p className="font-medium text-purple-400">
              {Number(favoriteCard.price) === 0
                ? "Gratuito"
                : Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(favoriteCard.price))}
            </p>
            <Button
              variant="ghost"
              className="rounded-full"
              onClick={() => handleRemoveFavorite(favoriteCard.id)}
            >
              <Heart className="fill-red-600 text-red-500" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default FavoriteCards
