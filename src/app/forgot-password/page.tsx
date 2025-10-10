import { KeyRound } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import ForgotPasswordForm from "@/components/forgot-password-form"
import Image from "next/image"

const ForgotPasswordPage = () => {
  return (
    <div className="relative flex min-h-[60vh] items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          alt="Banner"
          src="/freepik__expand__92115.png"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.6)]" />
      </div>

      {/* Conteúdo sobreposto */}
      <div className="relative z-10 w-[50%]">
        <Card className="bg-gray-900">
          <CardContent>
            <div className="flex flex-col items-center gap-2">
              <KeyRound size={60} className="my-3 text-purple-700" />
              <h1 className="text-center text-3xl font-semibold text-white">
                Esqueceu a senha?
              </h1>
              <p className="text-center text-white">
                Digite seu e-mail abaixo para receber o link de redefinição.
              </p>
            </div>
            <div className="mt-5 px-5">
              <ForgotPasswordForm />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
