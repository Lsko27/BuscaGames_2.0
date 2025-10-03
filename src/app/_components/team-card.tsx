import Image from "next/image"
import { ReactNode } from "react"
import { Card, CardContent } from "./ui/card"
import SocialMediaLinks from "./social-media-links"

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
    <Card className="flex h-[600px] w-90 flex-col overflow-hidden border-1 border-purple-700 bg-gray-800 p-0">
      <CardContent className="flex h-full flex-col items-center p-0 text-center">
        {/* Imagem */}
        <div className="relative h-[70%] w-full">
          <Image
            src={params.imageUrl}
            alt={params.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Texto */}
        <div className="flex w-full flex-col items-center gap-4 p-4 text-center">
          <h3 className="text-xl font-semibold text-white">{params.name}</h3>
          <span className="mt-1 inline-block w-full rounded-full bg-purple-600 px-3 py-1 text-sm font-medium text-white dark:bg-purple-700">
            {params.role}
          </span>
          <p className="mt-1 mb-4 font-semibold text-indigo-400">{params.rm}</p>
        </div>

        {/* Links sociais */}
        <div className="mt-auto flex justify-center space-x-4 pb-4 text-white">
          {params.socialLinks.map(({ icon, url }, i) => (
            <SocialMediaLinks key={i} href={url} icon={icon} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default TeamCard
