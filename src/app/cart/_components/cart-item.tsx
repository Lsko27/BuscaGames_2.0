import Image from "next/image"
import { Button } from "../../_components/ui/button"
import { Trash2 } from "lucide-react"

interface CartItemProps {
  game: {
    id: string
    image: string
    title: string
    price: number
  }
}

const CartItem = ({ game }: CartItemProps) => {
  return (
    <div className="flex w-full items-center justify-between rounded-lg bg-gray-700 p-5">
      <div className="flex items-center justify-between gap-4">
        <Image
          src={game.image}
          alt={`Imagem de ${game.title}`}
          width={160}
          height={140}
          className="rounded-md"
        />
        <p className="text-lg text-gray-200">{game.title}</p>
      </div>
      <div className="flex items-center justify-between gap-20 px-5">
        <p className="text-gray-200">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(Number(game.price))}
        </p>
        <Button variant="ghost">
          <Trash2 className="text-red-500" />
        </Button>
      </div>
    </div>
  )
}

export default CartItem
