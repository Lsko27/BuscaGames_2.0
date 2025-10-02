import Image from "next/image";
import { ReactNode } from "react";
import { Card, CardContent } from "./ui/card";
import SocialMediaLinks from "./social-media-links";

interface SocialLink {
  icon: ReactNode;
  url: string;
}

interface TeamCardProps {
  params: {
    imageUrl: string;
    name: string;
    role: string;
    rm: string;
    socialLinks: SocialLink[];
  };
}

const TeamCard = ({ params }: TeamCardProps) => {
  return (
    <Card className="flex flex-col overflow-hidden w-90 h-[600px] p-0 border-1 border-purple-700">
      <CardContent className="flex flex-col items-center text-center h-full p-0">
        {/* Imagem */}
        <div className="w-full h-[70%] relative">
          <Image
            src={params.imageUrl}
            alt={params.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Texto */}
        <div className="flex flex-col items-center text-center p-4 w-full gap-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {params.name}
          </h3>
          <span className="inline-block mt-1 px-3 py-1 bg-purple-600 dark:bg-purple-700 text-white rounded-full text-sm font-medium w-full">
            {params.role}
          </span>
          <p className="mt-1 mb-4 text-indigo-600 dark:text-indigo-400 font-semibold">
            {params.rm}
          </p>
        </div>

        {/* Links sociais */}
        <div className="flex justify-center space-x-4 mt-auto text-indigo-600 pb-4">
          {params.socialLinks.map(({ icon, url }, i) => (
            <SocialMediaLinks key={i} href={url} icon={icon} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
