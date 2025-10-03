import Image from "next/image"
import AuthTabs from "../_components/auth-tabs"
import { Card, CardContent } from "../_components/ui/card"
import { CirclePlus } from "lucide-react"

const LoginPage = () => {
  return (
    <>
      <div className="relative min-h-screen w-full">
        <Image
          alt="Banner"
          src="/freepik__expand__92115.png"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.6)]" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex w-4/5 max-w-7xl gap-8">
            {/* ESQUERDA */}
            <div className="flex w-1/2 flex-col items-center justify-center p-8">
              <div className="w-full px-5">
                <h1 className="text-6xl font-bold text-white">
                  As melhores ofertas
                </h1>
                <span className="block text-5xl font-bold text-indigo-400">
                  &nbsp;para seus jogos
                </span>
                <p className="mt-3 py-5 font-semibold text-gray-200">
                  Entre na sua conta para acessar ofertas especiais e acompanhar
                  seus pedidos ou crie uma conta para começar a acumular pontos.
                </p>
              </div>
              <Card className="border-purple-700 bg-black/50">
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-white">
                      <CirclePlus />
                      <h2 className="text-xl font-semibold text-white">
                        Bônus de Registro
                      </h2>
                    </div>
                    <p className="text-white">
                      Crie sua conta e ganhe 100 XP para começar sua jornada!
                    </p>
                    <div className="mt-3 h-2 w-full rounded-xl bg-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* DIREITA */}
            <div className="flex w-1/2 items-center justify-center">
              <div className="rounded-xl border border-purple-600 bg-black p-8">
                <AuthTabs />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
