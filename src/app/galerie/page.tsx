import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getAvailableGallery } from "@/lib/images-server";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Galerie photos — Pains, viennoiseries, pâtisseries et gâteaux",
  description:
    "Parcourez la galerie de la boulangerie pâtisserie Délice D'Uckange : pains artisanaux, viennoiseries dorées, pâtisseries et gâteaux.",
  path: "/galerie",
});

export default function GalleryPage() {
  const items = getAvailableGallery();
  return (
    <>
      <PageHero
        eyebrow="En images"
        title="Galerie"
        subtitle="Pains, viennoiseries, pâtisseries et gâteaux : un aperçu de ce qui sort de notre fournil."
      />
      <section className="pb-8 sm:pb-12">
        <Container>
          {items.length > 0 ? (
            <GalleryGrid items={items} />
          ) : (
            <p className="text-center text-ink/70">Les photos arrivent bientôt.</p>
          )}
        </Container>
      </section>
    </>
  );
}
