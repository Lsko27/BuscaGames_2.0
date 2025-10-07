"use client"

import { useSession, signOut } from "next-auth/react"
import { LibraryBig, LogOut, Settings, User } from "lucide-react"
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

      <DropdownMenuContent className="border-gray-600 bg-zinc-900 p-3 text-white">
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-600" />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User className="text-white" />
            Perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/library">
            <LibraryBig className="text-white" />
            Biblioteca
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings className="text-white" />
            Configurações
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-600" />
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
