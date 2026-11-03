import type { Metadata } from "next";
import { Cake, MessageSquareText, Phone, Store } from "lucide-react";
import { CakeRequestForm } from "@/components/cake/CakeRequestForm";
import { AssetImage } from "@/components/ui/AssetImage";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/metadata";
import { getCallHref, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Commandes de gâteaux personnalisés à Uckange",
  description:
    "Anniversaire, mariage, baptême : demandez un gâteau personnalisé à la boulangerie pâtisserie Délice D'Uckange. Décrivez votre projet, nous le réalisons.",
  path: "/commandes-gateaux",
  keywords: ["gâteau anniversaire Uckange", "commande gâteau Uckange"],
});

const steps = [
  { icon: MessageSquareText, title: "Décrivez votre projet", text: "Occasion, date, nombre de personnes, parfum et inspirations." },
  { icon: Phone, title: "Nous confirmons", text: "La boulangerie valide avec vous les détails de votre gâteau." },
  { icon: Store, title: "Retrait en boutique", text: "Retrouvez votre création à Uckange, le jour convenu." },
];

export default function CakeOrdersPage() {
  return (
    <>
      <PageHero
        eyebrow="Sur mesure"
        title="Commandes de Gâteaux"
        subtitle="Décrivez-nous votre projet et nous réalisons un gâteau personnalisé selon vos envies."
      />

      <section className="pb-8 sm:pb-16">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <aside className="space-y-8">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-4xl shadow-card">
                <AssetImage image="categoryCake" sizes="(min-width: 1024px) 40vw, 100vw" />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-serif text-2xl font-semibold text-brown">Comment ça marche&nbsp;?</h2>
              <ol className="mt-5 space-y-5">
                {steps.map(({ icon: Icon, title, text }, i) => (
                  <li key={title} className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-beige text-brown">
                      <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-brown">
                        {i + 1}. {title}
                      </h3>
                      <p className="mt-0.5 text-sm text-ink/75">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            {siteConfig.contact.phone && (
              <Reveal delay={0.15}>
                <div className="rounded-3xl bg-brown p-6 text-cream">
                  <p className="font-serif text-xl">Une question&nbsp;? Appelez-nous.</p>
                  <p className="mt-1 text-sm text-cream/80">{siteConfig.contact.phone}</p>
                  <div className="mt-4">
                    <Button href={getCallHref()} variant="light" size="md" icon={<Phone className="h-4 w-4" aria-hidden="true" />}>
                      Nous appeler
                    </Button>
                  </div>
                </div>
              </Reveal>
            )}
          </aside>

          <Reveal>
            <div className="mb-5 flex items-center gap-3">
              <Cake className="h-6 w-6 text-caramel" strokeWidth={1.6} aria-hidden="true" />
              <h2 className="font-serif text-3xl font-semibold text-brown">Faire une demande</h2>
            </div>
            <CakeRequestForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
