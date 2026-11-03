import type { Metadata } from "next";
import { Benefits } from "@/components/home/Benefits";
import { CakeCta } from "@/components/home/CakeCta";
import { CategoryCards } from "@/components/home/CategoryCards";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Hero } from "@/components/home/Hero";
import { LocationSection } from "@/components/home/LocationSection";
import { PaymentOptions } from "@/components/home/PaymentOptions";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Boulangerie Pâtisserie à Uckange — Pains, viennoiseries & gâteaux",
  description:
    "Délice D'Uckange, boulangerie artisanale à Uckange : pains frais, viennoiseries dorées, pâtisseries gourmandes et gâteaux personnalisés sur commande.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryCards />
      <Benefits />
      <CakeCta />
      <GalleryPreview />
      <LocationSection />
      <PaymentOptions />
    </>
  );
}
