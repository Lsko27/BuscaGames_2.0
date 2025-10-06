import Image from "next/image"
import AboutCard from "../_components/about-card"
import TeamCard from "../_components/team-card"
import { Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import ContactAboutForm from "../_components/contact-about-form"
import FooterContact from "../_components/footer-contact"

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
          url: "https://www.linkedin.com/in/caio-cesar-dev",
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
  ]

  return (
    <>
      {/* IMAGEM */}
      <div className="relative h-[50vh] w-full">
        <Image
          alt="background image"
          src="/freepik__expand__92115.png"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.6)]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <div className="max-w-4xl">
            <h2 className="mb-2 text-3xl font-bold text-white md:text-5xl">
              Sobre a BuscaGames
            </h2>
            <p className="text-lg text-blue-300 md:text-2xl">
              Conheça nossa equipe e missão de levar tecnologia de ponta a você.
            </p>
          </div>
        </div>
      </div>

      {/* CARD SOBRE NÓS */}
      <div className="flex w-full justify-center bg-gray-900 px-4 py-14 sm:px-6">
        <AboutCard />
      </div>

      {/* EQUIPE */}
      <div className="bg-slate-950 px-4 py-12 sm:px-6 lg:px-24">
        <h3 className="text-center text-4xl font-bold text-white">
          Equipe do Projeto
        </h3>
        <p className="mb-8 text-center text-lg text-gray-300">Quem somos</p>

        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:items-center lg:justify-center">
          {teamMembers.map((member) => (
            <TeamCard key={member.rm} params={member} />
          ))}
        </div>
      </div>

      {/* FORMULÁRIO DE CONTATO */}
      <div className="bg-gray-900 p-10 px-4 sm:px-6">
        <h3 className="mb-8 text-center text-4xl font-bold text-white">
          Fale Conosco
        </h3>

        <div className="mx-auto w-full max-w-5xl rounded-lg bg-gray-800 p-7">
          <div className="flex flex-col items-center justify-center gap-8 lg:flex-row">
            {/* ESQUERDA */}
            <div className="flex w-full flex-col justify-between text-center lg:w-1/2 lg:text-left">
              <h4 className="mb-5 text-3xl font-semibold text-indigo-300">
                Entre em contato
              </h4>
              <p className="mb-3 text-gray-300">
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
            <div className="w-full rounded-lg bg-gray-900 p-8 lg:w-1/2">
              <ContactAboutForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage
