import type { Metadata } from "next";
import { Cake, Info } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { WheatDivider } from "@/components/ui/Wheat";
import { buildMetadata } from "@/lib/metadata";
import { categories } from "@/lib/products";

export const metadata: Metadata = buildMetadata({
  title: "Nos produits — Pains, viennoiseries, pâtisseries et gâteaux",
  description:
    "Découvrez les pains, viennoiseries, pâtisseries, gâteaux et snacking de la boulangerie artisanale Délice D'Uckange, à Uckange.",
  path: "/produits",
  keywords: ["pain artisanal Uckange", "viennoiseries Uckange"],
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Notre carte"
        title="Nos Produits"
        subtitle="Pains, viennoiseries, pâtisseries, gâteaux et snacking : une sélection artisanale, fraîche et savoureuse."
      />

      <div className="sticky top-[4.25rem] z-30 border-b border-beige bg-cream/95 backdrop-blur-md sm:top-[4.25rem]">
        <Container>
          <nav aria-label="Catégories de produits">
            <ul className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] sm:justify-center">
              {categories.map((c) => (
                <li key={c.id} className="shrink-0">
                  <a
                    href={`#${c.id}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-beige bg-white px-5 font-nav text-[0.8rem] font-medium text-brown transition-colors hover:border-brown hover:bg-brown hover:text-cream"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>

      <Container className="pt-10">
        <div className="flex items-start gap-3 rounded-2xl border border-caramel/30 bg-beige/40 p-4 text-sm text-ink/80">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-caramel-dark" aria-hidden="true" />
          <p>
            Sélection présentée à titre indicatif : les produits, disponibilités et tarifs varient selon les jours et
            les saisons. Renseignez-vous directement en boutique.
          </p>
        </div>
      </Container>

      {categories.map((category) => (
        <section
          key={category.id}
          id={category.id}
          aria-labelledby={`titre-${category.id}`}
          className="scroll-mt-40 pt-14 sm:pt-20"
        >
          <Container>
            <Reveal className="max-w-2xl">
              <h2 id={`titre-${category.id}`} className="font-serif text-3xl font-semibold text-brown sm:text-4xl">
                {category.label}
              </h2>
              <WheatDivider className="mt-3 justify-start" />
              <p className="mt-3 text-base text-ink/80">{category.intro}</p>
            </Reveal>
            <ul className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {category.products.map((product, i) => (
                <li key={product.id}>
                  <Reveal delay={(i % 4) * 0.07} className="h-full">
                    <ProductCard product={product} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ))}

      <section className="section-y">
        <Container>
          <Reveal className="rounded-5xl bg-beige/60 px-6 py-12 text-center sm:px-12">
            <h2 className="font-serif text-3xl font-semibold text-brown sm:text-4xl">Un gâteau sur mesure&nbsp;?</h2>
            <p className="mx-auto mt-3 max-w-lg text-ink/80">
              Anniversaire, mariage, baptême… Décrivez-nous votre projet et nous le réalisons.
            </p>
            <div className="mt-7 flex justify-center">
              <Button href="/commandes-gateaux" icon={<Cake className="h-4 w-4" aria-hidden="true" />}>
                Commander un gâteau
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
