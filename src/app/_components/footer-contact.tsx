import { ReactNode } from "react";
import { Button } from "./ui/button";

interface FooterContactProps {
  icon: ReactNode;
  label: string;
}

const FooterContact = ({ icon, label }: FooterContactProps) => {
  return (
    <div className="flex items-center">
      <Button variant="ghost" className="mr-2" >
        {icon}
        <span>{label}</span>
      </Button>
    </div>
  );
};

export default FooterContact;
