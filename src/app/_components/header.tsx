"use client"

import Image from "next/image"
import { Button } from "./ui/button"
import {
  HomeIcon,
  InfoIcon,
  Joystick,
  ListTodo,
  LogIn,
  MenuIcon,
  MoonIcon,
  ShoppingCart,
} from "lucide-react"
import Link from "next/link"
import NavItem from "./nav-item"
import { Badge } from "./ui/badge"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SidebarButton from "./sidebar-button"
import { useState } from "react"

const Header = () => {
  const [sheetOpen, setSheetOpen] = useState(false)

  const handleSheetClose = () => setSheetOpen(false)
  return (
    <div className="flex items-center justify-between bg-gray-900 px-10 py-5">
      {/* Logo */}
      <div>
        <Link href="/">
          <Image alt="BuscaGames Logo" src="/logo.png" width={75} height={75} />
        </Link>
      </div>

      {/* Menu hamburguer (mobile) */}
      <div className="ml-auto block md:hidden">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="text-white">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarButton onClick={handleSheetClose} />
        </Sheet>
      </div>

      {/* Links */}
      <div className="hidden justify-center space-x-6 text-white md:flex">
        <NavItem
          href="/"
          icon={<HomeIcon className="mr-2 h-6 w-6" />}
          label="Home"
        />
        <NavItem
          href="/games"
          icon={<Joystick className="mr-2 h-6 w-6" />}
          label="Games"
        />
        <NavItem
          href="/quests"
          icon={<ListTodo className="mr-2 h-6 w-6" />}
          label="Quests"
        />
        <NavItem
          href="/about"
          icon={<InfoIcon className="mr-2 h-6 w-6" />}
          label="Sobre Nós"
        />
      </div>

      {/* Botões (lua, carrinho, login) */}
      <div className="hidden max-w-[200px] flex-1 justify-between text-white md:flex">
        <Button size="lg" variant="ghost" className="rounded-full">
          <MoonIcon />
        </Button>
        <div className="relative">
          <Button size="lg" variant="ghost" className="rounded-full">
            <ShoppingCart />
          </Button>
          {/* Badge ShadCN */}
          <Badge
            className="absolute -top-1 -right-1 rounded-full"
            variant="destructive"
          >
            0
          </Badge>
        </div>
        <Button size="lg" variant="ghost" className="text-white" asChild>
          <Link href="/login">
            <LogIn />
            <span className="text-lg">Login</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Header
