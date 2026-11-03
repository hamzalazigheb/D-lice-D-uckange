import { Award, ChefHat, Leaf, MapPin } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Container } from "@/components/ui/Container";
import { StaggerItem, StaggerList } from "@/components/ui/StaggerList";

const benefits = [
  { icon: ChefHat,  title: "Fabrication artisanale", text: "Du savoir-faire à chaque étape", counter: null },
  { icon: Leaf,     title: "Produits frais",          text: "Préparés au quotidien",           counter: null },
  { icon: Award,    title: "Ingrédients de qualité",  text: "Sélectionnés avec soin",          counter: null },
  { icon: MapPin,   title: "À Uckange",               text: "Votre boulangerie de proximité",   counter: null },
];

export function Benefits() {
  return (
    <section aria-label="Nos engagements" className="pb-6">
      <Container>
        <StaggerList className="grid grid-cols-2 gap-x-4 gap-y-8 rounded-4xl bg-beige/55 px-6 py-8 sm:px-10 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-caramel/25 lg:py-10">
          {benefits.map(({ icon: Icon, title, text }) => (
            <StaggerItem key={title}>
              <div className="group flex flex-col items-center gap-3 text-center lg:flex-row lg:gap-4 lg:px-6 lg:text-left">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-cream text-brown shadow-soft transition-all duration-300 group-hover:bg-brown group-hover:text-cream group-hover:shadow-lift">
                  <Icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-serif text-base font-semibold leading-tight text-brown sm:text-lg">{title}</span>
                  <span className="mt-0.5 block text-[0.82rem] text-ink/70 sm:text-sm">{text}</span>
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}
