"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import Link from "next/link"
import { Checkbox } from "./ui/checkbox"
import { PasswordRequirements } from "./password-requirements"

const formSchema = z
  .object({
    firstName: z.string().trim().min(2, {
      message: "Preencha os campos e tente novamente",
    }),
    lastName: z.string().trim().min(2, {
      message: "Preencha os campos e tente novamente",
    }),
    userName: z.string().trim().min(2, {
      message: "Preencha os campos e tente novamente",
    }),
    email: z.string().trim().min(2, {
      message: "Preencha os campos e tente novamente",
    }),
    password: z
      .string()
      .min(8, { message: "Senha deve conter no mínimo 8 caracteres" })
      .max(16, { message: "Senha deve conter no máximo 16 caracteres" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
        {
          message:
            "Senha deve conter ao menos uma letra maiúscula, uma minúscula, um número e um caractere especial",
        },
      ),
    confirmPassword: z.string().trim().min(1, {
      message: "Confirme sua senha",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })

type FormData = z.infer<typeof formSchema>

const RegisterForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  })

  const onSubmit = (data: FormData) => {
    console.log("Login data:", data)
  }

  const passwordValue = form.watch("password")

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-white">Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite seu nome"
                    {...field}
                    className="border-purple-600"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-white">Sobrenome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite seu sobrenome"
                    {...field}
                    className="border-purple-600"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-white">
                Nome de usuário
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite seu email"
                  {...field}
                  className="border-purple-600 text-white"
                />
              </FormControl>
            </FormItem>
          )}
        />

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
              <PasswordRequirements password={passwordValue} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-white">
                Confirmar Senha
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirme sua senha"
                  {...field}
                  className="border-purple-600 text-white"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex flex-col justify-between gap-5 text-white">
          <div className="mt-3 flex items-center space-x-2">
            <Checkbox id="notifications" className="bg-white" />
            <label
              htmlFor="notifications"
              className="text-md leading-none text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Aceito receber notificações via{" "}
              <span className="font-semibold">e-mail</span> e{" "}
              <span className="font-semibold">WhatsApp</span>.
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="privacy" className="bg-white" required />
            <label
              htmlFor="privacy"
              className="text-md leading-none text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Concordo com as{" "}
              <Link
                href="/politica-de-privacidade"
                className="text-indigo-300 underline"
              >
                políticas de privacidade
              </Link>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Button
            type="submit"
            className="w-full rounded-lg bg-purple-700 text-lg text-white"
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default RegisterForm
