import Image from "next/image";
import AboutCard from "../_components/about-card";
import TeamCard from "../_components/team-card";
import { Github, Instagram, Linkedin } from "lucide-react";

const AboutPage = () => {
  const teamMembers = [
    {
      imageUrl: "/profile1.png",
      name: "Caio Oliveira",
      role: "Desenvolvedor",
      position: "Gerente de Projeto",
      rm: "RM 561294",
      socialLinks: [
        {
          icon: <Linkedin />,
          url: "https://linkedin.com/in/alicesilva",
        },
        { icon: <Github />, url: "https://github.com/CaioCesarOliver" },
        {
          icon: <Instagram />,
          url: "https://www.instagram.com/caiooliverss/",
        },
      ],
    },
    {
      imageUrl: "/profile2.png",
      name: "Yuri Lesko",
      role: "Designer UI/UX",
      position: "Responsável pelo Design",
      rm: "RM 564119",
      socialLinks: [
        {
          icon: <Linkedin />,
          url: "https://www.linkedin.com/in/yuri-gabriel-matana-lesko-7a5499353/",
        },
        { icon: <Github />, url: "https://github.com/Lsko27" },
        { icon: <Instagram />, url: "https://www.instagram.com/les.ko_/" },
      ],
    },
  ];
  return (
    <>
      {/* IMAGEM */}
      <div className="relative h-1/4 w-full">
        <Image
          alt="background image"
          src="/freepik__expand__92115.png"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.6)]" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
            Sobre a BuscaGames
          </h2>
          <p className="text-lg md:text-2xl text-blue-300">
            Conheça nossa equipe e missão de levar tecnologia de ponta a você.
          </p>
        </div>
      </div>

      {/* CARD SOBRE NÓS */}
      <div className="bg-gray-900 w-full py-14 flex items-center justify-center">
        <AboutCard />
      </div>

      {/* EQUIPE */}
      <div>
        <h3>Equipe do Projeto</h3>
        <p>Quem somos</p>
        <div className="flex items-center justify-center gap-6 p-5">
          {teamMembers.map((member) => (
            <TeamCard key={member.rm} params={member} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutPage;
