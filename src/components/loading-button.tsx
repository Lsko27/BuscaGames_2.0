"use client"

import { ButtonHTMLAttributes, ReactNode } from "react"
import { Loader2 } from "lucide-react" // ícone de loading
import { Button } from "./ui/button"

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  children: ReactNode
}

const LoadingButton = ({
  isLoading,
  children,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      className={`relative flex items-center justify-center gap-2 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 ${
        props.className || ""
      }`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
      <span className={isLoading ? "opacity-50" : ""}>{children}</span>
    </Button>
  )
}

export default LoadingButton
