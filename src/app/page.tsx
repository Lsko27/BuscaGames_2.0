"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./_components/ui/button"
import { CheckCircle, Joystick, ChevronLeft, ChevronRight } from "lucide-react"
import LaunchCountdown from "./_components/launch-countdown"
import OffersForm from "./_components/offers-form"
import HomeGameCards from "./_components/home-gamecards"
import LoadingScreen from "./_components/loading-screen"
import { toast } from "sonner"

interface Game {
  id: string
  title: string
  image: string
  rating: number
  price: number
  discount: number
}

const HomePage = () => {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [pageIndex, setPageIndex] = useState(0)
  const [gamesPerPage, setGamesPerPage] = useState(4)
  const [step, setStep] = useState(4)

  // Ajusta gamesPerPage e step baseado na largura da tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setGamesPerPage(1)
        setStep(1)
      } else {
        setGamesPerPage(4)
        setStep(4)
      }
    }

    handleResize() // chama no load
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch("http://localhost:5050/games?featured=true")
        const data: Game[] = await res.json()
        setGames(data || [])
      } catch (err) {
        console.error("Erro ao buscar jogos:", err)
        toast.error("Erro ao Buscar jogos!")
        setGames([])
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [])

  const handlePrev = () => {
    setPageIndex((prev) =>
      prev - step >= 0 ? prev - step : Math.max(0, games.length - gamesPerPage),
    )
  }

  const handleNext = () => {
    setPageIndex((prev) => (prev + step < games.length ? prev + step : 0))
  }

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
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <div className="w-full max-w-4xl">
            <LaunchCountdown />
          </div>
        </div>
      </div>

      {/* OUTRO CONTEÚDO */}
      <div className="mt-10 w-full text-center">
        <h3 className="mb-9 text-3xl font-bold dark:text-white">
          Jogos Em destaque
        </h3>

        <div className="relative w-full overflow-hidden px-10">
          {loading ? (
            <LoadingScreen />
          ) : games.length === 0 ? (
            <p className="dark:text-gray-400">
              Nenhum jogo em destaque no momento.
            </p>
          ) : (
            <>
              {/* Botões do carousel */}
              <Button
                variant="default"
                onClick={handlePrev}
                className="absolute top-1/2 left-0 z-20 -translate-y-1/2 rounded-full bg-blue-500 p-2"
              >
                <ChevronLeft className="text-white" />
              </Button>
              <Button
                variant="default"
                onClick={handleNext}
                className="absolute top-1/2 right-0 z-20 -translate-y-1/2 rounded-full bg-blue-500 p-2"
              >
                <ChevronRight className="text-white" />
              </Button>

              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${(pageIndex * 100) / gamesPerPage}%)`,
                }}
              >
                {games.map((game) => (
                  <div
                    key={game.id}
                    className="flex-shrink-0 px-2"
                    style={{ width: `${100 / gamesPerPage}%` }}
                  >
                    <HomeGameCards params={game} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 py-8">
          <Button
            variant="ghost"
            asChild
            className="rounded-xl bg-blue-600 text-white"
            size="lg"
          >
            <Link href="/games">
              <Joystick size="icon" />
              <p className="text-lg">Ver todos os jogos</p>
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-slate-200 px-4 py-20 sm:px-6 dark:bg-gray-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:gap-8">
          {/* ESQUERDA */}
          <div className="flex flex-col gap-4 lg:w-1/2">
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
          <div className="rounded-lg bg-slate-100 p-6 sm:p-9 lg:w-1/2 dark:bg-gray-900">
            <OffersForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
