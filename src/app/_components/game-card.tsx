import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import RatingStars from "./rating-stars"
import { Eye, Heart, ShoppingCart } from "lucide-react"
import { Button } from "./ui/button"

interface GameCardProps {
  params: {
    id: string
    title: string
    image: string
    price: number
    originalPrice: number
    discount: number
    rating: number
    categories: string[]
  }
}

const GameCard = ({ params }: GameCardProps) => {
  return (
    <Card className="group relative w-full max-w-xl overflow-hidden border-none p-0">
      <CardContent className="p-0">
        {/* Imagem ocupa todo o card */}
        <div className="relative h-72 w-full">
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

          <div className="absolute inset-0 flex flex-col justify-start bg-black/60 p-4 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-full flex-col justify-between p-4 text-white">
              <h3 className="text-2xl font-semibold">{params.title}</h3>

              <div>
                <div className="flex items-center gap-3">
                  {Number(params.price) !== Number(params.originalPrice) && (
                    <p className="text-sm font-bold text-gray-400 line-through">
                      {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(Number(params.originalPrice))}
                    </p>
                  )}

                  <p className="text-xl font-semibold text-green-400">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(params.price))}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                {params.categories.map((category, i) => (
                  <Badge key={i} className="text-md rounded-xl bg-blue-600">
                    {category}
                  </Badge>
                ))}
              </div>

              <div className="mt-2 flex items-center justify-between gap-1">
                <RatingStars rating={params.rating} />
                <div className="flex items-center justify-center gap-3">
                  <Button variant="ghost" className="bg-green-600">
                    <ShoppingCart />
                    <p className="text-lg">Adicionar</p>
                  </Button>

                  <Button variant="ghost" size="lg" className="rounded-full">
                    <Eye />
                  </Button>

                  <Button variant="ghost" size="lg" className="rounded-full">
                    <Heart />
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

export default GameCard
