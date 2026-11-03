"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IMAGES, type ArtKind, type ImageKey } from "@/lib/images";
import { cn } from "@/lib/utils";
import { FallbackArt } from "./FallbackArt";
import { BrandWordmark } from "./BrandWordmark";

interface AssetImageProps {
  /** Key from the asset registry (src/lib/images.ts). */
  image?: ImageKey;
  /** For items without a photo: show the illustrated fallback straight away. */
  art?: ArtKind;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  fit?: "cover" | "contain";
}

/**
 * Fills its (relatively positioned) parent. If the file is missing or fails to
 * load, an illustrated fallback is displayed so the layout never breaks.
 */
export function AssetImage({
  image,
  art,
  alt,
  sizes = "100vw",
  priority,
  className,
  imgClassName,
  fit = "cover",
}: AssetImageProps) {
  const def = image ? IMAGES[image] : undefined;
  const [failed, setFailed] = useState(!def);
  const ref = useRef<HTMLImageElement>(null);

  // The error event may fire before hydration — re-check once mounted.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  const kind = def?.art ?? art ?? "bread";
  const text = alt ?? def?.alt ?? "";

  if (failed) {
    return kind === "logo" ? (
      <div className={cn("absolute inset-0 flex items-center", className)} role="img" aria-label={text}>
        <BrandWordmark />
      </div>
    ) : (
      <FallbackArt kind={kind} label={text} className={className} />
    );
  }

  return (
    <Image
      ref={ref}
      src={def!.src}
      alt={text}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={cn(fit === "cover" ? "object-cover" : "object-contain", className, imgClassName)}
    />
  );
}
