import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"

const Account = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold dark:text-purple-300">
        Informações da Conta
      </h2>

      {/* Grid responsivo: 1 coluna em mobile, 2 colunas em md+ */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="text-sm text-gray-700 dark:text-gray-400">
            Nome
          </label>
          <Input
            className="mt-1 w-full border-gray-300 bg-white text-black dark:border-slate-700 dark:bg-slate-800"
            placeholder="Seu nome"
          />
        </div>
        <div>
          <label className="text-sm text-gray-700 dark:text-gray-400">
            Nome de Usuário
          </label>
          <Input
            className="mt-1 w-full border-gray-300 bg-white text-black dark:border-slate-700 dark:bg-slate-800"
            placeholder="@nickname"
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-700 dark:text-gray-400">
          Email
        </label>
        <Input
          type="email"
          className="mt-1 w-full border-gray-300 bg-white text-black dark:border-slate-700 dark:bg-slate-800"
          placeholder="seu@email.com"
        />
      </div>

      <Button className="w-full bg-purple-700 text-white transition-all hover:bg-purple-600 md:w-auto">
        Salvar alterações
      </Button>
    </div>
  )
}

export default Account
