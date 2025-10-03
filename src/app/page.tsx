import Image from "next/image"
import LaunchCountdown from "./_components/launch-countdown"

const HomePage = () => {
  return (
    <div>
      {/* SECTION LANÇAMENTO */}
      <div className="relative h-[65vh] w-full">
        <Image
          alt="GTA VI Banner"
          src="/gta6-banner.png"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.6)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <LaunchCountdown />
        </div>
      </div>

      {/* OUTRO CONTEÚDO */}
      <div className="mt-10 px-5">
        <h3 className="text-3xl font-bold text-white">Games Section</h3>
        {/* Aqui você pode renderizar cards, listas, etc */}
      </div>
    </div>
  )
}

export default HomePage
