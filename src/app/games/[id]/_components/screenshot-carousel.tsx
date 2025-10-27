"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface Media {
  id: string
  type: "SCREENSHOT" | "TRAILER" | "VIDEO" | "COVER"
  url: string
}

interface Props {
  media: Media[]
}

export default function ScreenshotCarousel({ media }: Props) {
  const screenshots = media.filter((m) => m.type === "SCREENSHOT")
  const [selected, setSelected] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return
    const scrollAmount = 400
    containerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelected((prev) =>
      prev === 0 ? screenshots.length - 1 : (prev ?? 0) - 1,
    )
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelected((prev) =>
      prev === screenshots.length - 1 ? 0 : (prev ?? 0) + 1,
    )
  }

  return (
    <>
      {/* --- Carrossel horizontal com setas externas --- */}
      <div className="relative w-full">
        {/* Botão esquerda */}
        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Container scrollável */}
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth py-2"
          style={{
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE e Edge antigos
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {screenshots.map((m, index) => (
            <motion.div
              key={m.id}
              className="relative h-48 w-80 flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelected(index)}
            >
              <Image
                src={m.url}
                alt={`Screenshot ${index + 1}`}
                fill
                className="rounded-lg object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Botão direita */}
        <button
          onClick={() => scroll("right")}
          className="absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* --- Modal fullscreen --- */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="relative h-[80vh] w-full max-w-5xl">
              <Image
                src={screenshots[selected].url}
                alt="Fullscreen Screenshot"
                fill
                className="rounded-lg object-contain"
              />

              {/* Botão fechar */}
              <button
                className="absolute top-4 right-6 text-3xl font-bold text-white transition hover:text-gray-300"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelected(null)
                }}
              >
                <X size={32} />
              </button>

              {/* Navegação dentro da modal */}
              <button
                className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition hover:bg-black/70"
                onClick={handlePrev}
              >
                <ChevronLeft size={32} />
              </button>

              <button
                className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition hover:bg-black/70"
                onClick={handleNext}
              >
                <ChevronRight size={32} />
              </button>

              {/* Contador */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-gray-300">
                {selected + 1} / {screenshots.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
