"use client"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Button } from "./ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email é obrigatório" })
    .email("Email inválido"),
})

type FormData = z.infer<typeof forgotPasswordSchema>

const ForgotPasswordForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  })

  const onSubmit = (data: FormData) => {
    try {
      toast.success("Link enviado com sucesso")
      console.log("Enviar link de recuperação para:", data.email)
      // Aqui você chamaria sua API para enviar o email de recuperação
    } catch (error) {
      toast.error("Erro ao enviar link!")
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Digite seu email"
                  {...field}
                  className="border-purple-700 text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-pink-900 hover:bg-purple-700"
        >
          Enviar link
        </Button>

        <div className="flex items-center justify-center text-blue-400">
          <Button asChild variant="ghost">
            <Link href="/login">
              <ArrowLeft />
              <p>Voltar para Login</p>
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ForgotPasswordForm
