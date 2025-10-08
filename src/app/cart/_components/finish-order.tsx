"use client"

import { ArrowRight } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaPaypal,
  FaBarcode,
} from "react-icons/fa"
import { SiPix } from "react-icons/si"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Input } from "@/app/_components/ui/input"
import { Button } from "@/app/_components/ui/button"
import { useState } from "react"

const couponSchema = z.object({
  coupon: z
    .string()
    .min(3, "O cupom deve ter pelo menos 3 caracteres")
    .max(15, "O cupom deve ter no máximo 15 caracteres"),
})

type CouponFormData = z.infer<typeof couponSchema>

interface Game {
  id: string
  title: string
  price: number
}

interface FinishOrderProps {
  games: Game[]
}

const FinishOrder = ({ games }: FinishOrderProps) => {
  const [discount, setDiscount] = useState(0)

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<CouponFormData>({
    resolver: zodResolver(couponSchema),
  })

  const onSubmit = (data: CouponFormData) => {
    if (data.coupon.toUpperCase() === "DESCONTO10") {
      const discountValue = total * 0.1
      setDiscount(discountValue)
      toast.success("Cupom aplicado com sucesso! Desconto de 10% garantido.")
    } else {
      toast.error("Cupom inválido!")
    }
    reset()
    console.log(data.coupon)
  }

  // Soma total dos preços
  const total = games.reduce((acc, game) => acc + game.price, 0)

  return (
    <Card className="border-0 bg-gray-800">
      <CardContent>
        <div className="flex flex-col border-b border-gray-500 pb-3 text-gray-400">
          <h3 className="text-lg font-semibold text-gray-300">
            Resumo do pedido
          </h3>
          <div className="mt-4 flex items-center justify-between">
            <p>Subtotal:</p>
            <p>
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <p>Desconto:</p>
            <p>
              -{" "}
              {discount.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-200">Total:</h3>
          <p className="text-xl font-semibold text-gray-200">
            {(total - discount).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-400">Cupom de desconto:</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-3 flex w-full items-center gap-2"
          >
            <Input
              {...register("coupon")}
              type="text"
              placeholder="Digite seu cupom"
              className="w-full border-0 bg-gray-700 text-white outline-0 placeholder:text-gray-400"
            />

            <Button type="submit" className="bg-purple-700 hover:bg-purple-800">
              Aplicar
            </Button>
          </form>
          {errors.coupon && (
            <p className="mt-2 text-sm text-red-400">{errors.coupon.message}</p>
          )}
        </div>

        <div className="mt-5">
          <Button
            variant="ghost"
            className="w-full bg-green-600 px-8 py-5 text-lg text-white"
            disabled={games.length === 0}
          >
            <div className="flex items-center gap-2">
              Finalizar compra
              <ArrowRight />
            </div>
          </Button>
        </div>

        <div className="mt-5">
          <h4 className="text-gray-300">Aceitamos: </h4>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xl text-gray-400">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcAmex />
            <FaPaypal />
            <FaBarcode />
            <SiPix />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default FinishOrder
