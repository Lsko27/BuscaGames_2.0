import Image from "next/image"
import FooterSocialMediaLinks from "./social-media-links"
import {
  Facebook,
  GithubIcon,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react"
import FooterNavigations from "./footer-navigation"
import FooterContact from "./footer-contact"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="mx-auto border-t-4 border-purple-600 p-8 sm:p-12 dark:bg-gray-900">
      <div className="flex flex-col gap-8 md:flex-row md:justify-between">
        {/* Coluna 1: Logo + Parágrafo + Social */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left lg:space-y-5">
          <Image src="/logo.png" alt="BuscaGames" width={150} height={50} />

          <p className="text-sm sm:text-base dark:text-gray-300">
            Sua plataforma gamificada para encontrar as melhores ofertas de
            jogos e acumular recompensas!
          </p>

          <div className="flex justify-center space-x-3 md:justify-start dark:text-white">
            <FooterSocialMediaLinks href="#" icon={<Facebook />} />
            <FooterSocialMediaLinks href="#" icon={<GithubIcon />} />
            <FooterSocialMediaLinks href="#" icon={<Instagram />} />
            <FooterSocialMediaLinks href="#" icon={<Twitter />} />
          </div>
        </div>

        {/* Navegação */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h3 className="mb-3 text-xl font-bold dark:text-white">Navegação</h3>
          <div className="space-y-2 text-sm text-purple-900 sm:text-base dark:text-gray-300">
            <FooterNavigations href="/" label="Home" />
            <FooterNavigations href="/games" label="Games" />
            <FooterNavigations href="/quests" label="Quests" />
            <FooterNavigations href="/about" label="Sobre Nós" />
            <FooterNavigations href="/profile" label="Perfil" />
          </div>
        </div>

        {/* Categorias */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h3 className="mb-3 text-xl font-bold dark:text-white">Categorias</h3>
          <div className="space-y-2 text-sm text-purple-900 sm:text-base dark:text-gray-300">
            <FooterNavigations href="/games?category=rpg" label="RPG" />
            <FooterNavigations href="/games?category=ação" label="Ação" />
            <FooterNavigations href="/games?category=terror" label="Terror" />
            <FooterNavigations
              href="/games?category=aventura"
              label="Aventura"
            />
            <FooterNavigations href="/games" label="Ver todas" />
          </div>
        </div>

        {/* Contato */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h3 className="text mb-3 text-xl font-bold dark:text-white">
            Contato
          </h3>
          <div className="space-y-2 text-sm text-purple-900 sm:text-base dark:text-gray-300">
            <FooterContact icon={<Mail />} label="equipebuscagames@gmail.com" />
            <FooterContact icon={<Phone />} label="(11) 95125-4014" />
            <FooterContact icon={<MapPin />} label="São Paulo, SP - Brasil" />
            <div className="mt-3 flex justify-center gap-3 md:justify-start">
              <Link href="#">
                <Image
                  alt="Download on Google Play"
                  src="/googleplay.png"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </Link>
              <Link href="#">
                <Image
                  alt="Download on App Store"
                  src="/appstore.png"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-6">
        <div className="flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-sm sm:text-base dark:text-gray-300">
            © 2025 BuscaGames. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-purple-900 sm:text-base md:justify-end dark:text-gray-300">
            <FooterNavigations href="#" label="Políticas de Privacidade" />
            <FooterNavigations href="#" label="Termos de Uso" />
            <FooterNavigations href="#" label="Ajuda" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
