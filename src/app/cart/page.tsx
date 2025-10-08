"use client"

import Image from "next/image"
import FinishOrder from "./_components/finish-order"
import Rewards from "./_components/rewards"

const CartPage = () => {
  const userProgress = 50

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
        <div className="w-full md:w-2/3">
          {/* <CartProducts games={game}/> */}
        </div>

        <div className="flex w-full flex-col gap-8 md:w-1/3">
          <FinishOrder />
          <Rewards progress={userProgress} />
        </div>
      </div>
    </>
  )
}

export default CartPage
