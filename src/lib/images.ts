/**
 * Asset registry. Every image used on the site is declared here once.
 * Files live in /public/images. If a file is missing, <AssetImage /> shows
 * an illustrated fallback matching `art`, so the layout never breaks.
 */

export type ArtKind =
  | "logo"
  | "hero"
  | "bread"
  | "baguette"
  | "croissant"
  | "painChocolat"
  | "tart"
  | "chocolateCake"
  | "strawberryCake"
  | "interior"
  | "viennoiserie"
  | "patisserie"
  | "cake"
  | "snack";

export interface AssetDef {
  src: string;
  alt: string;
  art: ArtKind;
}

const dir = "/images";

export const IMAGES = {
  // Logo fourni (PNG transparent, rogné) — scripts/prepare-assets.ps1
  logo: {
    src: `${dir}/logo-delice-duckange.png`,
    alt: "Délice D'Uckange — Boulangerie Pâtisserie",
    art: "logo",
  },
  hero: {
    src: `${dir}/hero-banner-boulangerie.jpg`,
    alt: "Devanture de la boulangerie Délice D'Uckange, avec ses croissants, pains et pâtisseries",
    art: "hero",
  },
  // Même photo haute définition que le hero : devanture de la boutique.
  storefront: {
    src: `${dir}/hero-banner-boulangerie.jpg`,
    alt: "Devanture de la boulangerie pâtisserie Délice D'Uckange",
    art: "interior",
  },
  categoryBread: {
    src: `${dir}/carte-categorie-pains.jpg`,
    alt: "Pains artisanaux",
    art: "bread",
  },
  categoryViennoiserie: {
    src: `${dir}/carte-categorie-viennoiseries.jpg`,
    alt: "Viennoiseries dorées",
    art: "viennoiserie",
  },
  categoryPatisserie: {
    src: `${dir}/carte-categorie-patisseries.jpg`,
    alt: "Pâtisseries gourmandes",
    art: "patisserie",
  },
  categoryCake: {
    src: `${dir}/carte-categorie-gateaux.jpg`,
    alt: "Gâteaux sur mesure",
    art: "cake",
  },
  breadPhoto: {
    src: `${dir}/photo-pain-artisanal.jpg`,
    alt: "Pain artisanal à la croûte dorée",
    art: "bread",
  },
  baguette: {
    src: `${dir}/photo-baguette.jpg`,
    alt: "Baguette croustillante",
    art: "baguette",
  },
  croissant: {
    src: `${dir}/photo-croissant.jpg`,
    alt: "Croissant pur beurre",
    art: "croissant",
  },
  painChocolat: {
    src: `${dir}/photo-pain-chocolat.jpg`,
    alt: "Pain au chocolat doré",
    art: "painChocolat",
  },
  tart: {
    src: `${dir}/photo-tarte-fruits.jpg`,
    alt: "Tarte aux fruits frais",
    art: "tart",
  },
  chocolateCake: {
    src: `${dir}/photo-gateau-chocolat.jpg`,
    alt: "Gâteau au chocolat",
    art: "chocolateCake",
  },
  strawberryCake: {
    src: `${dir}/photo-gateau-fraises.jpg`,
    alt: "Gâteau aux fraises",
    art: "strawberryCake",
  },
  interior: {
    src: `${dir}/photo-interieur-boulangerie.jpg`,
    alt: "Intérieur chaleureux de la boulangerie pâtisserie Délice D'Uckange, vitrines garnies de viennoiseries",
    art: "interior",
  },
} as const satisfies Record<string, AssetDef>;

export type ImageKey = keyof typeof IMAGES;
