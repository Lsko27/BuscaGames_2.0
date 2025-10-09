"use client"

import { signIn } from "next-auth/react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { Checkbox } from "./ui/checkbox"
import { Card, CardContent } from "./ui/card"
import { Eye, EyeOff, InfoIcon } from "lucide-react"
import { useState } from "react"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"
import LoadingButton from "./loading-button"
import Image from "next/image"

// Schema Zod
const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(2, { message: "Preencha os campos e tente novamente" }),
  password: z.string().min(2, { message: "Preencha o campo obrigatório" }),
})

type FormData = z.infer<typeof formSchema>

const LoginForm = () => {
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  })

  const [showPassword, setShowPassword] = useState(false)
  const [error] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: FormData) => {
    setLoading(true)

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      if (res?.error) {
        Swal.fire({
          title: "Erro ao fazer login",
          text: res.error,
          icon: "error",
          confirmButtonText: "Ok",
        })
      } else {
        Swal.fire({
          title: "Login realizado com sucesso",
          text: "Bem-vindo de volta!",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          router.push("/")
        })
      }
    } catch (err) {
      console.error(err)
      Swal.fire({
        title: "Erro ao fazer login",
        text: "Verifique os dados e tente novamente!",
        icon: "error",
        confirmButtonText: "Ok",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-lg px-4 sm:px-6 lg:px-0">
      {/* CARD INFO */}
      <Card className="mb-6 border-none bg-blue-900">
        <CardContent className="flex items-start gap-2 px-4 py-3">
          <InfoIcon className="text-md mt-1 shrink-0 text-white" />
          <p className="text-sm leading-snug text-white">
            Se você ainda não tem conta, selecione a aba{" "}
            <span className="font-semibold text-indigo-300">Cadastro</span>.
          </p>
        </CardContent>
      </Card>

      {/* FORM */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          {/* EMAIL */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite seu email"
                    {...field}
                    className="border-purple-600 text-black dark:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SENHA */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      {...field}
                      className="border-purple-600 pr-10 text-black dark:text-white"
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ERRO */}
          {error && (
            <p className="text-sm text-red-600 dark:text-red-500">{error}</p>
          )}

          {/* LEMBRAR & ESQUECI SENHA */}
          <div className="flex flex-col justify-between gap-3 text-white sm:flex-row">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                className="shrink-0 bg-gray-300 dark:bg-white"
              />
              <label
                htmlFor="remember"
                className="text-sm leading-snug text-gray-600 dark:text-gray-300"
              >
                Manter-me conectado
              </label>
            </div>
            <Link href="/forgot-password" className="self-start sm:self-center">
              <p className="text-sm text-purple-700 underline transition-colors hover:text-purple-300 dark:text-purple-400">
                Esqueci minha senha
              </p>
            </Link>
          </div>

          {/* BOTÃO */}
          <div className="flex flex-col gap-5">
            <LoadingButton
              type="submit"
              className="w-full rounded-lg bg-purple-700 text-lg text-white transition-all hover:bg-purple-800"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </LoadingButton>

            <LoadingButton
              type="button"
              className="w-full rounded-lg border-2 border-gray-400 bg-white text-lg text-black transition-all hover:bg-gray-100 dark:bg-gray-300"
              disabled={loading}
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              <div className="flex items-center justify-center gap-3">
                <Image src="/google.svg" alt="Google" width={20} height={20} />
                <p>Entrar com Google</p>
              </div>
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default LoginForm
