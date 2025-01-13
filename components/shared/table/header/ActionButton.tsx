import { Button } from "@/components/ui/Button";
import { PlusIcon } from "lucide-react";

import Link from "next/link";

interface ActionButtonProps {
  text: string;
  href?: string;
}

export const ActionButton = ({ text, href }: ActionButtonProps) => {
  const buttonContent = (
    <>
      <PlusIcon className="w-4 h-8 mr-1" />
      {text}
    </>
  );

  if (href) {
    return (
      <Link href={href}>
        <Button className="bg-emerald-600 text-white hover:bg-emerald-400 hover:text-emerald-700">
          {buttonContent}
        </Button>
      </Link>
    );
  }

  return (
    <Button className="bg-emerald-600 text-white hover:bg-emerald-400 hover:text-emerald-700">
      {buttonContent}
    </Button>
  );
};
