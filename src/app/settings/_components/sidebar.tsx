import { User, Shield, Bell, Eye } from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  isSheet?: boolean // <-- novo
}

const tabs = [
  { key: "account", label: "Conta", icon: User },
  { key: "security", label: "Segurança", icon: Shield },
  { key: "notifications", label: "Notificações", icon: Bell },
  { key: "privacy", label: "Privacidade", icon: Eye },
]

export default function Sidebar({
  activeTab,
  setActiveTab,
  isSheet,
}: SidebarProps) {
  return (
    <div
      className={`flex h-screen flex-col border-r border-white/10 bg-white/80 p-6 backdrop-blur-xl dark:bg-slate-950/60 ${isSheet ? "h-full w-full border-r-0" : "w-64"}`}
    >
      <h2 className="mb-6 text-lg font-semibold dark:text-gray-200">
        Configurações
      </h2>
      <div className="flex flex-col gap-2">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${
              activeTab === key
                ? "bg-purple-700 text-white shadow-md"
                : "text-black hover:bg-purple-800/40 hover:text-white dark:text-gray-400"
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
