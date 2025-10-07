"use client"

import { useSession, signOut } from "next-auth/react"
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

interface ParamsUser {
  id: string
  name: string
  email: string
  userName: string
  image?: string // antes era avatar
}

type AuthUser = Partial<ParamsUser> & {
  image?: string // Google OAuth
}

interface UserDropdownProps {
  params?: ParamsUser
}

const UserDropdown = ({ params }: UserDropdownProps) => {
  const { data: session } = useSession()

  const user: AuthUser = params ?? (session?.user as AuthUser) ?? {}

  const userName = user.userName ?? user.name ?? "Usuário"

  const avatar = user.image ?? undefined

  if (!userName) return null
  console.log("user.image/avatar", user.image)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full bg-gradient-to-r from-rose-900 to-purple-800 pl-2"
        >
          <div className="flex items-center justify-center gap-3">
            <Avatar>
              {avatar ? (
                <AvatarImage src={avatar} alt={userName} />
              ) : (
                <AvatarFallback className="bg-gray-800">
                  {userName[0].toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <p className="font-semibold">{userName}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-zinc-900 text-white">
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">Perfil</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Configurações</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut /> Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown
