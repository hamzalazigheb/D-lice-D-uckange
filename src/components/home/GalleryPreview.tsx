// SERVER COMPONENT — fetches data, renders a client child for animations.
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAvailableGallery } from "@/lib/images-server";
import { GalleryPreviewGrid } from "./GalleryPreviewGrid";

export function GalleryPreview() {
  const items = getAvailableGallery().slice(0, 5);
  if (items.length === 0) return null;

  return (
    <section className="section-y bg-beige/40" aria-labelledby="titre-galerie">
      <Container>
        <SectionHeading
          id="titre-galerie"
          title="Un aperçu de notre savoir-faire"
          subtitle="Pains, viennoiseries, pâtisseries et gâteaux : quelques images de nos créations."
        />
        <GalleryPreviewGrid items={items} />
        <Reveal className="mt-10 flex justify-center">
          <Button href="/galerie" variant="secondary" icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
            Voir toute la galerie
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
