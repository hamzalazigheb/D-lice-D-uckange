import type { Metadata } from "next";
import { Cake } from "lucide-react";
import { LocationSection } from "@/components/home/LocationSection";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact et accès — Boulangerie à Uckange",
  description:
    "Contactez la boulangerie pâtisserie Délice D'Uckange : adresse, téléphone, plan d'accès et itinéraire à Uckange.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <LocationSection asPageHeading />
      <section className="pb-8">
        <Container>
          <Reveal className="rounded-5xl bg-beige/60 px-6 py-10 text-center sm:px-12">
            <h2 className="font-serif text-3xl font-semibold text-brown">Un projet de gâteau&nbsp;?</h2>
            <p className="mx-auto mt-3 max-w-lg text-ink/80">
              Décrivez-nous vos envies grâce à notre formulaire de demande.
            </p>
            <div className="mt-6 flex justify-center">
              <Button href="/commandes-gateaux" icon={<Cake className="h-4 w-4" aria-hidden="true" />}>
                Faire une demande
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
