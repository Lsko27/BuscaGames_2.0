"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Valor de progresso (0 a 100) */
  value?: number
}

/**
 * Componente de barra de progresso simples e estilizado.
 * Usa Tailwind e suporta temas claro/escuro automaticamente.
 */
const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800",
          className,
        )}
        {...props}
      >
        <div
          className="h-full bg-green-500 transition-all duration-700 ease-in-out dark:bg-green-400"
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
    )
  },
)

Progress.displayName = "Progress"

export { Progress }
