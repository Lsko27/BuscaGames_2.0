import Image from "next/image"
import AuthTabs from "../_components/auth-tabs"
import { Card, CardContent } from "../_components/ui/card"
import { CirclePlus } from "lucide-react"

const LoginPage = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <Image
          alt="Banner"
          src="/freepik__expand__92115.png"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.6)]" />
      </div>

      {/* CONTEÚDO */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-7xl flex-col lg:flex-row lg:gap-8">
          {/* ESQUERDA */}
          <div className="flex w-full flex-col items-center justify-center p-6 text-center lg:w-1/2 lg:items-start lg:text-left">
            <div className="w-full">
              <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                As melhores ofertas
              </h1>
              <span className="block text-3xl font-bold text-indigo-400 sm:text-4xl lg:text-5xl">
                &nbsp;para seus jogos
              </span>
              <p className="mt-3 py-5 text-sm font-semibold text-gray-200 sm:text-base">
                Entre na sua conta para acessar ofertas especiais e acompanhar
                seus pedidos ou crie uma conta para começar a acumular pontos.
              </p>
            </div>

            <Card className="mt-4 w-full border-purple-700 bg-black/50">
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-white lg:justify-start">
                    <CirclePlus />
                    <h2 className="text-lg font-semibold text-white sm:text-xl">
                      Bônus de Registro
                    </h2>
                  </div>
                  <p className="text-sm text-white sm:text-base">
                    Crie sua conta e ganhe 100 XP para começar sua jornada!
                  </p>
                  <div className="mt-3 h-2 w-full rounded-xl bg-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* DIREITA */}
          <div className="mt-10 mb-6 flex w-full items-center justify-center lg:mt-0 lg:w-1/2">
            <div className="w-full max-w-md rounded-xl border border-purple-600 bg-black p-8">
              <AuthTabs />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
