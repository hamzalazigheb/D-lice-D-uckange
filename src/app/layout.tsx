import type { Metadata, Viewport } from "next";
import { Lato, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LocalBusinessJsonLd } from "@/components/seo/StructuredData";
import { Providers } from "@/components/ui/Providers";
import { baseKeywords } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});
const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Boulangerie Pâtisserie à Uckange — Délice D'Uckange",
    template: "%s | Délice D'Uckange",
  },
  description: siteConfig.description,
  keywords: baseKeywords,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: "Boulangerie Pâtisserie à Uckange — Délice D'Uckange",
    description: siteConfig.description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F8F4EC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={`${playfair.variable} ${lato.variable} ${montserrat.variable}`}>
      <body>
        <LocalBusinessJsonLd />
        <Providers>
          <Header />
          <main id="contenu" className="pt-[4.75rem] sm:pt-24">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
