"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cake } from "lucide-react";
import { AssetImage } from "@/components/ui/AssetImage";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WheatDivider } from "@/components/ui/Wheat";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  return (
    <section
      aria-labelledby="titre-hero"
      className="relative isolate overflow-hidden rounded-b-[2rem] bg-brown-dark sm:rounded-b-[3.5rem]"
    >
      {/* Background photograph */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 -z-10"
        style={{ position: "absolute" }}
      >
        <AssetImage
          image="hero"
          priority
          sizes="100vw"
          className="object-[68%_50%] lg:object-center"
        />
      </motion.div>

      {/* Readability overlays: uniform on mobile, left-to-right gradient on desktop */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brown-dark/70 lg:hidden" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-brown-dark/95 via-brown-dark/70 to-brown-dark/5 lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-brown-dark/50 to-transparent"
      />

      <Container className="relative flex min-h-[34rem] items-center py-16 sm:min-h-[38rem] lg:min-h-[40rem] lg:py-24">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl">
          <motion.p
            variants={item}
            className="font-nav text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-beige sm:text-xs"
          >
            Boulangerie · Pâtisserie
          </motion.p>
          <motion.h1
            id="titre-hero"
            variants={item}
            className="mt-5 font-serif text-[2.9rem] font-semibold leading-[1.02] text-cream drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:text-7xl lg:text-[5rem] xl:text-[5.5rem]"
          >
            Délice D&apos;Uckange
          </motion.h1>
          <motion.p variants={item} className="mt-4 font-serif text-2xl italic text-beige sm:text-3xl">
            L&apos;Artisanat au quotidien
          </motion.p>
          <motion.div variants={item}>
            <WheatDivider className="mt-5 justify-start !text-caramel" />
          </motion.div>
          <motion.p variants={item} className="mt-6 max-w-lg text-base leading-relaxed text-cream/90 sm:text-lg">
            Pains frais, viennoiseries dorées, pâtisseries gourmandes et gâteaux personnalisés, préparés avec
            passion dans notre boulangerie à Uckange.
          </motion.p>
          <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              href="/produits"
              variant="caramel"
              className="w-full sm:w-auto"
              icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            >
              Découvrir nos produits
            </Button>
            <Button
              href="/commandes-gateaux"
              variant="outlineLight"
              className="w-full sm:w-auto"
              icon={<Cake className="h-4 w-4" aria-hidden="true" />}
            >
              Commander un gâteau
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
