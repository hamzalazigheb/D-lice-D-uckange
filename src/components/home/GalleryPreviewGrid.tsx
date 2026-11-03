"use client";

import { motion } from "framer-motion";
import { AssetImage } from "@/components/ui/AssetImage";
import { StaggerItem, StaggerList } from "@/components/ui/StaggerList";
import type { GalleryItem } from "@/lib/gallery";
import { cn } from "@/lib/utils";

export function GalleryPreviewGrid({ items }: { items: GalleryItem[] }) {
  return (
    <StaggerList className="mt-12 grid auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 lg:auto-rows-[13.5rem] lg:grid-cols-4">
      {items.map((item, i) => (
        <StaggerItem key={item.image} className={cn(i === 0 && "col-span-2 row-span-2", "h-full")}>
          <motion.figure
            whileHover={{ scale: 1.025, transition: { type: "spring", stiffness: 260, damping: 20 } }}
            className="group relative h-full overflow-hidden rounded-3xl shadow-soft"
          >
            <AssetImage
              image={item.image}
              alt={item.caption}
              sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
              className="transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <motion.figcaption
              initial={{ opacity: 0, y: 8 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brown/85 to-transparent px-4 pb-3 pt-10 font-serif text-sm text-cream sm:text-base"
            >
              {item.caption}
            </motion.figcaption>
          </motion.figure>
        </StaggerItem>
      ))}
    </StaggerList>
  );
}
