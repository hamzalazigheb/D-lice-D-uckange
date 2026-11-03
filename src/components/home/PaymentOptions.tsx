"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/* ── SVG payment icons ─────────────────────────────────────────────────────
   Each icon receives a `hovered` boolean so it can switch to brand colours.
────────────────────────────────────────────────────────────────────────── */

function IconEspeces({ h }: { h: boolean }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" aria-hidden="true" className="h-full w-full">
      <rect x="4" y="14" width="52" height="32" rx="5"
        stroke={h ? "#4CAF50" : "currentColor"} strokeWidth="3" fill="none"
        style={{ transition: "stroke .3s" }}/>
      <rect x="10" y="20" width="10" height="7" rx="2"
        fill={h ? "#4CAF50" : "currentColor"} opacity={h ? ".5" : ".35"}
        style={{ transition: "fill .3s" }}/>
      <rect x="40" y="33" width="10" height="7" rx="2"
        fill={h ? "#4CAF50" : "currentColor"} opacity={h ? ".5" : ".35"}
        style={{ transition: "fill .3s" }}/>
      <circle cx="30" cy="30" r="8"
        stroke={h ? "#4CAF50" : "currentColor"} strokeWidth="2.5" fill="none"
        style={{ transition: "stroke .3s" }}/>
      <path d="M30 23v14M26 26.5h5a2.5 2.5 0 0 1 0 5h-2a2.5 2.5 0 0 0 0 5h5"
        stroke={h ? "#4CAF50" : "currentColor"} strokeWidth="2" strokeLinecap="round"
        style={{ transition: "stroke .3s" }}/>
    </svg>
  );
}

function IconContactless({ h }: { h: boolean }) {
  const c = h ? "#0070BA" : "currentColor";
  return (
    <svg viewBox="0 0 60 60" fill="none" aria-hidden="true" className="h-full w-full">
      <circle cx="30" cy="30" r="22" stroke={c} strokeWidth="3" fill="none" style={{transition:"stroke .3s"}}/>
      <path d="M23 30c0-3.87 3.13-7 7-7M20 30c0-5.52 4.48-10 10-10M26 30a4 4 0 0 1 4-4"
        stroke={c} strokeWidth="2.5" strokeLinecap="round" fill="none" style={{transition:"stroke .3s"}}/>
      <circle cx="30" cy="30" r="3" fill={c} style={{transition:"fill .3s"}}/>
    </svg>
  );
}

function IconMastercard({ h }: { h: boolean }) {
  return (
    <svg viewBox="0 0 60 40" aria-hidden="true" className="h-full w-full">
      <rect x="1" y="1" width="58" height="38" rx="5"
        stroke={h ? "#252525" : "currentColor"} strokeWidth="2" fill={h ? "#252525" : "none"}
        style={{transition:"stroke .3s,fill .3s"}}/>
      <circle cx="22" cy="20" r="10" fill={h ? "#EB001B" : "currentColor"} opacity={h ? "1" : ".5"} style={{transition:"fill .3s"}}/>
      <circle cx="38" cy="20" r="10" fill={h ? "#F79E1B" : "currentColor"} opacity={h ? "1" : ".4"} style={{transition:"fill .3s"}}/>
      {/* overlap blend */}
      {h && <path d="M30 12.8a10 10 0 0 1 0 14.4 10 10 0 0 1 0-14.4z" fill="#FF5F00"/>}
    </svg>
  );
}

function IconTicketResto({ h }: { h: boolean }) {
  const c = h ? "#E85B1C" : "currentColor";
  return (
    <svg viewBox="0 0 60 40" fill="none" aria-hidden="true" className="h-full w-full">
      <rect x="1" y="1" width="58" height="38" rx="5"
        stroke={c} strokeWidth="2" fill={h ? "#FFF4EE" : "none"} style={{transition:"stroke .3s,fill .3s"}}/>
      <path d="M14 10h6v4l-3 3 3 3v4h-6"
        stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{transition:"stroke .3s"}}/>
      <line x1="25" y1="14" x2="46" y2="14" stroke={c} strokeWidth="2" strokeLinecap="round" style={{transition:"stroke .3s"}}/>
      <line x1="25" y1="20" x2="46" y2="20" stroke={c} strokeWidth="2" strokeLinecap="round" style={{transition:"stroke .3s"}}/>
      <line x1="25" y1="26" x2="40" y2="26" stroke={c} strokeWidth="2" strokeLinecap="round" style={{transition:"stroke .3s"}}/>
    </svg>
  );
}

function IconVisa({ h }: { h: boolean }) {
  return (
    <svg viewBox="0 0 60 40" fill="none" aria-hidden="true" className="h-full w-full">
      <rect x="1" y="1" width="58" height="38" rx="5"
        stroke={h ? "#1A1F71" : "currentColor"} strokeWidth="2"
        fill={h ? "#1A1F71" : "none"} style={{transition:"stroke .3s,fill .3s"}}/>
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle"
        fontSize="14" fontWeight="700" fontFamily="sans-serif"
        fill={h ? "#FFFFFF" : "currentColor"} letterSpacing="1"
        style={{transition:"fill .3s"}}>VISA</text>
    </svg>
  );
}

function IconApplePay({ h }: { h: boolean }) {
  return (
    <svg viewBox="0 0 60 40" fill="none" aria-hidden="true" className="h-full w-full">
      <rect x="1" y="1" width="58" height="38" rx="5"
        stroke={h ? "#000" : "currentColor"} strokeWidth="2"
        fill={h ? "#000" : "none"} style={{transition:"stroke .3s,fill .3s"}}/>
      {/* apple glyph (simplified) */}
      <path d="M22.5 18.5c-.3-2.2 1.8-3.8 1.8-3.8s-1.9-2.5-4.2-2.2c-2.2.3-3 1.8-4.2 1.8s-2.1-1.7-3.8-1.6c-2 .1-4.1 2.3-4.1 6 0 3.9 2.7 8.3 4.6 8.3 1.2 0 2-.9 3.3-.9 1.3 0 2 .9 3.3.9 2.1 0 4.3-4 4.3-4s-2.8-1.5-3-4.5z"
        fill={h ? "#fff" : "currentColor"} opacity={h ? "1" : ".65"}
        transform="translate(15,4) scale(0.58)" style={{transition:"fill .3s"}}/>
      <text x="60%" y="60%" dominantBaseline="middle" textAnchor="middle"
        fontSize="9.5" fontWeight="600" fontFamily="-apple-system,sans-serif"
        fill={h ? "#fff" : "currentColor"} style={{transition:"fill .3s"}}>Pay</text>
    </svg>
  );
}

function IconMaestro({ h }: { h: boolean }) {
  return (
    <svg viewBox="0 0 60 40" aria-hidden="true" className="h-full w-full">
      <rect x="1" y="1" width="58" height="38" rx="5"
        stroke={h ? "#555" : "currentColor"} strokeWidth="2"
        fill={h ? "#fff" : "none"} style={{transition:"stroke .3s,fill .3s"}}/>
      <circle cx="22" cy="20" r="10"
        fill={h ? "#CC0000" : "currentColor"} opacity={h ? "1" : ".6"} style={{transition:"fill .3s"}}/>
      <circle cx="38" cy="20" r="10"
        fill={h ? "#0099DF" : "currentColor"} opacity={h ? "0.85" : ".35"} style={{transition:"fill .3s"}}/>
      <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle"
        fontSize="7" fontWeight="700" fontFamily="sans-serif"
        fill="white" style={{transition:"fill .3s"}}>maestro</text>
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────────────────────── */
type PayIcon = React.ComponentType<{ h: boolean }>;

const methods: { label: string; Icon: PayIcon; hoverBorder: string; hoverBg: string }[] = [
  { label: "Espèces",              Icon: IconEspeces,     hoverBorder: "#4CAF50", hoverBg: "#F0FAF0" },
  { label: "Paiement sans contact",Icon: IconContactless, hoverBorder: "#0070BA", hoverBg: "#EEF6FF" },
  { label: "MasterCard",           Icon: IconMastercard,  hoverBorder: "#EB001B", hoverBg: "#fff8f8" },
  { label: "Ticket Restaurant",    Icon: IconTicketResto, hoverBorder: "#E85B1C", hoverBg: "#FFF4EE" },
  { label: "VISA",                 Icon: IconVisa,        hoverBorder: "#1A1F71", hoverBg: "#1A1F71" },
  { label: "Apple Pay",            Icon: IconApplePay,    hoverBorder: "#000",    hoverBg: "#000"    },
  { label: "Maestro",              Icon: IconMaestro,     hoverBorder: "#0099DF", hoverBg: "#f0f8ff" },
];

/* ── Component ────────────────────────────────────────────────────────── */
function PayCard({ label, Icon, hoverBorder, hoverBg }: (typeof methods)[0]) {
  const [hovered, setHovered] = useState(false);
  return (
    <li
      className="flex w-[4.5rem] flex-col items-center gap-3 text-center sm:w-[5.5rem]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.span
        animate={hovered
          ? { borderColor: hoverBorder, backgroundColor: hoverBg, boxShadow: `0 8px 24px -8px ${hoverBorder}55`, scale: 1.12 }
          : { borderColor: "rgba(0,0,0,0.08)", backgroundColor: "#ffffff", boxShadow: "0 4px 14px -6px rgba(89,64,46,0.14)", scale: 1 }
        }
        transition={{ duration: 0.25 }}
        className="flex h-14 w-14 cursor-default items-center justify-center rounded-2xl border p-2.5 sm:h-16 sm:w-16 sm:p-3"
        style={{ borderWidth: 1.5 }}
      >
        <Icon h={hovered} />
      </motion.span>
      <motion.span
        animate={{ color: hovered ? hoverBorder : "rgba(52,48,42,0.60)" }}
        transition={{ duration: 0.25 }}
        className="text-[0.72rem] font-medium leading-snug sm:text-[0.78rem]"
      >
        {label}
      </motion.span>
    </li>
  );
}

export function PaymentOptions() {
  return (
    <section aria-labelledby="titre-paiement" className="section-y">
      <Container>
        <Reveal className="text-center">
          <h2
            id="titre-paiement"
            className="font-serif text-3xl font-bold leading-tight text-brown sm:text-4xl"
          >
            Options de paiement{" "}
            <br />
            <em className="font-serif font-semibold italic not-italic text-caramel-dark">disponibles</em>
          </h2>
          <span className="mx-auto mt-4 block h-0.5 w-12 rounded-full bg-brown/35" aria-hidden="true" />
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-10 flex flex-wrap items-start justify-center gap-6 sm:gap-10 lg:gap-12">
            {methods.map((m) => (
              <PayCard key={m.label} {...m} />
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
