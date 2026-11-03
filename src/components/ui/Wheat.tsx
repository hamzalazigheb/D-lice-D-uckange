import { cn } from "@/lib/utils";

/** Single decorative wheat ear. Colour follows `currentColor`. */
export function WheatEar({ className }: { className?: string }) {
  const rows = [0, 1, 2, 3, 4, 5];
  return (
    <svg
      viewBox="0 0 60 200"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none select-none", className)}
    >
      <path
        d="M30 200 C 31 150 29 100 30 40"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="30" cy="20" rx="5.2" ry="13" />
      {rows.map((i) => {
        const y = 44 + i * 19;
        return (
          <g key={i}>
            <ellipse cx="20" cy={y} rx="5.2" ry="12" transform={`rotate(-32 20 ${y})`} />
            <ellipse cx="40" cy={y} rx="5.2" ry="12" transform={`rotate(32 40 ${y})`} />
          </g>
        );
      })}
    </svg>
  );
}

/** A pair of wheat ears forming a laurel — used as a background flourish. */
export function WheatSprig({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none select-none", flip && "-scale-x-100", className)}
    >
      <div className="relative h-full w-full">
        <WheatEar className="absolute bottom-0 left-[10%] h-[92%] -rotate-[14deg] origin-bottom" />
        <WheatEar className="absolute bottom-0 left-[38%] h-full origin-bottom" />
        <WheatEar className="absolute bottom-0 left-[64%] h-[84%] rotate-[14deg] origin-bottom" />
      </div>
    </div>
  );
}

/** Thin line – wheat – line divider, as in the reference design. */
export function WheatDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center justify-center gap-3 text-caramel", className)}
    >
      <span className="h-px w-12 bg-caramel/50" />
      <WheatEar className="h-7 w-auto rotate-90" />
      <span className="h-px w-12 bg-caramel/50" />
    </div>
  );
}
