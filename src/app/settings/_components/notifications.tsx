const Notifications = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold dark:text-purple-300">
        Notificações
      </h2>
      <p className="text-gray-700 dark:text-gray-400">
        Configure alertas e mensagens para receber apenas o que importa.
      </p>

      <div className="flex flex-col gap-4 sm:gap-3">
        {[
          "Ofertas de jogos",
          "Atualizações de quests",
          "Mensagens da comunidade",
          "Avisos do sistema",
        ].map((opt) => (
          <label
            key={opt}
            className="flex w-full items-center gap-3 rounded-lg border border-gray-700 bg-white px-4 py-2 transition-all hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <input type="checkbox" className="accent-purple-600" />
            <span className="text-gray-700 dark:text-gray-300">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default Notifications
