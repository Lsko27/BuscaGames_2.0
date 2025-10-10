import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "sonner"
import AuthProvider from "@/providers/session-provider"
import { CartProvider } from "@/context/cart-context"

export const metadata: Metadata = {
  title: "BuscaGames",
  description:
    "Seu site de busca pelos melhores preços para seus jogos favoritos.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Header />
            <div className="bg-slate-100 text-purple-900 dark:bg-gray-900 dark:text-white px-4 md:px-8 lg:px-16">
              {children}
            </div>
            <Footer />
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
