import Image from "next/image"
import { Button } from "../.@/components/ui/button"
import { Trash2 } from "lucide-react"

interface CartItemProps {
  game: {
    id: string
    image: string
    title: string
    price: number
  }
  onRemove: () => void
}

const CartItem = ({ game, onRemove }: CartItemProps) => {
  return (
    <div className="flex w-full items-center justify-between rounded-lg bg-white p-5 dark:bg-gray-700">
      <div className="flex items-center justify-between gap-4">
        <Image
          src={game.image}
          alt={`Imagem de ${game.title}`}
          width={160}
          height={140}
          className="rounded-md"
        />
        {/* Título só aparece em md+ */}
        <p className="hidden text-lg font-semibold md:block dark:text-gray-200">
          {game.title}
        </p>
      </div>

      <div className="flex items-center justify-between gap-20 px-5">
        <p className="dark:text-gray-200">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(Number(game.price))}
        </p>
        <Button variant="ghost" onClick={onRemove}>
          <Trash2 className="text-red-600 dark:*:text-red-500" />
        </Button>
      </div>
    </div>
  )
}

export default CartItem
