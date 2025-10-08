"use client"

import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import RatingStars from "./rating-stars"
import { Eye, Heart, ShoppingCart } from "lucide-react"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useCart } from "@/_context/cart-context"

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
  userId?: string
}

const GameCard = ({ params, userId }: GameCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false)

  // Verifica se já está nos favoritos
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

  const { setCartCount, refreshCart } = useCart()

  const addToCart = async () => {
    if (!userId) {
      toast.error("Você precisa estar logado para adicionar ao carrinho")
      return
    }

    try {
      const res = await fetch("http://localhost:5050/cart/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, gameId: params.id }),
      })

      if (!res.ok) throw new Error("Erro ao adicionar ao carrinho")

      toast.success("Jogo adicionado ao carrinho")

      setCartCount((prev) => prev + 1)

      await refreshCart()
    } catch (err) {
      console.error(err)
      toast.error("Não foi possível adicionar o jogo")
    }
  }

  return (
    <Card className="group relative w-full max-w-xl overflow-hidden border-none p-0">
      <CardContent className="p-0">
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
                    {Number(params.price) === 0
                      ? "Gratuito"
                      : Intl.NumberFormat("pt-BR", {
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
                  <Button
                    variant="ghost"
                    className="bg-green-600"
                    onClick={addToCart}
                  >
                    <ShoppingCart />
                    <p className="text-lg">Adicionar</p>
                  </Button>

                  <Button variant="ghost" size="lg" className="rounded-full">
                    <Eye />
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

export default GameCard
