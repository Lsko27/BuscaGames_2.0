import { LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import Link from "next/link"
import { signOut } from "next-auth/react"

interface UserDropdownProps {
  params: {
    id: string
    name: string
    email: string
    userName: string
    avatar: string
  }
}

const UserDropdown = ({ params }: UserDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full bg-gradient-to-r from-rose-900 to-purple-800 pl-2"
        >
          <div className="flex items-center justify-center gap-3">
            <Avatar>
              <AvatarImage
                src={`http://localhost:5050${params.avatar}`}
                alt={params.userName}
              />
              <AvatarFallback className="bg-gray-800">
                {params.userName[0]}
              </AvatarFallback>
            </Avatar>
            <p className="font-semibold">{params.userName}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-zinc-900 text-white">
        <DropdownMenuLabel>{params.userName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">Perfil</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Configurações</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="bg-red-600" onClick={() => signOut()}>
          <LogOut className="text-white" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown
