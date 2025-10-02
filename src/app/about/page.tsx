import Image from "next/image";
import AboutCard from "../_components/about-card";
import TeamCard from "../_components/team-card";
import { Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import ContactAboutForm from "../_components/contact-about-form";
import FooterContact from "../_components/footer-contact";

const AboutPage = () => {
  const teamMembers = [
    {
      imageUrl: "/profile1.png",
      name: "Caio Oliveira",
      role: "Gerente do Projeto",
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
    {
      imageUrl: "/profile5.png",
      name: "Sérgio Cavalcante",
      role: "Desenvolvedor",
      rm: "RM 563208",
      socialLinks: [
        {
          icon: <Linkedin />,
          url: "https://www.linkedin.com/in/sergio-filipi-cavalcante-737053174/",
        },
        { icon: <Github />, url: "https://github.com/SergioJCavalcante" },
        {
          icon: <Instagram />,
          url: "https://www.instagram.com/sergioo_cavalcante/",
        },
      ],
    },
    {
      imageUrl: "/profile3.png",
      name: "Rubens Escobar",
      role: "Desenvolvedor",
      rm: "RM 562164",
      socialLinks: [
        {
          icon: <Linkedin />,
          url: "https://www.linkedin.com/in/rubensescobar/",
        },
        { icon: <Github />, url: "https://github.com/rubensescobar" },
        { icon: <Instagram />, url: "https://www.instagram.com/r.escobar_/" },
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
      <div className="bg-slate-950 py-12">
        <h3 className="text-center text-white text-3xl font-bold my-2">
          Equipe do Projeto
        </h3>
        <p className="text-center text-gray-300 text-lg mb-2">Quem somos</p>
        <div className="flex items-center justify-center gap-6 p-5">
          {teamMembers.map((member) => (
            <TeamCard key={member.rm} params={member} />
          ))}
        </div>
      </div>

      {/* FORMULÁRIO DE CONTATO */}
      <div className="p-10 bg-gray-900">
        <h3 className="text-3xl font-bold mb-8 text-center text-white">
          Fale Conosco
        </h3>

        <div className="p-7 bg-gray-800 w-full max-w-5xl rounded-lg mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
            {/* ESQUERDA */}
            <div className="lg:w-1/2 flex flex-col justify-between h-full text-center lg:text-left">
              <h4 className="text-indigo-300 font-semibold text-2xl mb-5">
                Entre em contato
              </h4>
              <p className="text-gray-300 mb-3">
                Tem alguma dúvida ou sugestão? Estamos aqui para ajudar!
              </p>

              <div className="flex flex-col gap-3 text-xl text-white">
                <FooterContact
                  icon={<Mail />}
                  label="equipebuscagames@gmail.com"
                />
                <FooterContact icon={<Phone />} label="(11) 95125-4014" />
                <FooterContact
                  icon={<MapPin />}
                  label="São Paulo, SP - Brasil"
                />
              </div>
            </div>

            {/* DIREITA */}
            <div className="lg:w-1/2 p-8 bg-gray-900 rounded-lg">
              <ContactAboutForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
