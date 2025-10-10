"use client"

import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { MenuIcon } from "lucide-react"
import Account from "./_components/account"
import Security from "./_components/security"
import Notifications from "./_components/notifications"
import Privacy from "./_components/privacy"
import Sidebar from "./_components/sidebar"

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("account")

  const tabTitles: Record<string, string> = {
    account: "Conta",
    security: "Segurança",
    notifications: "Notificações",
    privacy: "Privacidade",
  }

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return <Account />
      case "security":
        return <Security />
      case "notifications":
        return <Notifications />
      case "privacy":
        return <Privacy />
      default:
        return <Account />
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-fuchsia-50 to-purple-300 dark:from-slate-900 dark:via-purple-950 dark:to-black">
      {/* Sidebar desktop */}
      <div className="hidden min-h-screen md:block">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-10">
        {/* Botão para abrir Sheet em mobile */}
        <div className="mb-4 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="w-full rounded-lg bg-purple-700 px-4 py-2 font-medium text-white shadow-md transition hover:bg-purple-600">
                <MenuIcon />
                Abrir Configurações
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[70%] p-6 dark:bg-slate-950">
              <SheetTitle className="sr-only">Configurações</SheetTitle>
              <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isSheet
              />
            </SheetContent>
          </Sheet>
        </div>

        {/* Título da aba */}
        <h1 className="mb-6 text-3xl font-bold text-black dark:text-white">
          {tabTitles[activeTab] || "Configurações"}
        </h1>

        {/* Conteúdo da aba */}
        <div className="rounded-2xl border-2 border-purple-900/50 bg-white/60 p-6 shadow-xl backdrop-blur dark:border-white/50 dark:bg-slate-950/50">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
