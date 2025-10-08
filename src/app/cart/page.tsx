"use client"

import Image from "next/image"
import { Card, CardContent } from "../_components/ui/card"
import { Button } from "../_components/ui/button"
import { Input } from "../_components/ui/input"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Gift, ShoppingCart, Trash2 } from "lucide-react"
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaPaypal,
  FaBarcode,
} from "react-icons/fa"
import { SiPix } from "react-icons/si"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

const couponSchema = z.object({
  coupon: z
    .string()
    .min(3, "O cupom deve ter pelo menos 3 caracteres")
    .max(15, "O cupom deve ter no máximo 15 caracteres"),
})

type CouponFormData = z.infer<typeof couponSchema>

const CartPage = () => {
  const userProgress = 50

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CouponFormData>({
    resolver: zodResolver(couponSchema),
  })

  const onSubmit = (data: CouponFormData) => {
    if (data.coupon.toUpperCase() === "DESCONTO10") {
      toast.success("Cupom aplicado com sucesso! 🤑 Desconto de 10% garantido.")
    } else {
      toast.error("Cupom inválido 😅")
    }
    reset()
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

        {/* Texto centralizado */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-center text-4xl font-bold">
            Carrinho de compras
          </h1>
          <p className="text-center text-lg">
            Revise seus itens e finalize sua compra
          </p>
        </div>
      </div>

      <div className="flex min-h-screen flex-col gap-8 bg-slate-950 px-4 py-10 sm:px-6 md:flex-row md:px-16">
        {/* 🛒 Card de produtos */}
        <div className="w-full md:w-2/3">
          <Card className="border-0 bg-gray-800">
            <CardContent>
              <div className="mb-4 flex items-center justify-between border-b border-gray-500 pb-3 font-semibold">
                <p className="text-gray-300">Produto</p>
                <p className="text-gray-300">Preço</p>
                <p className="text-gray-300">Total</p>
                <p className="text-gray-300">Lixeira</p>
              </div>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 py-10">
                <ShoppingCart
                  size={45}
                  className="fill-gray-400 text-gray-400"
                />
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
            </CardContent>
          </Card>

          {/* Links fora do card */}
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
              href="/checkout"
              className="text-md text-red-400 transition-colors hover:underline"
            >
              <div className="flex items-center gap-2">
                <Trash2 />
                Limpar carrinho
              </div>
            </Link>
          </div>
        </div>

        <div className="flex w-full flex-col gap-8 md:w-1/3">
          <Card className="border-0 bg-gray-800">
            <CardContent>
              <div className="flex flex-col border-b border-gray-500 pb-3 text-gray-400">
                <h3 className="text-lg font-semibold text-gray-300">
                  Resumo do pedido
                </h3>
                <div className="mt-4 flex items-center justify-between">
                  <p>Subtotal:</p>
                  <p>R$ 0,00</p>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <p>Desconto:</p>
                  <p>- R$ 0,00</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-200">Total:</h3>
                <p className="text-xl font-semibold text-gray-200">R$ 0,00</p>
              </div>
              <div>
                <p className="mt-6 text-sm text-gray-400">Cupom de desconto:</p>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-3 flex w-full items-center gap-2"
                >
                  <Input
                    type="text"
                    placeholder="Digite seu cupom"
                    className="w-full border-0 bg-gray-700 text-white outline-0 placeholder:text-gray-400"
                  />
                  <Button
                    type="submit"
                    className="bg-purple-700 hover:bg-purple-800"
                  >
                    Aplicar
                  </Button>
                </form>
                {errors.coupon && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.coupon.message}
                  </p>
                )}
                <div className="mt-5">
                  <Button
                    variant="ghost"
                    className="w-full bg-green-600 px-8 py-5 text-lg text-white"
                    disabled
                  >
                    <div className="flex items-center gap-2">
                      Finalizar compra
                      <ArrowRight />
                    </div>
                  </Button>
                </div>
                <div className="mt-5">
                  <h4 className="text-gray-300">Aceitamos: </h4>
                  <div className="mt-3 flex items-center gap-3 text-xl text-gray-400">
                    <FaCcVisa />
                    <FaCcMastercard />
                    <FaCcAmex />
                    <FaPaypal />
                    <FaBarcode />
                    <SiPix />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gray-800">
            <CardContent>
              <div>
                <div className="flex items-center gap-2">
                  <Gift size={32} className="text-purple-500" />
                  <p className="text-xl font-bold text-purple-500">
                    Recompensas
                  </p>
                </div>
                <div className="mt-5 mb-7">
                  <p className="text-gray-300">
                    Complete missões e ganhe XP para desbloquear cupons de
                    desconto exclusivos!
                  </p>
                </div>
                <div className="mb-7 w-full">
                  <div className="mb-1 flex justify-between">
                    <p className="text-gray-300">Nível 1</p>
                    <p className="text-gray-300">{userProgress}/100 XP</p>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-gray-700">
                    <div
                      className="h-full rounded-full bg-green-500 transition-all duration-300"
                      style={{ width: `${userProgress}%` }}
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full bg-purple-700 text-lg text-white"
                >
                  Ver Quests e Missões
                  <ArrowRight />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default CartPage
