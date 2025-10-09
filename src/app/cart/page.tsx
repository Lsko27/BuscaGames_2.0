"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Image from "next/image"
import CartProducts from "./_components/cart-product"
import FinishOrder from "./_components/finish-order"
import Rewards from "./_components/rewards"
import { toast } from "sonner"
import { useCart } from "@/_context/cart-context"

interface Game {
  id: string
  cartItemId: string
  title: string
  image: string
  price: number
  originalPrice: number
  rating: number
  categories: string[]
}

interface CartItemResponse {
  id: string
  cartId: string
  gameId: string
  quantity: number
  addedAt: string
  game: {
    id: string
    title: string
    image: string
    price: string
    originalPrice: string
    rating: number
    tags: string[]
  }
}

const CartPage = () => {
  const { data: session } = useSession()
  const userId = session?.user?.id
  const { refreshCart } = useCart()

  const [cartGames, setCartGames] = useState<Game[]>([])
  const userProgress = 50

  useEffect(() => {
    if (!userId) return

    const fetchCart = async () => {
      try {
        const res = await fetch(`http://localhost:5050/cart?userId=${userId}`)
        const data = await res.json()

        if (data?.cart?.items) {
          const games = data.cart.items.map((item: CartItemResponse) => ({
            id: item.game.id,
            cartItemId: item.id, // ✅ Importante para deletar
            title: item.game.title,
            image: `http://localhost:5050${item.game.image}`,
            price: Number(item.game.price),
            originalPrice: Number(item.game.originalPrice),
            rating: item.game.rating,
            categories: item.game.tags || [],
          }))
          setCartGames(games)
        }
      } catch (err) {
        console.error("Erro ao buscar carrinho:", err)
        toast.error("Erro ao buscar itens no carrinho!")
      }
    }

    fetchCart()
  }, [userId])

  // Remove um item do carrinho via API
  const removeGame = async (cartItemId: string) => {
    try {
      await fetch(`http://localhost:5050/cart/items/${cartItemId}`, {
        method: "DELETE",
      })

      setCartGames((prev) =>
        prev.filter((game) => game.cartItemId !== cartItemId),
      )

      // Atualiza badge do Header
      await refreshCart()

      toast.success("Jogo removido com sucesso!")
    } catch (err) {
      console.error("Erro ao remover jogo do carrinho:", err)
      toast.error("Erro ao remover jogo!")
    }
  }

  // Limpa todo o carrinho
  const clearCart = async () => {
    try {
      await fetch(`http://localhost:5050/cart?userId=${userId}`, {
        method: "DELETE",
      })

      setCartGames([])

      // Atualiza badge do Header e Sidebar
      await refreshCart()

      toast.success("Carrinho esvaziado com sucesso!")
    } catch (err) {
      console.error("Erro ao limpar carrinho:", err)
      toast.error("Erro ao esvaziar carrinho!")
    }
  }

  return (
    <>
      <div className="relative h-[25vh]">
        <Image
          alt="background image"
          src="/freepik__expand__92115.png"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.4)]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-center text-4xl font-bold">
            Carrinho de compras
          </h1>
          <p className="text-center text-lg">
            Revise seus itens e finalize sua compra
          </p>
        </div>
      </div>

      <div className="flex min-h-screen flex-col gap-8 bg-slate-300 px-4 py-10 sm:px-6 md:flex-row md:px-16 dark:bg-slate-950">
        <div className="w-full md:w-2/3">
          <CartProducts
            games={cartGames}
            removeGame={removeGame}
            clearCart={clearCart}
          />
        </div>

        <div className="flex w-full flex-col gap-8 md:w-1/3">
          <FinishOrder games={cartGames} />
          <Rewards progress={userProgress} />
        </div>
      </div>
    </>
  )
}

export default CartPage
