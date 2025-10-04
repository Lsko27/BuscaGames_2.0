import Image from "next/image"
import LaunchCountdown from "./_components/launch-countdown"
import { Button } from "./_components/ui/button"
import Link from "next/link"
import { CheckCircle, Joystick } from "lucide-react"
import OffersForm from "./_components/offers-form"

const HomePage = () => {
  return (
    <>
      {/* SECTION LANÇAMENTO */}
      <div className="relative h-[65vh] w-full">
        <Image
          alt="GTA VI Banner"
          src="/gta6-banner.png"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.8)] to-[rgba(0,0,0,0.7)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <LaunchCountdown />
        </div>
      </div>

      {/* OUTRO CONTEÚDO */}
      <div className="mt-10 w-full text-center">
        <h3 className="mb-6 text-3xl font-bold text-white">
          Jogos Em destaque
        </h3>
        <div className="flex flex-wrap justify-center gap-3"></div>
        <div className="flex items-center justify-center gap-2 py-8">
          <Button
            variant="ghost"
            asChild
            className="rounded-xl bg-blue-600"
            size="lg"
          >
            <Link href="/games">
              <Joystick size="icon" />
              <p className="text-lg">Ver todos os jogos</p>
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-gray-800 px-32 py-20">
        <div className="flex justify-between gap-8">
          {/* ESQUERDA */}
          <div className="flex w-1/2 flex-col gap-4">
            <h4 className="text-2xl font-bold">
              Inscreva-se para Ofertas Exclusivas
            </h4>
            <p className="text-lg">
              Receba alertas de promoções, códigos de desconto e novidades
              diretamente no seu email.
            </p>
            <div className="space-y-2">
              <div className="flex gap-1">
                <CheckCircle className="text-green-500" />
                <p>Alertas de descontos em sua lista de desejos</p>
              </div>
              <div className="flex gap-1">
                <CheckCircle className="text-green-500" />
                <p>Cupons exclusivos para assinantes</p>
              </div>
              <div className="flex gap-1">
                <CheckCircle className="text-green-500" />
                <p>Recompensa de 100 XP ao se inscrever</p>
              </div>
            </div>
          </div>

          {/* DIREITA */}
          <div className="w-1/2 rounded-lg bg-gray-900 p-9">
            <OffersForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
