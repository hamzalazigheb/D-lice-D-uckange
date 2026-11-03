"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AssetImage } from "@/components/ui/AssetImage";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { WheatDivider, WheatSprig } from "@/components/ui/Wheat";
import type { ImageKey } from "@/lib/images";

export function CakeCtaInner({ image }: { image: ImageKey }) {
  return (
    <section className="section-y" aria-labelledby="titre-commande">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-5xl bg-brown text-cream shadow-lift"
        >
          <WheatSprig className="absolute -bottom-6 left-1/2 hidden h-64 w-48 text-caramel/20 lg:block" />
          <div className="relative grid lg:grid-cols-2">
            {/* Parallax photo side */}
            <div className="relative min-h-[18rem] overflow-hidden sm:min-h-[24rem] lg:min-h-[30rem]">
              <ParallaxImage factor={40} className="absolute inset-0 h-full w-full">
                <AssetImage
                  image={image}
                  alt="La boulangerie Délice D'Uckange"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-[12%_85%]"
                />
              </ParallaxImage>
              <div className="absolute inset-0 bg-gradient-to-t from-brown/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-brown/70" />
            </div>

            <div className="relative flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-14 lg:py-16">
              <Reveal>
                <p className="font-nav text-xs font-semibold uppercase tracking-[0.3em] text-caramel">
                  Sur mesure
                </p>
                <h2
                  id="titre-commande"
                  className="mt-3 font-serif text-4xl font-semibold leading-tight text-cream sm:text-5xl"
                >
                  Une commande de gâteau&nbsp;?
                </h2>
                <WheatDivider className="mt-4 justify-start" />
                <p className="mt-5 max-w-md text-base leading-relaxed text-cream/85 sm:text-lg">
                  Décrivez-nous votre projet et nous réalisons un gâteau personnalisé selon vos envies.
                </p>
                <motion.div
                  className="mt-8"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Button
                    href="/commandes-gateaux"
                    variant="light"
                    icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                    className="w-full sm:w-auto"
                  >
                    Faire une demande
                  </Button>
                </motion.div>
              </Reveal>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
