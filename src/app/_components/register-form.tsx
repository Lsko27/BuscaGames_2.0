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
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Swal from "sweetalert2"

const formSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, { message: "Preencha os campos e tente novamente" }),
    lastName: z
      .string()
      .trim()
      .min(2, { message: "Preencha os campos e tente novamente" }),
    userName: z
      .string()
      .trim()
      .min(2, { message: "Preencha os campos e tente novamente" }),
    email: z
      .string()
      .trim()
      .min(2, { message: "Preencha os campos e tente novamente" }),
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
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Confirme sua senha" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })

type FormData = z.infer<typeof formSchema>

const RegisterForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
    },
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const passwordValue = form.watch("password")

  const onSubmit = async (data: FormData) => {
    setLoading(true)

    try {
      const res = await fetch("http://localhost:5050/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.firstName + " " + data.lastName,
          userName: data.userName,
          email: data.email,
          password: data.password,
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        Swal.fire({
          title: "Erro ao fazer login",
          text: "Verifique os dados e tente novamente!",
          icon: "error",
          confirmButtonText: "Ok",
        })
      } else {
        console.log("Usuário cadastrado com sucesso:", result)
        Swal.fire({
          title: "Cadastro realizado com sucesso",
          text: "Seja Bem-vindo ao site!",
          icon: "success",
          confirmButtonText: "Ok",
        })
      }
    } catch (err) {
      console.error(err)
      setError("Erro de conexão com o servidor")
    } finally {
      setLoading(false)
    }
  }

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
            name="lastName"
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
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-white">
                Nome de usuário
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite seu nome de usuário"
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
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme sua senha"
                    {...field}
                    className="border-purple-600 pr-10 text-white"
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex flex-col justify-between gap-5 text-white">
          <div className="mt-3 flex items-center space-x-2">
            <Checkbox id="notifications" className="bg-white" />
            <label
              htmlFor="notifications"
              className="text-md leading-none text-gray-300"
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
              className="text-md leading-none text-gray-300"
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
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default RegisterForm
