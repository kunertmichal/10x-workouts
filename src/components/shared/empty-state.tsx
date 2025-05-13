import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
};

export function EmptyState({
  icon,
  title,
  description,
  buttonText,
  buttonHref,
}: Props) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12">
      <div className="shadow-sm border rounded-md inline-flex items-center justify-center bg-gray-50 p-2 mb-4">
        {icon}
      </div>
      <p className="font-semibold text-xl ">{title}</p>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <Button asChild>
        <Link href={buttonHref}>{buttonText}</Link>
      </Button>
    </div>
  );
}
