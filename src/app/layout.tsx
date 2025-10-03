import type { Metadata } from "next"
import "./globals.css"
import Header from "./_components/header"
import Footer from "./_components/footer"
import { Toaster } from "sonner"

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
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
