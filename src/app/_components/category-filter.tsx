"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "./ui/card"
import { Slider } from "./ui/slider"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import {
  Joystick,
  RotateCcw,
  Users,
  Handshake,
  Globe2,
  Sword,
  Skull,
  Puzzle,
  Brain,
  Monitor,
  Wand2,
  Compass,
  Scroll,
  Trophy,
  Ghost,
  Zap,
} from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  "Todos os jogos": Joystick,
  Multiplayer: Users,
  Cooperativo: Handshake,
  "Mundo Aberto": Globe2,
  Luta: Sword,
  Zumbis: Skull,
  Puzzle: Puzzle,
  Estratégia: Brain,
  Simulação: Monitor,
  Fantasia: Wand2,
  Aventura: Compass,
  RPG: Scroll,
  Esportes: Trophy,
  Terror: Ghost,
  Ação: Zap,
}

interface CategoryFilterProps {
  isSheet?: boolean
}

const CategoryFilter = ({ isSheet = false }: CategoryFilterProps) => {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    [],
  )
  const [price, setPrice] = useState(200)
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get("category")
  const selectedPrice = searchParams.get("maxPrice")

  useEffect(() => {
    if (selectedPrice) setPrice(parseInt(selectedPrice))
  }, [selectedPrice])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5050/game-categories")
        const data = await res.json()
        setCategories(data)
      } catch (error) {
        console.error("Erro ao buscar categorias:", error)
      }
    }
    fetchCategories()
  }, [])

  const updateFilters = (categoryValue?: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (categoryValue) params.set("category", categoryValue.toLowerCase())
    else params.delete("category")

    if (price > 0) params.set("maxPrice", price.toString())
    else params.delete("maxPrice")

    router.push(`/games?${params.toString()}`)
  }

  const renderCategories = () => (
    <div className="flex flex-col gap-3">
      <Button
        key="Todos os jogos"
        onClick={() => updateFilters()}
        className={`justify-start ${!selectedCategory ? "bg-blue-600" : "bg-transparent"} hover:bg-blue-600`}
      >
        <Joystick size={22} className="mr-2 text-white" />
        Todos os jogos
      </Button>
      {categories.map(({ name }) => {
        const Icon = iconMap[name] || Joystick
        const isActive = selectedCategory === name.toLowerCase()
        return (
          <Button
            key={name}
            onClick={() => updateFilters(name)}
            className={`justify-start ${isActive ? "bg-blue-600" : "bg-transparent"} hover:bg-blue-600`}
          >
            <Icon size={22} className="mr-2 text-white" />
            {name}
          </Button>
        )
      })}
    </div>
  )

  const renderPriceFilter = () => (
    <div className="mt-6">
      <Label className="mb-2 block text-lg text-white">Preço máximo</Label>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-gray-400">R$ 0</span>
        <span className="text-sm font-semibold text-white">R$ {price}</span>
      </div>
      <Slider
        value={[price]}
        onValueChange={(val) => setPrice(val[0])}
        max={400}
        step={10}
        className="my-2 text-blue-600"
      />
      <div className="mt-4 flex flex-col gap-2">
        <Button variant="outline" onClick={() => updateFilters()}>
          Aplicar Filtro
        </Button>
        <Button variant="destructive" onClick={() => router.push("/games")}>
          <RotateCcw size={32} /> Resetar Filtros
        </Button>
      </div>
    </div>
  )

  return (
    <Card
      className={`border-zinc-800 bg-zinc-800 shadow-lg ${isSheet ? "w-full p-4" : ""}`}
    >
      <CardContent className="p-4">
        {!isSheet && (
          <h2 className="mb-6 ml-3 text-2xl font-bold text-white">
            Categorias
          </h2>
        )}
        {renderCategories()}
        {renderPriceFilter()}
      </CardContent>
    </Card>
  )
}

export default CategoryFilter
