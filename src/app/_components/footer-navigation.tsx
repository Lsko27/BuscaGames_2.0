import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

interface FooterNavigationsProps {
  href: string;
  label: string;
}

const FooterNavigations = ({ href, label }: FooterNavigationsProps) => {
  return (
    <Button variant="ghost" asChild className="flex gap-2 w-fit">
      <Link href={href}>
        <ChevronRight />
        {label}
      </Link>
    </Button>
  );
};

export default FooterNavigations;
