import Image from "next/image";
import FooterSocialMediaLinks from "./social-media-links";
import {
  Facebook,
  GithubIcon,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import FooterNavigations from "./footer-navigation";
import FooterContact from "./footer-contact";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mx-auto px-10 py-5 bg-gray-900 border-t-4 border-purple-600">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Coluna 1: Logo + Parágrafo + Social */}
        <div className="flex flex-col items-start space-y-4">
          <Image src="/logo.png" alt="BuscaGames" width={150} height={50} />

          <p className="text-gray-300">
            Sua plataforma gamificada para encontrar as melhores ofertas de
            jogos e acumular recompensas!
          </p>

          <div className="flex space-x-2 text-white dark:text-blue-500">
            <FooterSocialMediaLinks href="#" icon={<Facebook />} />
            <FooterSocialMediaLinks href="#" icon={<GithubIcon />} />
            <FooterSocialMediaLinks href="#" icon={<Instagram />} />
            <FooterSocialMediaLinks href="#" icon={<Twitter />} />
          </div>
        </div>

        {/* Navegação */}
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold mb-3 text-white">Navegação</h3>
          <div className="space-y-2 text-lg text-gray-300">
            <FooterNavigations href="/" label="Home" />
            <FooterNavigations href="/games" label="Games" />
            <FooterNavigations href="/quests" label="Quests" />
            <FooterNavigations href="/about" label="Sobre Nós" />
            <FooterNavigations href="/profile" label="Perfil" />
          </div>
        </div>

        {/* Categorias */}
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold mb-3 text-white">Categorias</h3>
          <div className="space-y-2 text-lg text-gray-300">
            <FooterNavigations href="/games?category=rpg" label="RPG" />
            <FooterNavigations href="/games?category=action" label="Ação" />
            <FooterNavigations href="/games?category=horror" label="Terror" />
            <FooterNavigations
              href="/games?category=adventure"
              label="Aventura"
            />
            <FooterNavigations href="/games?category=all" label="Ver todas" />
          </div>
        </div>

        {/* Contato */}
        <div className="flex flex-col items-center w-full">
          <h3 className="text-xl font-bold mb-3 text-white">Contato</h3>
          <div className="space-y-2 text-lg text-gray-300">
            <FooterContact icon={<Mail />} label="equipebuscagames@gmail.com" />
            <FooterContact icon={<Phone />} label="(11) 95125-4014" />
            <FooterContact icon={<MapPin />} label="São Paulo, SP - Brasil" />
            <div className="flex gap-2 my-3">
              <Link href="#">
                <Image
                  alt="Downloand on Google Play"
                  src="/googleplay.png"
                  width={120}
                  height={10}
                  className="object-cover w-fit"
                />
              </Link>

              <Link href="#">
                <Image
                  alt="Downloand on Google Play"
                  src="/appstore.png"
                  width={120}
                  height={10}
                  className="object-cover w-fit"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className=" mt-6 py-6 border-t border-gray-300">
        <div className="flex justify-between mt-2">
          <p className="text-gray-300">
            © 2025 BuscaGames. Todos os direitos reservados.
          </p>
          <div className="flex flex-row gap-3 text-gray-300">
            <FooterNavigations href="#" label="Políticas de Privacidade" />
            <FooterNavigations href="#" label="Termos de Uso" />
            <FooterNavigations href="#" label="Ajuda" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
