import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { WheatDivider, WheatSprig } from "./Wheat";

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-beige-light/70 to-cream py-14 sm:py-20">
      <WheatSprig className="absolute -left-4 bottom-0 hidden h-48 w-36 text-caramel/15 sm:block" />
      <WheatSprig flip className="absolute -right-4 bottom-0 hidden h-48 w-36 text-caramel/15 sm:block" />
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-nav text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-caramel-dark">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-brown sm:text-6xl">{title}</h1>
          <WheatDivider className="mt-5" />
          <p className="mt-5 text-base leading-relaxed text-ink/80 sm:text-lg">{subtitle}</p>
        </Reveal>
      </Container>
    </section>
  );
}
