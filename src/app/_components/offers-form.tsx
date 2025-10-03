"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Mail } from "lucide-react"
import { Checkbox } from "./ui/checkbox"

const offerSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Preencha o campo com seu nome",
  }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email é obrigatório" })
    .email("Email inválido"),
})

type FormData = z.infer<typeof offerSchema>

const OffersForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(offerSchema),
    defaultValues: { name: "", email: "" },
  })

  const onSubmit = (data: FormData) => {
    try {
      toast.success("Mensagem enviada com sucesso")
      console.log("Mensagem enviada de:", data.email)
    } catch (error) {
      toast.error("Erro ao enviar mensagem!")
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Digite seu nome"
                  {...field}
                  className="border-gray-600"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Digite seu email"
                  {...field}
                  className="border-gray-600"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center space-x-2">
          <Checkbox id="offers" className="bg-white" required />
          <label
            htmlFor="offers"
            className="text-md leading-none text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            <p>Concordo em receber emails promocionais</p>
          </label>
        </div>

        <Button variant="ghost" type="submit" className="w-full bg-blue-600">
          <Mail />
          <p className="text-lg">Inscrever-se</p>
        </Button>
      </form>
    </Form>
  )
}

export default OffersForm
