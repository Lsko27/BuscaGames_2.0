"use client"

import Image from "next/image"
import { ReactNode } from "react"
import { Card, CardContent } from "./ui/card"
import SocialMediaLinks from "./social-media-links"
import { motion } from "framer-motion"

interface SocialLink {
  icon: ReactNode
  url: string
}

interface TeamCardProps {
  params: {
    imageUrl: string
    name: string
    role: string
    rm: string
    socialLinks: SocialLink[]
  }
}

const TeamCard = ({ params }: TeamCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <Card className="flex h-[600px] w-90 flex-col overflow-hidden border border-purple-700 p-0 transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800">
        <CardContent className="flex h-full flex-col items-center p-0 text-center">
          {/* Imagem */}
          <motion.div
            className="relative h-[70%] w-full overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Image
              src={params.imageUrl}
              alt={params.name}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Texto */}
          <div className="flex w-full flex-col items-center gap-4 p-4 text-center">
            <h3 className="text-xl font-semibold dark:text-white">
              {params.name}
            </h3>
            <span className="text-md mt-1 inline-block w-full rounded-full bg-purple-600 px-3 py-1 font-medium text-white dark:bg-purple-700">
              {params.role}
            </span>
            <p className="mt-1 mb-4 font-semibold text-indigo-400">
              {params.rm}
            </p>
          </div>

          {/* Links sociais */}
          <div className="mt-auto flex justify-center space-x-4 pb-4 hover:text-purple-500 dark:text-white">
            {params.socialLinks.map(({ icon, url }, i) => (
              <SocialMediaLinks key={i} href={url} icon={icon} />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default TeamCard
