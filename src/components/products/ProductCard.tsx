"use client";

import { motion } from "framer-motion";
import { AssetImage } from "@/components/ui/AssetImage";
import { formatPrice, type Product } from "@/lib/products";
import { siteConfig } from "@/lib/site";

export function ProductCard({ product }: { product: Product }) {
  const showPrice = siteConfig.showPrices && product.price !== null;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white p-2.5 shadow-soft transition-shadow duration-300 hover:shadow-lift sm:p-3"
    >
      <div className="relative aspect-[4/3.4] overflow-hidden rounded-[1.25rem] sm:rounded-3xl">
        <AssetImage
          image={product.image}
          art={product.art}
          alt={product.name}
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col px-2 pb-2 pt-4 sm:px-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-semibold leading-snug text-brown sm:text-xl">{product.name}</h3>
          {showPrice && (
            <span className="shrink-0 rounded-full bg-beige px-3 py-1 font-nav text-xs font-semibold text-brown">
              {formatPrice(product.price!)}
            </span>
          )}
        </div>
        <p className="mt-1.5 text-[0.85rem] leading-snug text-ink/75 sm:text-sm">{product.description}</p>
      </div>
    </motion.article>
  );
}
