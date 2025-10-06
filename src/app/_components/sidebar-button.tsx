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

interface SidebarButtonProps {
  onClick?: () => void
}

const SidebarButton = ({ onClick }: SidebarButtonProps) => {
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
          <Button
            size="lg"
            variant="ghost"
            className="rounded-full text-white"
            onClick={onClick}
          >
            <ShoppingCart />
          </Button>
          <Badge
            className="absolute -top-1 -right-1 rounded-full"
            variant="destructive"
          >
            0
          </Badge>
        </div>

        <Button
          size="lg"
          variant="ghost"
          className="text-white"
          asChild
          onClick={onClick} // fecha o sheet ao clicar
        >
          <Link href="/login">
            <LogIn />
            <span className="text-lg">Login</span>
          </Link>
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarButton
