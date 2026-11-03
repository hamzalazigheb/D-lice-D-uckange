import { siteConfig } from "@/lib/site";

/**
 * LocalBusiness JSON-LD built ONLY from verified information in siteConfig
 * (name, address, phone). Opening hours, e-mail and social profiles are added
 * automatically as soon as they are filled in. No ratings or prices are invented.
 */
export function LocalBusinessJsonLd() {
  const { contact, socials } = siteConfig;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}/images/hero-banner-boulangerie.jpg`,
    logo: `${siteConfig.url}/images/logo-delice-duckange.png`,
    servesCuisine: "Boulangerie, Pâtisserie",
    areaServed: siteConfig.town,
    address: {
      "@type": "PostalAddress",
      ...(contact.address
        ? { streetAddress: contact.address.street, postalCode: contact.address.postalCode }
        : {}),
      addressLocality: siteConfig.town,
      addressCountry: siteConfig.country,
    },
  };

  if (contact.phone) data.telephone = contact.phone;
  // openingHoursSpecification — same slot for every day
  if (contact.openingHours?.length) {
    const dayMap: Record<string, string> = {
      Lundi: "Monday", Mardi: "Tuesday", Mercredi: "Wednesday",
      Jeudi: "Thursday", Vendredi: "Friday", Samedi: "Saturday", Dimanche: "Sunday",
    };
    data.openingHoursSpecification = contact.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${dayMap[h.days] ?? h.days}`,
      opens: h.hours.split(" – ")[0]?.trim(),
      closes: h.hours.split(" – ")[1]?.trim(),
    }));
  }
  if (contact.email) data.email = contact.email;
  const sameAs = [socials.facebook, socials.instagram].filter(Boolean);
  if (sameAs.length) data.sameAs = sameAs;

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
