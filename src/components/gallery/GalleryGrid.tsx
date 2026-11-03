"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AssetImage } from "@/components/ui/AssetImage";
import { galleryFilters, type GalleryFilter, type GalleryItem } from "@/lib/gallery";
import { cn } from "@/lib/utils";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<GalleryFilter>("tous");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const available = galleryFilters.filter((f) => f.id === "tous" || items.some((i) => i.category === f.id));
  const visible = filter === "tous" ? items : items.filter((i) => i.category === filter);

  const close = useCallback(() => {
    setOpenIndex(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback(
    (dir: 1 | -1) => setOpenIndex((i) => (i === null ? i : (i + dir + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, step]);

  const current = openIndex !== null ? visible[openIndex] : null;

  return (
    <>
      <div role="group" aria-label="Filtrer les photos" className="flex flex-wrap justify-center gap-2">
        {available.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={cn(
              "min-h-11 rounded-full border px-5 font-nav text-[0.8rem] font-medium transition-colors",
              filter === f.id
                ? "border-brown bg-brown text-cream"
                : "border-beige bg-white text-brown hover:border-brown",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <motion.ul layout className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((item, i) => (
            <motion.li
              layout
              key={item.image}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <button
                type="button"
                onClick={(e) => {
                  lastFocus.current = e.currentTarget;
                  setOpenIndex(i);
                }}
                aria-label={`Agrandir : ${item.caption}`}
                className="group relative block aspect-[4/3.4] w-full overflow-hidden rounded-3xl shadow-soft transition-shadow hover:shadow-lift"
              >
                <AssetImage
                  image={item.image}
                  alt={item.caption}
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brown/80 to-transparent px-4 pb-3 pt-10 text-left font-serif text-sm text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:text-base">
                  {item.caption}
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {current && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-brown-dark/95 p-4 sm:p-10"
            onClick={close}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Fermer"
              className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/25"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
            {visible.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Photo précédente"
                  className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-cream/25 sm:left-6"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label="Photo suivante"
                  className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-cream/25 sm:right-6"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden="true" />
                </button>
              </>
            )}
            <figure className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <motion.div
                key={current.image}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-beige sm:aspect-[16/10]"
              >
                <AssetImage image={current.image} alt={current.caption} fit="contain" sizes="90vw" />
              </motion.div>
              <figcaption className="mt-4 text-center font-serif text-lg text-cream">{current.caption}</figcaption>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
