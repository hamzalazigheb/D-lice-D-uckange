import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/ui/SocialIcons";
import { WheatSprig } from "@/components/ui/Wheat";
import { navLinks, siteConfig } from "@/lib/site";
import { Logo } from "./Logo";

function Placeholder({ children }: { children: string }) {
  return <span className="italic text-cream/60">{children}</span>;
}

export function Footer() {
  const { contact, socials } = siteConfig;
  const year = new Date().getFullYear();

  const social = [
    { label: "Facebook", href: socials.facebook, Icon: FacebookIcon },
    { label: "Instagram", href: socials.instagram, Icon: InstagramIcon },
    { label: "TikTok", href: socials.tiktok, Icon: TikTokIcon },
  ];

  return (
    <footer className="relative mt-24 overflow-hidden bg-brown text-cream">
      <WheatSprig className="absolute -right-6 bottom-0 h-64 w-48 text-caramel/15 sm:h-80 sm:w-60" />
      <Container className="relative py-14 lg:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1.2fr_0.8fr]">
          <div>
            <div className="inline-block rounded-3xl bg-cream p-3 shadow-soft">
              <Logo className="h-24 sm:h-28" />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/80">
              Boulangerie et pâtisserie artisanale à Uckange. Pains frais, viennoiseries, pâtisseries et gâteaux
              personnalisés, préparés avec passion.
            </p>
          </div>

          <nav aria-label="Liens du pied de page">
            <h2 className="font-serif text-xl text-beige">Navigation</h2>
            <ul className="mt-4 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-9 items-center text-sm text-cream/85 transition-colors hover:text-caramel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-serif text-xl text-beige">Nous contacter</h2>
            <ul className="mt-4 space-y-3 text-sm text-cream/85">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-caramel" aria-hidden="true" />
                {contact.address ? (
                  <address className="not-italic">
                    {contact.address.street}
                    <br />
                    {contact.address.postalCode} {contact.address.city}
                  </address>
                ) : (
                  <Placeholder>Adresse à renseigner — Uckange</Placeholder>
                )}
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-caramel" aria-hidden="true" />
                {contact.phone ? (
                  <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="hover:text-caramel">
                    {contact.phone}
                  </a>
                ) : (
                  <Placeholder>Numéro de téléphone à renseigner</Placeholder>
                )}
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-caramel" aria-hidden="true" />
                {contact.email ? (
                  <a href={`mailto:${contact.email}`} className="hover:text-caramel">
                    {contact.email}
                  </a>
                ) : (
                  <Placeholder>Adresse e-mail à renseigner</Placeholder>
                )}
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-caramel" aria-hidden="true" />
                <Placeholder>Horaires d&apos;ouverture à renseigner</Placeholder>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-xl text-beige">Suivez-nous</h2>
            <ul className="mt-4 flex gap-3">
              {social.map(({ label, href, Icon }) => (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} (nouvel onglet)`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 transition-colors hover:border-caramel hover:bg-caramel hover:text-brown"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ) : (
                    <span
                      role="img"
                      aria-label={`${label} — lien à renseigner`}
                      title="Lien à renseigner"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-cream/30 text-cream/50"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
            {!socials.facebook && !socials.instagram && (
              <p className="mt-3 text-xs italic text-cream/60">Liens des réseaux sociaux à renseigner.</p>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-cream/15 pt-6 text-xs text-cream/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Tous droits réservés.
          </p>
          <p>Boulangerie · Pâtisserie — Uckange</p>
        </div>
      </Container>
    </footer>
  );
}
