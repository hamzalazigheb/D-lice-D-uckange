import { cn } from "@/lib/utils";
import { WheatEar } from "./Wheat";

/** Text-based logo, used if the logo file is missing. */
export function BrandWordmark({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2", light ? "text-cream" : "text-brown", className)}>
      <WheatEar className="h-9 w-auto text-caramel" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-xl font-semibold italic">Délice D&apos;Uckange</span>
        <span className="mt-1 font-nav text-[0.58rem] font-medium uppercase tracking-[0.22em]">
          Boulangerie · Pâtisserie
        </span>
      </span>
    </span>
  );
}
