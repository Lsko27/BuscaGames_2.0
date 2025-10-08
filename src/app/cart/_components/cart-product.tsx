"use client"

import Link from "next/link"
import { ShoppingCart, ArrowLeft, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Button } from "@/app/_components/ui/button"
import CartItem from "@/app/cart/_components/cart-item"

interface Game {
  id: string
  cartItemId: string // ✅ Adicionado
  image: string
  title: string
  price: number
}

interface CartProductsProps {
  games: Game[]
  removeGame: (cartItemId: string) => void // ✅ Recebe cartItemId
  clearCart: () => void
}

const CartProducts = ({ games, removeGame, clearCart }: CartProductsProps) => {
  return (
    <>
      <Card className="border-0 bg-gray-800">
        <CardContent>
          <div className="mx-10 mb-4 flex items-center justify-between border-b border-gray-500 pb-3 font-semibold">
            <p className="text-gray-300">Produto</p>
            <div className="flex justify-between gap-20">
              <p className="text-gray-300">Preço</p>
              <p className="text-gray-300">Remover</p>
            </div>
          </div>

          {games.length === 0 ? (
            <div className="mt-10 flex flex-col items-center justify-center gap-3 py-10">
              <ShoppingCart size={45} className="fill-gray-400 text-gray-400" />
              <div className="items-center justify-center gap-0">
                <p className="text-center text-lg font-medium text-gray-400">
                  Seu carrinho está vazio
                </p>
                <p className="text-sm text-gray-400">
                  Adicione jogos ao seu carrinho para continuar
                </p>
              </div>
              <Button
                variant="ghost"
                className="mt-5 w-full bg-purple-700"
                asChild
              >
                <Link href="/games" className="text-white">
                  Explorar Jogos
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {games.map((game) => (
                <CartItem
                  key={game.cartItemId}
                  game={game}
                  onRemove={() => removeGame(game.cartItemId)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-3 flex items-center justify-between px-1">
        <Link
          href="/games"
          className="text-md text-gray-400 transition-colors hover:underline"
        >
          <div className="flex items-center gap-2">
            <ArrowLeft />
            Continuar Comprando
          </div>
        </Link>

        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault()
            clearCart()
          }}
          className="text-md text-red-400 transition-colors hover:underline"
        >
          <div className="flex items-center gap-2">
            <Trash2 />
            Limpar carrinho
          </div>
        </Link>
      </div>
    </>
  )
}

export default CartProducts
