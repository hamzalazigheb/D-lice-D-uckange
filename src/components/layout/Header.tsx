"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getCallHref, navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Sticky header style on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Mobile menu: scroll lock, Escape, focus management
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = [
          toggleRef.current,
          ...Array.from(panelRef.current.querySelectorAll<HTMLElement>("a[href], button")),
        ].filter(Boolean) as HTMLElement[];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-cream/95 shadow-soft backdrop-blur-md"
          : "bg-cream/70 backdrop-blur-sm",
      )}
    >
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brown focus:px-5 focus:py-2 focus:text-cream"
      >
        Aller au contenu
      </a>
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 transition-all duration-300 sm:px-8 lg:px-10",
          scrolled ? "h-[4.25rem]" : "h-[4.75rem] sm:h-24",
        )}
      >

        <Logo
          priority
          onClick={close}
          className={cn("transition-all duration-300", scrolled ? "h-14 sm:h-[3.75rem]" : "h-16 sm:h-[4.75rem]")}
        />

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-9">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative py-2 font-nav text-[0.82rem] font-medium tracking-wide text-ink transition-colors hover:text-brown",
                      active && "text-brown",
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-caramel transition-transform duration-300",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">

          <div className="hidden lg:block">
            <Button href={getCallHref()} size="md" icon={<Phone className="h-4 w-4" aria-hidden="true" />}>
              Nous appeler
            </Button>
          </div>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-brown/30 text-brown transition-colors hover:bg-beige focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel lg:hidden"
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="menu-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden border-t border-beige lg:hidden"
          >
            <nav aria-label="Navigation mobile" className="max-h-[calc(100dvh-5rem)] overflow-y-auto px-5 pb-8 pt-4 sm:px-8">
              <ul className="flex flex-col">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.href} className="border-b border-beige/80 last:border-0">
                      <Link
                        href={link.href}
                        onClick={close}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex min-h-14 items-center justify-between font-serif text-xl text-brown",
                          active && "text-caramel-dark",
                        )}
                      >
                        {link.label}
                        {active && <span className="h-2 w-2 rounded-full bg-caramel" aria-hidden="true" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6">
                <Button
                  href={getCallHref()}
                  onClick={close}
                  className="w-full"
                  icon={<Phone className="h-4 w-4" aria-hidden="true" />}
                >
                  Nous appeler
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
