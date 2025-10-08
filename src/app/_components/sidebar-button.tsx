"use client"

import {
  HomeIcon,
  InfoIcon,
  Joystick,
  ListTodo,
  LogIn,
  MoonIcon,
  ShoppingCart,
} from "lucide-react"
import NavItem from "./nav-item"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import Link from "next/link"
import { useSession } from "next-auth/react"
import UserDropdown from "./user-dropdown"
import { useCart } from "@/_context/cart-context" // ✅ import do contexto

interface SidebarButtonProps {
  onClick?: () => void
}

const SidebarButton = ({ onClick }: SidebarButtonProps) => {
  const { data } = useSession()
  const { cartCount } = useCart() // ✅ pegando o cartCount do contexto

  return (
    <SheetContent className="w-[55%] bg-gray-900 p-6 text-white">
      <SheetHeader>
        <SheetTitle className="border-b border-gray-400 py-5 text-center text-xl text-white">
          Menu
        </SheetTitle>
      </SheetHeader>

      <div className="flex flex-col justify-center gap-3 border-b border-gray-400 pb-5 text-white">
        <NavItem href="/" icon={<HomeIcon />} label="Home" onClick={onClick} />
        <NavItem
          href="/games"
          icon={<Joystick />}
          label="Games"
          onClick={onClick}
        />
        <NavItem
          href="/quests"
          icon={<ListTodo />}
          label="Quests"
          onClick={onClick}
        />
        <NavItem
          href="/about"
          icon={<InfoIcon />}
          label="Sobre Nós"
          onClick={onClick}
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-3">
        <Button
          size="lg"
          variant="ghost"
          className="rounded-full text-white"
          onClick={onClick}
        >
          <MoonIcon />
        </Button>

        <div className="relative">
          <Link href="/cart">
            <Button
              size="lg"
              variant="ghost"
              className="rounded-full text-white"
              onClick={onClick}
            >
              <ShoppingCart />
            </Button>
          </Link>
          <Badge
            className="absolute -top-1 -right-1 rounded-full"
            variant="destructive"
          >
            {cartCount}{" "}
            {/* ✅ agora atualizado automaticamente pelo contexto */}
          </Badge>
        </div>

        {data?.user ? (
          <UserDropdown
            params={{
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              userName: data.user.userName,
              image: data.user.image,
            }}
          />
        ) : (
          <Button size="lg" variant="ghost" className="text-white" asChild>
            <Link href="/login">
              <LogIn />
              <span className="text-lg">Login</span>
            </Link>
          </Button>
        )}
      </div>
    </SheetContent>
  )
}

export default SidebarButton
