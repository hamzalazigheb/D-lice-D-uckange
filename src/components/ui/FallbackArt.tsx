import type { ReactNode } from "react";
import type { ArtKind } from "@/lib/images";
import { cn } from "@/lib/utils";

const C = {
  crust: "#C98A4B",
  crustDark: "#A87545",
  crumb: "#F1DDB3",
  brown: "#59402E",
  cream: "#F8F4EC",
  berry: "#C2473F",
  green: "#7E9A55",
  rose: "#E7B7A8",
};

function Scores({ y = 0 }: { y?: number }) {
  return (
    <g stroke={C.crumb} strokeWidth="3" strokeLinecap="round" fill="none" opacity=".85">
      <path d={`M72 ${70 + y} q10 -10 18 -2`} />
      <path d={`M96 ${64 + y} q10 -10 18 -2`} />
      <path d={`M118 ${72 + y} q10 -10 18 -2`} />
    </g>
  );
}

function Bread() {
  return (
    <g>
      <ellipse cx="100" cy="112" rx="62" ry="8" fill={C.brown} opacity=".12" />
      <ellipse cx="100" cy="86" rx="60" ry="36" fill={C.crust} />
      <ellipse cx="100" cy="80" rx="52" ry="26" fill={C.crustDark} opacity=".25" />
      <Scores y={4} />
    </g>
  );
}

function Baguette() {
  return (
    <g transform="rotate(-18 100 80)">
      <rect x="25" y="66" width="150" height="26" rx="13" fill={C.crust} />
      <g stroke={C.crumb} strokeWidth="3" strokeLinecap="round">
        {[52, 76, 100, 124, 148].map((x) => (
          <path key={x} d={`M${x} 72 l10 14`} />
        ))}
      </g>
    </g>
  );
}

function Croissant() {
  return (
    <g>
      <ellipse cx="100" cy="112" rx="58" ry="7" fill={C.brown} opacity=".12" />
      <ellipse cx="52" cy="92" rx="22" ry="13" fill={C.crustDark} transform="rotate(38 52 92)" />
      <ellipse cx="148" cy="92" rx="22" ry="13" fill={C.crustDark} transform="rotate(-38 148 92)" />
      <ellipse cx="72" cy="78" rx="27" ry="19" fill={C.crust} transform="rotate(20 72 78)" />
      <ellipse cx="128" cy="78" rx="27" ry="19" fill={C.crust} transform="rotate(-20 128 78)" />
      <ellipse cx="100" cy="72" rx="26" ry="24" fill={C.crust} />
      <g stroke={C.crumb} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity=".8">
        <path d="M84 58 q16 -6 32 0" />
        <path d="M80 72 q20 -8 40 0" />
        <path d="M82 86 q18 -8 36 0" />
      </g>
    </g>
  );
}

function PainChocolat() {
  return (
    <g>
      <ellipse cx="100" cy="112" rx="56" ry="7" fill={C.brown} opacity=".12" />
      <rect x="40" y="52" width="120" height="58" rx="22" fill={C.crust} />
      <rect x="40" y="52" width="120" height="30" rx="18" fill={C.crustDark} opacity=".25" />
      <rect x="62" y="62" width="76" height="9" rx="4.5" fill={C.brown} />
      <rect x="62" y="82" width="76" height="9" rx="4.5" fill={C.brown} />
    </g>
  );
}

function Tart({ berries = true }: { berries?: boolean }) {
  return (
    <g>
      <ellipse cx="100" cy="116" rx="52" ry="6" fill={C.brown} opacity=".12" />
      <path d="M48 76 H152 L142 108 Q100 118 58 108 Z" fill={C.crust} />
      <ellipse cx="100" cy="76" rx="52" ry="15" fill={C.crumb} />
      {berries &&
        [
          [76, 72],
          [92, 66],
          [110, 70],
          [126, 74],
          [84, 80],
          [102, 79],
          [118, 82],
        ].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="8" fill={C.berry} />)}
    </g>
  );
}

function Cake({ top = C.berry, drip = true }: { top?: string; drip?: boolean }) {
  return (
    <g>
      <ellipse cx="100" cy="118" rx="62" ry="7" fill={C.brown} opacity=".12" />
      <rect x="46" y="64" width="108" height="52" rx="10" fill={C.crumb} />
      <rect x="46" y="64" width="108" height="18" rx="9" fill={drip ? C.brown : C.cream} />
      {drip && (
        <g fill={C.brown}>
          <rect x="60" y="76" width="9" height="20" rx="4.5" />
          <rect x="90" y="76" width="9" height="28" rx="4.5" />
          <rect x="122" y="76" width="9" height="16" rx="4.5" />
        </g>
      )}
      {[66, 84, 102, 120, 138].map((x) => (
        <circle key={x} cx={x} cy="60" r="7" fill={C.cream} />
      ))}
      <circle cx="84" cy="52" r="7.5" fill={top} />
      <circle cx="104" cy="50" r="7.5" fill={top} />
      <circle cx="122" cy="53" r="7.5" fill={top} />
    </g>
  );
}

function Interior() {
  return (
    <g>
      <rect x="30" y="36" width="140" height="84" rx="6" fill={C.cream} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x={30 + i * 20} y="36" width="20" height="22" fill={i % 2 ? C.cream : C.brown} />
      ))}
      <path d="M30 58 q10 12 20 0 q10 12 20 0 q10 12 20 0 q10 12 20 0 q10 12 20 0 q10 12 20 0 q10 12 20 0" fill="none" stroke={C.brown} strokeWidth="0" />
      <rect x="44" y="72" width="40" height="48" rx="3" fill={C.crumb} />
      <rect x="96" y="72" width="60" height="22" rx="3" fill={C.crust} opacity=".6" />
      <rect x="96" y="98" width="60" height="22" rx="3" fill={C.crustDark} opacity=".5" />
    </g>
  );
}

function Snack() {
  return (
    <g transform="rotate(-8 100 80)">
      <rect x="32" y="62" width="136" height="16" rx="8" fill={C.crust} />
      <rect x="36" y="76" width="128" height="6" rx="3" fill={C.green} />
      <rect x="36" y="81" width="128" height="7" rx="3" fill={C.rose} />
      <rect x="36" y="87" width="128" height="5" rx="2.5" fill={C.crumb} />
      <rect x="32" y="91" width="136" height="16" rx="8" fill={C.crust} />
    </g>
  );
}

function artFor(kind: ArtKind): ReactNode {
  switch (kind) {
    case "bread":
      return <Bread />;
    case "baguette":
      return <Baguette />;
    case "croissant":
    case "viennoiserie":
      return <Croissant />;
    case "painChocolat":
      return <PainChocolat />;
    case "tart":
    case "patisserie":
      return <Tart />;
    case "chocolateCake":
      return <Cake top={C.brown} />;
    case "strawberryCake":
    case "cake":
      return <Cake />;
    case "interior":
      return <Interior />;
    case "snack":
      return <Snack />;
    case "hero":
      return <Croissant />;
    default:
      return <Bread />;
  }
}

/**
 * Graceful fallback shown when a photo file is missing. Fills its parent.
 */
export function FallbackArt({
  kind,
  label,
  className,
}: {
  kind: ArtKind;
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label ?? "Illustration"}
      className={cn(
        "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-beige-light via-beige to-[#D9BF98]",
        className,
      )}
    >
      <svg viewBox="0 0 200 150" className="h-[78%] w-[78%] max-w-[360px]" aria-hidden="true">
        {artFor(kind)}
      </svg>
    </div>
  );
}
