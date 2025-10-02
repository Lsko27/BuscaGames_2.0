import Link from "next/link";
import { Button } from "./ui/button";
import { ReactNode } from "react";

interface SocialMediaLinksProps {
  href: string;
  icon: ReactNode;
}

const SocialMediaLinks = ({ href, icon }: SocialMediaLinksProps) => {
  return (
    <Button variant="ghost" className="w-fit" asChild>
      <Link href={href} className="flex items-center">
        {icon}
      </Link>
    </Button>
  );
};

export default SocialMediaLinks;
