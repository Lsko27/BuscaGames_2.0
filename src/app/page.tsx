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
  const gamesPerPage = 4

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch("http://localhost:5050/games/featured")
        const data: Game[] = await res.json()

        if (!data || data.length === 0) {
          setGames([])
          return
        }

        setGames(data)
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

  const totalPages = Math.ceil(games.length / gamesPerPage)

  const handlePrev = () => {
    setPageIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1))
  }

  const handleNext = () => {
    setPageIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0))
  }

  const startIndex = pageIndex * gamesPerPage
  const endIndex = startIndex + gamesPerPage
  const visibleGames = games.slice(startIndex, endIndex)

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
        <h3 className="mb-9 text-3xl font-bold text-white">
          Jogos Em destaque
        </h3>

        <div className="px-10">
          {loading ? (
            <LoadingScreen />
          ) : games.length === 0 ? (
            <p className="text-gray-400">Nenhum jogo em destaque no momento.</p>
          ) : (
            <div className="relative w-full px-10">
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

              <div className="flex justify-center gap-4 overflow-hidden">
                {visibleGames.map((game) => (
                  <HomeGameCards key={game.id} params={game} />
                ))}
              </div>
            </div>
          )}
        </div>

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
