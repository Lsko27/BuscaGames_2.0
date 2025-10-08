import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import RatingStars from "./rating-stars"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

interface GameCardProps {
  params: {
    id: string
    title: string
    image: string
    price: number
    discount: number
    rating: number
  }
}

const HomeGameCards = ({ params }: GameCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const { data: session } = useSession()
  const userId = session?.user.id

  useEffect(() => {
    const checkFavorite = async () => {
      if (!userId) return

      try {
        const res = await fetch(`http://localhost:5050/favorites/${userId}`)
        const favoriteGameIds: string[] = await res.json()
        setIsFavorite(favoriteGameIds.includes(params.id))
      } catch (err) {
        console.error("Erro ao buscar favoritos:", err)
      }
    }
    checkFavorite()
  }, [params.id, userId])

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await fetch("http://localhost:5050/favorites", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, gameId: params.id }),
        })
        setIsFavorite(false)
        toast.success("Removido dos favoritos")
      } else {
        await fetch("http://localhost:5050/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, gameId: params.id }),
        })
        setIsFavorite(true)
        toast.success("Adicionado aos favoritos")
      }
    } catch (err) {
      console.error(err)
      toast.error("Erro ao atualizar favoritos")
    }
  }

  return (
    <Card className="group relative w-full max-w-md overflow-hidden border-none p-0">
      <CardContent className="p-0">
        {/* Imagem ocupa todo o card */}
        <div className="relative h-60 w-full">
          <Image
            src={params.image}
            alt={params.title}
            className="object-cover"
            fill
          />

          {params.discount > 0 && (
            <Badge className="absolute top-3 right-3 z-50 bg-green-600 px-2 py-1 text-sm font-bold text-white">
              -{params.discount}%
            </Badge>
          )}

          <div className="absolute inset-0 flex flex-col justify-between bg-black/60 p-4 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-full flex-col justify-between p-2 text-left text-white">
              <h3 className="text-left text-2xl font-semibold">
                {params.title}
              </h3>

              <div>
                <div className="flex items-center gap-3">
                  <p className="text-xl font-semibold text-green-400">
                    {Number(params.price) === 0
                      ? "Gratuito"
                      : Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(Number(params.price))}
                  </p>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between gap-1">
                <RatingStars rating={params.rating} />
                <div className="flex items-center justify-center gap-3">
                  <Button variant="ghost" className="bg-green-600">
                    <ShoppingCart />
                    <p className="text-lg">Adicionar</p>
                  </Button>

                  <Button
                    variant="ghost"
                    size="lg"
                    className="rounded-full"
                    onClick={toggleFavorite}
                  >
                    <Heart
                      className={isFavorite ? "fill-red-500 text-red-500" : ""}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default HomeGameCards
