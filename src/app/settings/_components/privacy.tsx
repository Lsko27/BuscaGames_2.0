const Privacy = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold dark:text-purple-300">
        Privacidade
      </h2>
      <p className="text-gray-700 dark:text-gray-400">
        Controle quem pode ver suas informações e atividades.
      </p>

      <div className="flex flex-col gap-4 sm:gap-3">
        {[
          { label: "Mostrar perfil publicamente", defaultChecked: true },
          { label: "Mostrar conquistas", defaultChecked: true },
          { label: "Mostrar jogos na biblioteca", defaultChecked: false },
        ].map((opt, i) => (
          <label
            key={i}
            className="flex w-full items-center gap-3 rounded-lg border border-gray-700 bg-white px-4 py-2 transition-all hover:bg-slate-100 dark:border-gray-700 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <input
              type="checkbox"
              defaultChecked={opt.defaultChecked}
              className="accent-purple-600"
            />
            <span className="text-gray-700 dark:text-gray-300">
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default Privacy
