import { ReactNode } from "react"
import { Button } from "./ui/button"
import Link from "next/link"

interface NavItemProps {
  href: string
  icon: ReactNode
  label: string
}

const NavItem = ({ href, label, icon }: NavItemProps) => {
  return (
    <Button asChild variant="ghost">
      <Link href={href} className="flex items-center gap-2">
        {icon}
        <span className="text-lg">{label}</span>
      </Link>
    </Button>
  )
}

export default NavItem
