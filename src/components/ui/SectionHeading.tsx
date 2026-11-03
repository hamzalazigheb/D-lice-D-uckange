import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { WheatDivider } from "./Wheat";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
  className?: string;
  divider?: boolean;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  as: Tag = "h2",
  className,
  divider = true,
  id,
}: SectionHeadingProps) {
  const center = align === "center";
  return (
    <Reveal className={cn(center ? "mx-auto text-center" : "text-left", "max-w-2xl", className)}>
      {eyebrow && (
        <p className="mb-3 font-nav text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-caramel-dark">
          {eyebrow}
        </p>
      )}
      <Tag id={id} className="font-serif text-4xl font-semibold leading-tight text-brown sm:text-5xl">{title}</Tag>
      {divider && <WheatDivider className={cn("mt-4", !center && "justify-start")} />}
      {subtitle && <p className="mt-4 text-base leading-relaxed text-ink/80 sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
