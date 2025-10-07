import type { Metadata } from "next"
import "./globals.css"
import Header from "./_components/header"
import Footer from "./_components/footer"
import { Toaster } from "sonner"
import AuthProvider from "./_providers/session-provider"

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
          <Header />
          <div className="bg-gray-900 text-white">{children}</div>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
