import Image from "next/image"
import LoginForm from "../_components/login-form"

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

        <div className="absolute flex h-screen w-full items-center justify-center">
          {/* ESQUERDA */}
          <div className="flex w-1/2 flex-col items-center justify-center p-8">
            <div className="w-full px-5">
              <h1 className="text-center text-6xl font-bold text-white">
                As melhores ofertas
                <span className="text-6xl font-bold text-indigo-400">
                  &nbsp;para seus jogos
                </span>
              </h1>
              <p className="py-5 font-semibold text-gray-200">
                Entre na sua conta para acessar ofertas especiais e acompanhar
                seus pedidos ou crie uma conta para começar a acumular pontos.
              </p>
            </div>
          </div>

          {/* DIREITA */}
          <div className="flex w-1/2 items-center justify-center">
            <div className="bg-black p-8">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
