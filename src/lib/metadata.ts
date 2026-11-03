import type { Metadata } from "next";
import { siteConfig } from "./site";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

export const baseKeywords = [
  "Boulangerie Uckange",
  "Pâtisserie Uckange",
  "Gâteaux personnalisés Uckange",
  "Boulangerie artisanale Uckange",
];

export function buildMetadata({ title, description, path, keywords = [] }: PageMeta): Metadata {
  return {
    title,
    description,
    keywords: [...baseKeywords, ...keywords],
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
