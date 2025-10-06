"use client"
import { Loader2 } from "lucide-react"

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white">
      <Loader2 className="mb-4 h-12 w-12 animate-spin text-green-500" />
      <p className="animate-pulse text-lg font-medium tracking-wide">
        Carregando...
      </p>
    </div>
  )
}

export default LoadingScreen
