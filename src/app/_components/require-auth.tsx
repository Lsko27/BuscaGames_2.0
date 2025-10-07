"use client"

import { useSession } from "next-auth/react"
import { Button } from "./ui/button"
import LoadingScreen from "./loading-screen"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { LogIn } from "lucide-react"

interface RequireAuthProps {
  children: React.ReactNode
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") return <LoadingScreen />

  if (!session?.user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <Card className="max-h-full w-full max-w-xl border-0 bg-slate-950">
          <CardContent className="flex flex-col items-center justify-center gap-10 py-8">
            <Image
              src="/X.png"
              alt="Acesso Restrito"
              width={150}
              height={150}
            />
            <h1 className="text-5xl font-bold text-white">Acesso Restrito</h1>

            <div className="mt-6 space-y-5 text-center">
              <p className="text-gray-300">
                Você não tem permissão para acessar essa página
              </p>
              <p className="text-gray-300">
                Para isso, é necessário{" "}
                <span className="font-semibold">fazer o login</span>
              </p>
              <Button
                variant="outline"
                className="w-full text-xl"
                onClick={() => router.push("/login")}
              >
                <LogIn size={20} />
                Fazer login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}

export default RequireAuth
