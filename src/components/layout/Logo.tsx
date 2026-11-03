import Link from "next/link";
import { AssetImage } from "@/components/ui/AssetImage";
import { cn } from "@/lib/utils";

/** Logo linking to home. The file is a transparent PNG (4:3). */
export function Logo({
  className,
  priority,
  onClick,
}: {
  className?: string;
  priority?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Délice D'Uckange — retour à l'accueil"
      className={cn(
        "relative block aspect-[4/3] shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel",
        className,
      )}
    >
      <AssetImage image="logo" fit="contain" sizes="160px" priority={priority} />
    </Link>
  );
}
