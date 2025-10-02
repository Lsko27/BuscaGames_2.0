import Link from "next/link";
import { Button } from "./ui/button";
import { ReactNode } from "react";

interface FooterSocialMediaLinksProps {
  href: string;
  icon: ReactNode;
}

const FooterSocialMediaLinks = ({
  href,
  icon,
}: FooterSocialMediaLinksProps) => {
  return (
    <Button variant="ghost" className="w-fit" asChild>
      <Link href={href} className="flex items-center">
        {icon}
      </Link>
    </Button>
  );
};

export default FooterSocialMediaLinks;
