"use client"

import Image from "next/image"
import CountdownCards from "./countdown-cards"
import { Button } from "./ui/button"
import { useEffect, useMemo, useState } from "react"

const LaunchCountdown = () => {
  const launchDate = useMemo(() => new Date("2026-05-26T00:00:00"), [])

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = launchDate.getTime() - now

      if (distance <= 0) {
        clearInterval(timer)
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        })
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [launchDate])

  return (
    <div className="relative flex h-[65%] w-full flex-col items-center justify-center">
      <Image
        alt="GTA VI Banner"
        src="/gta6-banner.png"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.6)]" />

      <div className="absolute top-1/3 flex flex-col items-center text-white">
        <h3 className="text-5xl font-bold">GTA VI está chegando!</h3>
        <p className="text-lg">
          Prepare-se para o lançamento mais aguardado dos games
        </p>

        <div className="mt-6 flex min-w-[300px] items-center justify-center gap-5">
          <CountdownCards params={{ value: timeLeft.days, label: "dias" }} />
          <CountdownCards params={{ value: timeLeft.hours, label: "horas" }} />
          <CountdownCards
            params={{ value: timeLeft.minutes, label: "minutos" }}
          />
          <CountdownCards
            params={{ value: timeLeft.seconds, label: "segundos" }}
          />
        </div>

        <Button variant="ghost" className="mt-5 w-1/2 bg-pink-600 text-lg">
          Saiba mais
        </Button>
      </div>
    </div>
  )
}

export default LaunchCountdown
