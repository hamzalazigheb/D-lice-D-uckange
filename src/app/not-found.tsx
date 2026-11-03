import { Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WheatDivider } from "@/components/ui/Wheat";

export default function NotFound() {
  return (
    <Container className="py-28 text-center">
      <p className="font-nav text-sm font-semibold uppercase tracking-[0.3em] text-caramel-dark">Erreur 404</p>
      <h1 className="mt-3 font-serif text-5xl font-semibold text-brown">Page introuvable</h1>
      <WheatDivider className="mt-5" />
      <p className="mx-auto mt-5 max-w-md text-ink/80">
        Cette page n&apos;existe pas ou a été déplacée. Retournez à l&apos;accueil pour retrouver nos gourmandises.
      </p>
      <div className="mt-8 flex justify-center">
        <Button href="/" icon={<Home className="h-4 w-4" aria-hidden="true" />}>
          Retour à l&apos;accueil
        </Button>
      </div>
    </Container>
  );
}
