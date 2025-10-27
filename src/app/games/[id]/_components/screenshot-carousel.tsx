"use client"

import { useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Media {
  id: string
  type: "SCREENSHOT" | "TRAILER" | "VIDEO" | "COVER"
  url: string
  order?: number
}

interface ScreenshotCarouselProps {
  media: Media[]
}

const ScreenshotCarousel: React.FC<ScreenshotCarouselProps> = ({ media }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current
    if (!container) return

    const scrollAmount = 400
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  const screenshots = media.filter((m) => m.type === "SCREENSHOT")

  if (screenshots.length === 0)
    return <p className="text-gray-400">Nenhuma screenshot disponível.</p>

  return (
    <div className="relative">
      {/* Botão esquerda */}
      <button
        onClick={() => scroll("left")}
        className="absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full bg-blue-500 p-2 text-white transition hover:bg-gray-700"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Container das imagens */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth px-8 py-2"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE e Edge
        }}
      >
        {screenshots.map((m) => (
          <div
            key={m.id}
            className="relative h-48 w-80 flex-shrink-0 overflow-hidden rounded-lg"
          >
            <Image
              src={m.url}
              alt="Screenshot"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Botão direita */}
      <button
        onClick={() => scroll("right")}
        className="absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full bg-blue-500 p-2 text-white transition hover:bg-gray-700"
      >
        <ChevronRight size={24} />
      </button>

      {/* CSS inline pra esconder scrollbar no Chrome */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default ScreenshotCarousel
