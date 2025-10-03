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

  return (
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
                  className="border-purple-600"
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
                <Input
                  type="password"
                  placeholder="Digite sua senha"
                  {...field}
                  className="border-purple-600 text-white"
                />
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
            className="w-full rounded-lg bg-purple-700 text-white"
          >
            Entrar
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default LoginForm
