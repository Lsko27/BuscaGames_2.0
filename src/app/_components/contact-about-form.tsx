"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email é obrigatório" })
    .email("Email inválido"),
  subject: z.string().trim().min(1, { message: "Assunto é obrigatório" }),
  message: z.string().trim().min(1, { message: "Mensagem é obrigatória" }),
});

type FormData = z.infer<typeof formSchema>;

const ContactAboutForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Seu nome"
                    {...field}
                    className="border-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    {...field}
                    className="border-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Subject */}
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Assunto</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Assunto da mensagem"
                    {...field}
                    className="border-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Mensagem</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Escreva sua mensagem aqui"
                    rows={5}
                    className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:border-indigo-500 focus:outline-none resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="bg-indigo-500 text-white text-lg rounded-lg">
            <Button
              type="submit"
              variant="ghost"
              className="w-full hover:bg-green-500"
            >
              <Send />
              Enviar Mensagem
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactAboutForm;
