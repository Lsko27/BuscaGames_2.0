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

const Header = () => {
  return (
    <div className="p-5 bg-gray-800 flex justify-between items-center">
      {/* Logo */}
      <div>
        <Link href="/">
          <Image alt="BuscaGames Logo" src="/logo.png" width={75} height={75} />
        </Link>
      </div>

      <div className="block md:hidden">
        <Button size="icon" variant="ghost" className="text-white">
          <MenuIcon />
        </Button>
      </div>

      <div className="hidden md:flex gap-6 text-white">
        <NavItem href="/" icon={<HomeIcon />} label="Home" />
        <NavItem href="/games" icon={<Joystick />} label="Games" />
        <NavItem href="/quests" icon={<ListTodo />} label="Quests" />
        <NavItem href="/about" icon={<InfoIcon />} label="Sobre Nós" />
      </div>

      <div className="hidden md:flex gap-2 text-white">
        <Button size="icon" variant="ghost">
          <MoonIcon />
        </Button>
        <Button size="icon" variant="ghost">
          <ShoppingCart />
        </Button>
      </div>

      <div className="hidden md:block">
        <Button size="icon" variant="ghost" className="text-white">
          <LogIn />
        </Button>
      </div>
    </div>
  );
};

export default Header;
