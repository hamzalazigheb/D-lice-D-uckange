/**
 * Central, editable site configuration.
 *
 * IMPORTANT — only VERIFIED business information belongs here.
 * Every `null` value below is an unknown that the owner must fill in.
 * The UI automatically shows an honest placeholder while a value is `null`.
 */

export const siteConfig = {
  name: "Délice D'Uckange",
  shortName: "Délice D'Uckange",
  tagline: "L'Artisanat au quotidien",
  description:
    "Boulangerie et pâtisserie artisanale à Uckange : pains frais, viennoiseries dorées, pâtisseries gourmandes et gâteaux personnalisés.",
  locale: "fr_FR",
  /** Public URL — set NEXT_PUBLIC_SITE_URL in production. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  town: "Uckange",
  country: "FR",

  /** ------- À COMPLÉTER PAR LE COMMERÇANT (null = non renseigné) ------- */
  contact: {
    /** Fournie par le commerçant (fiche Google). */
    address: { street: "11 Rue de Fameck", postalCode: "57270", city: "Uckange" } as {
      street: string;
      postalCode: string;
      city: string;
    } | null,
    /** Fourni par le commerçant (fiche Google) — affiché tel quel. */
    phone: "+33 3 82 53 62 97" as string | null,
    email: null as string | null,
    /** URL d'intégration Google Maps (https://www.google.com/maps/embed?pb=...) */
    mapEmbedUrl: null as string | null,
    openingHours: [
      { days: "Lundi",    hours: "05:00 – 20:00" },
      { days: "Mardi",    hours: "05:00 – 20:00" },
      { days: "Mercredi", hours: "05:00 – 20:00" },
      { days: "Jeudi",    hours: "05:00 – 20:00" },
      { days: "Vendredi", hours: "05:00 – 20:00" },
      { days: "Samedi",   hours: "05:00 – 20:00" },
      { days: "Dimanche", hours: "05:00 – 20:00" },
    ] as { days: string; hours: string }[] | null,
  },

  socials: {
    facebook: null as string | null,
    instagram: null as string | null,
    tiktok: "https://www.tiktok.com/@delices.duckange" as string | null,
  },

  /** Affiche les prix du catalogue. Laisser à false tant qu'ils ne sont pas vérifiés. */
  showPrices: false,

  /**
   * Endpoint recevant les demandes de gâteaux (Formspree, Getform, API maison…).
   * Tant qu'il est vide, le formulaire n'envoie RIEN et l'indique au visiteur.
   */
  cakeFormEndpoint: process.env.NEXT_PUBLIC_CAKE_FORM_ENDPOINT || null,
};

export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/produits", label: "Nos Produits" },
  { href: "/commandes-gateaux", label: "Commandes de Gâteaux" },
  { href: "/galerie", label: "Galerie" },
  { href: "/contact", label: "Contact" },
] as const;

/** Lien « Nous appeler » : tel: si le numéro est connu, sinon page contact. */
export function getCallHref(): string {
  const phone = siteConfig.contact.phone;
  if (!phone) return "/contact#coordonnees";
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** Adresse sur une ligne, ou null si non renseignée. */
export function formatAddress(): string | null {
  const a = siteConfig.contact.address;
  return a ? `${a.street}, ${a.postalCode} ${a.city}` : null;
}

/** Itinéraire Google Maps — utilise l'adresse si connue, sinon le nom et la ville. */
export function getDirectionsHref(): string {
  const a = formatAddress();
  const destination = a ? `${a}, France` : `${siteConfig.name}, ${siteConfig.town}, France`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}

/** Lien de recherche Google Maps vers l'établissement. */
export function getMapsSearchHref(): string {
  const a = formatAddress();
  const q = a ? `${a}, France` : `${siteConfig.name}, ${siteConfig.town}, France`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}
