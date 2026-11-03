"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AssetImage } from "@/components/ui/AssetImage";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerItem, StaggerList } from "@/components/ui/StaggerList";
import type { ImageKey } from "@/lib/images";

const cards: {
  title: string;
  description: string;
  href: string;
  image: ImageKey;
}[] = [
  { title: "Nos Pains",         description: "Baguettes, pains de campagne et pains aux céréales.", href: "/produits#pains",           image: "categoryBread"       },
  { title: "Viennoiseries",     description: "Croissants, pains au chocolat et douceurs feuilletées.", href: "/produits#viennoiseries",    image: "categoryViennoiserie" },
  { title: "Pâtisseries",       description: "Tartelettes, éclairs et créations gourmandes.",      href: "/produits#patisseries",     image: "categoryPatisserie"  },
  { title: "Gâteaux sur mesure",description: "Entremets et gâteaux personnalisés pour vos occasions.", href: "/commandes-gateaux",       image: "categoryCake"        },
];

export function CategoryCards() {
  return (
    <section className="section-y" aria-labelledby="titre-gourmandises">
      <Container>
        <SectionHeading
          id="titre-gourmandises"
          title="Nos Gourmandises"
          subtitle="Découvrez notre sélection de produits artisanaux, frais et savoureux."
        />
        <StaggerList className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-7">
          {cards.map((card) => (
            <StaggerItem key={card.title}>
              <motion.article
                whileHover={{ y: -10, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="group relative h-full overflow-hidden rounded-3xl bg-white p-2.5 shadow-soft transition-shadow duration-300 hover:shadow-lift sm:rounded-4xl sm:p-3"
              >
                <div className="relative aspect-[4/3.6] overflow-hidden rounded-[1.25rem] sm:rounded-3xl">
                  <AssetImage
                    image={card.image}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* shimmer on hover */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </div>
                <div className="flex items-end justify-between gap-3 px-2 pb-2 pt-4 sm:px-3 sm:pb-3">
                  <div>
                    <h3 className="font-serif text-lg font-semibold leading-snug text-brown sm:text-2xl">
                      <Link
                        href={card.href}
                        className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                      >
                        {card.title}
                      </Link>
                    </h3>
                    <p className="mt-1.5 text-[0.85rem] leading-snug text-ink/75 sm:text-sm">{card.description}</p>
                  </div>
                  <motion.span
                    aria-hidden="true"
                    animate={{}}
                    whileHover={{ rotate: 45 }}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brown/40 text-brown transition-all duration-300 group-hover:border-brown group-hover:bg-brown group-hover:text-cream sm:h-10 sm:w-10"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}
