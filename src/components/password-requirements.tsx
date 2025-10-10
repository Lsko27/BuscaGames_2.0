import { Check, X } from "lucide-react"

interface PasswordRequirementsProps {
  password: string
}

export const PasswordRequirements = ({
  password,
}: PasswordRequirementsProps) => {
  const requirements = [
    { label: "Ao menos 8 caracteres", test: (pw: string) => pw.length >= 8 },
    {
      label: "Ao menos 1 letra maiúscula",
      test: (pw: string) => /[A-Z]/.test(pw),
    },
    {
      label: "Ao menos 1 letra minúscula",
      test: (pw: string) => /[a-z]/.test(pw),
    },
    { label: "Ao menos 1 número", test: (pw: string) => /\d/.test(pw) },
    {
      label: "Ao menos 1 caractere especial",
      test: (pw: string) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pw),
    },
  ]

  return (
    <ul className="mt-2 space-y-1">
      {requirements.map((req, idx) => {
        const passed = req.test(password)
        return (
          <li key={idx} className="flex items-center gap-2 text-sm">
            {passed ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <X className="h-4 w-4 text-red-500" />
            )}
            <span className={passed ? "text-green-500" : "text-red-500"}>
              {req.label}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
