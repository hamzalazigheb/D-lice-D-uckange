import type { ImageKey } from "./images";

export type GalleryFilter = "tous" | "pains" | "viennoiseries" | "patisseries" | "gateaux" | "boutique";

export const galleryFilters: { id: GalleryFilter; label: string }[] = [
  { id: "tous", label: "Tout" },
  { id: "pains", label: "Pains" },
  { id: "viennoiseries", label: "Viennoiseries" },
  { id: "patisseries", label: "Pâtisseries" },
  { id: "gateaux", label: "Gâteaux" },
  { id: "boutique", label: "La boutique" },
];

export interface GalleryItem {
  image: ImageKey;
  category: Exclude<GalleryFilter, "tous">;
  caption: string;
}

/** Candidate photos — the gallery only displays those whose file exists. */
export const galleryItems: GalleryItem[] = [
  { image: "breadPhoto", category: "pains", caption: "Pain artisanal à la croûte dorée" },
  { image: "croissant", category: "viennoiseries", caption: "Croissants dorés" },
  { image: "strawberryCake", category: "gateaux", caption: "Gâteau aux fraises" },
  { image: "baguette", category: "pains", caption: "Baguettes croustillantes" },
  { image: "painChocolat", category: "viennoiseries", caption: "Croissant et pain au chocolat" },
  { image: "tart", category: "patisseries", caption: "Tartelettes aux fruits et éclair" },
  { image: "chocolateCake", category: "gateaux", caption: "Gâteau au chocolat" },
  { image: "interior", category: "boutique", caption: "Notre boutique à Uckange" },
  { image: "storefront", category: "boutique", caption: "La devanture de la boutique" },
];
