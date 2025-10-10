import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Security = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold dark:text-purple-300">Segurança</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 dark:text-gray-400">
            Senha atual
          </label>
          <Input
            type="password"
            className="mt-1 border-gray-300 bg-white text-black dark:border-slate-700 dark:bg-slate-800"
            placeholder="Digite sua senha atual"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 dark:text-gray-400">
            Nova senha
          </label>
          <Input
            type="password"
            className="mt-1 border-gray-300 bg-white text-black dark:border-slate-700 dark:bg-slate-800"
            placeholder="Digite a nova senha"
          />
        </div>
      </div>

      <Button className="w-full bg-purple-700 text-white transition-all hover:bg-purple-600 md:w-auto">
        Atualizar Senha
      </Button>
    </div>
  )
}

export default Security
