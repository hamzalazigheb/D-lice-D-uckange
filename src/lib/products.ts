import type { ImageKey } from "./images";
import type { ArtKind } from "./images";

/**
 * DONNÉES DE DÉMONSTRATION — à remplacer par la vraie carte de la boulangerie.
 * - `price` : laisser `null` tant que le prix n'est pas vérifié (en euros, ex. 1.2).
 * - Les prix ne s'affichent que si `siteConfig.showPrices` est à `true`.
 */

export type CategoryId = "pains" | "viennoiseries" | "patisseries" | "gateaux" | "snacking";

export interface Product {
  id: string;
  name: string;
  description: string;
  /** Prix en euros ; `null` = non communiqué. */
  price: number | null;
  /** Clé du registre d'images. Facultatif → illustration de repli. */
  image?: ImageKey;
  /** Illustration de repli si l'image n'existe pas. */
  art: ArtKind;
}

export interface Category {
  id: CategoryId;
  label: string;
  intro: string;
  products: Product[];
}

export const categories: Category[] = [
  {
    id: "pains",
    label: "Pains",
    intro: "Des pains pétris, façonnés et cuits chaque jour, à la croûte dorée et à la mie généreuse.",
    products: [
      {
        id: "baguette-tradition",
        name: "Baguette tradition",
        description: "Croûte croustillante, mie alvéolée et parfum de blé.",
        price: null,
        image: "baguette",
        art: "baguette",
      },
      {
        id: "pain-campagne",
        name: "Pain de campagne",
        description: "Un pain rustique à la croûte épaisse, idéal à partager.",
        price: null,
        image: "breadPhoto",
        art: "bread",
      },
      {
        id: "pain-cereales",
        name: "Pain aux céréales",
        description: "Riche en graines, pour une mie savoureuse et croquante.",
        price: null,
        image: "categoryBread",
        art: "bread",
      },
      {
        id: "pain-levain",
        name: "Pain au levain",
        description: "Fermentation lente pour une mie moelleuse et une belle conservation.",
        price: null,
        art: "bread",
      },
    ],
  },
  {
    id: "viennoiseries",
    label: "Viennoiseries",
    intro: "Feuilletées, beurrées et dorées : le petit-déjeuner comme on l'aime.",
    products: [
      {
        id: "croissant",
        name: "Croissant",
        description: "Feuilletage fin et léger, doré à souhait.",
        price: null,
        image: "croissant",
        art: "croissant",
      },
      {
        id: "pain-chocolat",
        name: "Pain au chocolat",
        description: "Deux barres de chocolat dans une pâte feuilletée croustillante.",
        price: null,
        image: "painChocolat",
        art: "painChocolat",
      },
      {
        id: "brioche",
        name: "Brioche",
        description: "Moelleuse et fondante, à déguster nature ou en tartine.",
        price: null,
        art: "viennoiserie",
      },
      {
        id: "chausson-pommes",
        name: "Chausson aux pommes",
        description: "Pâte feuilletée et compote de pommes parfumée.",
        price: null,
        art: "viennoiserie",
      },
    ],
  },
  {
    id: "patisseries",
    label: "Pâtisseries",
    intro: "Tartelettes, éclairs et douceurs individuelles, façonnés avec précision.",
    products: [
      {
        id: "tarte-fruits",
        name: "Tartelette aux fruits",
        description: "Pâte sablée, crème onctueuse et fruits frais de saison.",
        price: null,
        image: "tart",
        art: "tart",
      },
      {
        id: "eclair-chocolat",
        name: "Éclair au chocolat",
        description: "Pâte à choux légère garnie d'une crème au chocolat.",
        price: null,
        image: "categoryPatisserie",
        art: "patisserie",
      },
      {
        id: "mille-feuille",
        name: "Mille-feuille",
        description: "Pâte feuilletée caramélisée et crème pâtissière vanille.",
        price: null,
        art: "patisserie",
      },
      {
        id: "tartelette-citron",
        name: "Tartelette au citron",
        description: "Une crème citron acidulée sur un sablé croustillant.",
        price: null,
        art: "tart",
      },
    ],
  },
  {
    id: "gateaux",
    label: "Gâteaux",
    intro: "Entremets et gâteaux pour toutes vos occasions — personnalisables sur commande.",
    products: [
      {
        id: "gateau-fraises",
        name: "Gâteau aux fraises",
        description: "Biscuit moelleux, crème légère et fraises fraîches.",
        price: null,
        image: "strawberryCake",
        art: "strawberryCake",
      },
      {
        id: "gateau-chocolat",
        name: "Gâteau au chocolat",
        description: "Un gâteau intense et fondant pour les gourmands.",
        price: null,
        image: "chocolateCake",
        art: "chocolateCake",
      },
      {
        id: "entremets",
        name: "Entremets de saison",
        description: "Une création renouvelée au fil des saisons.",
        price: null,
        art: "cake",
      },
      {
        id: "gateau-anniversaire",
        name: "Gâteau d'anniversaire",
        description: "Personnalisé selon vos envies, sur commande uniquement.",
        price: null,
        image: "categoryCake",
        art: "cake",
      },
    ],
  },
  {
    id: "snacking",
    label: "Snacking",
    intro: "Pour une pause déjeuner gourmande, sur place ou à emporter.",
    products: [
      {
        id: "sandwich-jambon-beurre",
        name: "Sandwich jambon-beurre",
        description: "Le classique, dans une baguette croustillante.",
        price: null,
        art: "snack",
      },
      {
        id: "quiche",
        name: "Quiche",
        description: "Pâte brisée et appareil crémeux, servie tiède.",
        price: null,
        art: "snack",
      },
      {
        id: "feuillete-sale",
        name: "Feuilleté salé",
        description: "Un en-cas fondant et gourmand.",
        price: null,
        art: "snack",
      },
      {
        id: "salade-repas",
        name: "Salade repas",
        description: "Une option fraîche et gourmande pour le déjeuner.",
        price: null,
        art: "snack",
      },
    ],
  },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(price);
}
