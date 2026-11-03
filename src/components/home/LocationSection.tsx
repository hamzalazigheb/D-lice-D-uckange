import { Clock, ExternalLink, MapPin, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  formatAddress,
  getCallHref,
  getDirectionsHref,
  getMapsSearchHref,
  siteConfig,
} from "@/lib/site";

/** Groups consecutive days with identical hours, e.g. "Lundi – Vendredi : 05:00 – 20:00". */
function groupHours(hours: { days: string; hours: string }[]) {
  const groups: { label: string; hours: string }[] = [];
  for (const row of hours) {
    const last = groups[groups.length - 1];
    if (last && last.hours === row.hours) {
      // extend the range
      const parts = last.label.split(" – ");
      last.label = `${parts[0]} – ${row.days}`;
    } else {
      groups.push({ label: row.days, hours: row.hours });
    }
  }
  return groups;
}

function HoursDisplay({ hours }: { hours: { days: string; hours: string }[] }) {
  const groups = groupHours(hours);
  return (
    <dl className="space-y-1.5">
      {groups.map((g) => (
        <div key={g.label} className="flex flex-wrap justify-between gap-x-4">
          <dt className="font-medium text-brown">{g.label}</dt>
          <dd className="font-semibold tabular-nums">{g.hours}</dd>
        </div>
      ))}
    </dl>
  );
}

function Row({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof MapPin;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-beige text-brown">
        <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h3 className="font-serif text-lg font-semibold text-brown">{title}</h3>
        <div className="mt-1 text-[0.95rem] leading-relaxed text-ink/85">{children}</div>
      </div>
    </div>
  );
}

const muted = "italic text-ink/55";

export function LocationSection({ asPageHeading = false }: { asPageHeading?: boolean }) {
  const { contact } = siteConfig;
  const address = formatAddress();
  const mapSrc =
    contact.mapEmbedUrl ??
    (address ? `https://www.google.com/maps?q=${encodeURIComponent(`${address}, France`)}&output=embed` : null);

  return (
    <section id="coordonnees" className="section-y" aria-labelledby="titre-lieu">
      <Container>
        <SectionHeading
          id="titre-lieu"
          as={asPageHeading ? "h1" : "h2"}
          eyebrow="Nous trouver"
          title="Venez nous rendre visite"
          subtitle="Retrouvez-nous au cœur d'Uckange pour déguster nos produits frais du jour."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="h-full rounded-4xl bg-white p-6 shadow-soft sm:p-9">
              <div className="space-y-7">
                <Row icon={MapPin} title="Adresse">
                  {contact.address ? (
                    <address className="not-italic">
                      {contact.address.street}
                      <br />
                      {contact.address.postalCode} {contact.address.city}
                    </address>
                  ) : (
                    <p className={muted}>Adresse à renseigner — Uckange (57)</p>
                  )}
                </Row>

                <Row icon={Clock} title="Horaires d'ouverture">
                  {contact.openingHours ? (
                    <HoursDisplay hours={contact.openingHours} />
                  ) : (
                    <p className={muted}>Horaires à renseigner</p>
                  )}
                </Row>

                <Row icon={Phone} title="Téléphone">
                  {contact.phone ? (
                    <a
                      href={getCallHref()}
                      className="font-semibold text-brown underline-offset-4 hover:text-caramel-dark hover:underline"
                    >
                      {contact.phone}
                    </a>
                  ) : (
                    <p className={muted}>Numéro de téléphone à renseigner</p>
                  )}
                </Row>
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={getDirectionsHref()}
                  className="w-full sm:w-auto"
                  icon={<Navigation className="h-4 w-4" aria-hidden="true" />}
                >
                  Itinéraire
                </Button>
                {contact.phone && (
                  <Button
                    href={getCallHref()}
                    variant="secondary"
                    className="w-full sm:w-auto"
                    icon={<Phone className="h-4 w-4" aria-hidden="true" />}
                  >
                    Appeler
                  </Button>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative h-full min-h-[22rem] overflow-hidden rounded-4xl border-4 border-white bg-beige shadow-soft">
              {mapSrc ? (
                <iframe
                  title="Carte Google Maps — Délice D'Uckange"
                  src={mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
                  <MapPin className="h-10 w-10 text-caramel" strokeWidth={1.4} aria-hidden="true" />
                  <p className="font-serif text-xl text-brown">Carte Google Maps à intégrer</p>
                  <p className="max-w-xs text-sm text-ink/70">
                    Renseignez l&apos;adresse dans <code>src/lib/site.ts</code> pour afficher la carte ici.
                  </p>
                  <Button
                    href={getMapsSearchHref()}
                    variant="secondary"
                    size="md"
                    icon={<ExternalLink className="h-4 w-4" aria-hidden="true" />}
                  >
                    Ouvrir Google Maps
                  </Button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
