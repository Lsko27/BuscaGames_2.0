"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "./ui/button"
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

// Schema Zod
const formSchema = z.object({
  email: z.string().trim().min(2, {
    message: "Preencha os campos e tente novamente",
  }),
  password: z.string().min(2, { message: "Preencha os campo obrigatório" }),
})

type FormData = z.infer<typeof formSchema>

const LoginForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = (data: FormData) => {
    console.log("Login data:", data)
  }

  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <Card className="mb-5 border-none bg-blue-900 py-2">
        <CardContent className="px-4 py-2">
          <div className="flex h-fit gap-2">
            <InfoIcon className="text-md text-white" />
            <p className="text-sm text-white">
              Se você ainda não tem conta, selecione a aba Cadastro.
            </p>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite seu email"
                    {...field}
                    className="border-purple-600 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-white">Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      {...field}
                      className="border-purple-600 pr-10 text-white"
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

          <div className="flex justify-between gap-3 text-white">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" className="bg-white" />
              <label
                htmlFor="remember"
                className="text-md leading-none text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Manter-me Conectado
              </label>
            </div>
            <Link href="/forgot-password">
              <p className="text-sm text-purple-400 underline">
                Esqueci minha senha
              </p>
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <Button
              type="submit"
              className="w-full rounded-lg bg-purple-700 text-lg text-white"
            >
              Entrar
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default LoginForm
