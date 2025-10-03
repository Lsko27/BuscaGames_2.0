import { Check, X } from "lucide-react"

interface PasswordRequirementsProps {
  params: {
    label: string
    isValid: boolean
  }
}

const PasswordRequirements = ({ params }: PasswordRequirementsProps) => {
  return (
    <li className="flex items-center gap-2">
      {params.isValid ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-red-500" />
      )}
      <span className={params.isValid ? "text-green-500" : "text-red-500"}>
        {params.label}
      </span>
    </li>
  )
}

export default PasswordRequirements
