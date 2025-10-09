"use client"

import {
  HomeIcon,
  InfoIcon,
  Joystick,
  ListTodo,
  LogIn,
  MoonIcon,
  ShoppingCart,
  SunIcon,
} from "lucide-react"
import NavItem from "./nav-item"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import Link from "next/link"
import { useSession } from "next-auth/react"
import UserDropdown from "./user-dropdown"
import { useCart } from "@/_context/cart-context"
import useTheme from "@/_hooks/useTheme"

interface SidebarButtonProps {
  onClick?: () => void
}

const SidebarButton = ({ onClick }: SidebarButtonProps) => {
  const { data } = useSession()
  const { cartCount } = useCart()
  const { theme, toggleTheme } = useTheme()

  return (
    <SheetContent className="w-[55%] bg-slate-100 p-6 dark:bg-gray-900 dark:text-white">
      <SheetHeader>
        <SheetTitle className="border-b border-gray-400 py-5 text-center text-xl dark:text-white">
          Menu
        </SheetTitle>
      </SheetHeader>

      <div className="flex flex-col justify-center gap-3 border-b border-gray-400 pb-5 text-purple-900 dark:text-white">
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

      <div className="flex flex-col items-center justify-center gap-3 text-purple-900">
        <Button
          size="lg"
          variant="ghost"
          className="rounded-full"
          onClick={toggleTheme}
        >
          {theme === "light" ? <SunIcon /> : <MoonIcon />}
        </Button>

        <div className="relative">
          <Link href="/cart">
            <Button
              size="lg"
              variant="ghost"
              className="rounded-full dark:text-white"
              onClick={onClick}
            >
              <ShoppingCart />
            </Button>
          </Link>
          <Badge
            className="absolute -top-1 -right-1 rounded-full"
            variant="destructive"
          >
            {cartCount}
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
          <Button size="lg" variant="ghost" className="dark:text-white" asChild>
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
