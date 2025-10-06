import { ReactNode } from "react"
import { Button } from "./ui/button"
import Link from "next/link"

interface NavItemProps {
  href: string
  icon: ReactNode
  label: string
  onClick?: () => void
}

const NavItem = ({ href, label, icon, onClick }: NavItemProps) => {
  return (
    <Button asChild variant="ghost" onClick={onClick}>
      <Link href={href} className="flex items-center gap-2">
        {icon}
        <span className="text-lg">{label}</span>
      </Link>
    </Button>
  )
}

export default NavItem
