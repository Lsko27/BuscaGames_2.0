"use client"

import { useState } from "react"
import LoginForm from "./login-form"
import RegisterForm from "./register-form"
import { Button } from "./ui/button"
import { LogIn, UserPlus } from "lucide-react"

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login")

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center p-4">
      {/* Abas */}
      <div className="mb-6 flex w-full overflow-hidden rounded-lg border border-purple-600">
        <Button
          className={`flex-1 py-2 text-lg font-semibold ${
            activeTab === "login"
              ? "bg-purple-700 text-white"
              : "bg-black text-gray-400"
          }`}
          onClick={() => setActiveTab("login")}
        >
          <LogIn />
          Login
        </Button>
        <Button
          className={`flex-1 py-2 text-lg font-semibold ${
            activeTab === "register"
              ? "bg-purple-700 text-white"
              : "bg-black text-gray-400"
          }`}
          onClick={() => setActiveTab("register")}
        >
          <UserPlus />
          Cadastro
        </Button>
      </div>

      {/* Conteúdo da aba */}
      <div className="w-full">
        {activeTab === "login" && <LoginForm />}
        {activeTab === "register" && <RegisterForm />}
      </div>
    </div>
  )
}

export default AuthTabs
