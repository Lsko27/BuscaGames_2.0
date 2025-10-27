"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { ReactNode } from "react"
import { motion } from "framer-motion"

interface SocialMediaLinksProps {
  href: string
  icon: ReactNode
}

const MotionButton = motion(Button)

const SocialMediaLinks = ({ href, icon }: SocialMediaLinksProps) => {
  return (
    <MotionButton
      variant="ghost"
      className="w-fit"
      asChild
      whileHover={{
        scale: 1.15,
        rotate: 5,
        transition: { type: "spring", stiffness: 400, damping: 10 },
      }}
      whileTap={{
        scale: 0.9,
        rotate: -5,
        transition: { duration: 0.2 },
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Link
        href={href}
        className="flex items-center text-xl transition-colors duration-300"
      >
        {icon}
      </Link>
    </MotionButton>
  )
}

export default SocialMediaLinks
