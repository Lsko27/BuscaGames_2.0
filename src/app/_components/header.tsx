"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  HomeIcon,
  InfoIcon,
  Joystick,
  ListTodo,
  LogIn,
  MenuIcon,
  MoonIcon,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import NavItem from "./nav-item";
import { Badge } from "./ui/badge";

const Header = () => {
  return (
    <div className="py-5 px-10 bg-gray-900 flex justify-between items-center">
      {/* Logo */}
      <div>
        <Link href="/">
          <Image alt="BuscaGames Logo" src="/logo.png" width={75} height={75} />
        </Link>
      </div>

      {/* Menu hamburguer (mobile) */}
      <div className="block md:hidden">
        <Button size="icon" variant="ghost" className="text-white">
          <MenuIcon />
        </Button>
      </div>

      {/* Links */}
      <div className="hidden md:flex gap-6 text-white">
        <NavItem href="/" icon={<HomeIcon />} label="Home" />
        <NavItem href="/games" icon={<Joystick />} label="Games" />
        <NavItem href="/quests" icon={<ListTodo />} label="Quests" />
        <NavItem href="/about" icon={<InfoIcon />} label="Sobre Nós" />
      </div>

      {/* Botões (lua, carrinho, login) */}
      <div className="hidden md:flex flex-1 max-w-[200px] text-white justify-between">
        <Button size="lg" variant="ghost" className="rounded-full">
          <MoonIcon />
        </Button>
        <div className="relative">
          <Button size="lg" variant="ghost" className="rounded-full">
            <ShoppingCart />
          </Button>
          {/* Badge ShadCN */}
          <Badge
            className="absolute -top-1 -right-1 rounded-full"
            variant="destructive"
          >
            0
          </Badge>
        </div>
        <Button size="lg" variant="ghost" className="text-white">
          <LogIn />
          <span className="text-lg">Login</span>
        </Button>
      </div>
    </div>
  );
};

export default Header;
