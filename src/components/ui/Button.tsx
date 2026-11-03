"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "ghost" | "caramel" | "outlineLight";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-brown text-cream shadow-soft hover:bg-brown-dark border border-brown",
  secondary:
    "bg-transparent text-brown border border-brown hover:bg-brown hover:text-cream",
  light:
    "bg-cream text-brown border border-cream hover:bg-beige hover:border-beige",
  ghost: "bg-transparent text-brown border border-transparent hover:bg-beige/60",
  // For use over photos / dark backgrounds
  caramel:
    "bg-caramel-dark text-white border border-caramel shadow-card hover:bg-caramel hover:border-caramel",
  outlineLight:
    "bg-brown-dark/40 text-cream border border-cream/60 backdrop-blur-sm hover:bg-cream hover:text-brown",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-6 text-[0.8rem]",
  lg: "min-h-12 px-7 text-[0.85rem] sm:px-8",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
}

type ButtonProps = BaseProps & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = BaseProps & {
  href: string;
  external?: boolean;
  target?: string;
  rel?: string;
  "aria-label"?: string;
  onClick?: () => void;
};

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "lg", className, children, icon } = props;
  const classes = cn(
    "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-nav font-semibold tracking-wide",
    "transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
    "disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );

  const motionProps = { whileHover: { y: -2 }, whileTap: { scale: 0.97 }, transition: { duration: 0.2 } };

  if ("href" in props && props.href !== undefined) {
    const { href, external, target, rel, onClick } = props;
    const aria = props["aria-label"];
    const isExternal = external || /^(https?:|tel:|mailto:)/.test(href);
    return (
      <motion.span className="inline-flex" {...motionProps}>
        {isExternal ? (
          <a
            href={href}
            className={classes}
            target={target ?? (href.startsWith("http") ? "_blank" : undefined)}
            rel={rel ?? (href.startsWith("http") ? "noopener noreferrer" : undefined)}
            aria-label={aria}
            onClick={onClick}
          >
            {children}
            {icon}
          </a>
        ) : (
          <Link href={href} className={classes} aria-label={aria} onClick={onClick}>
            {children}
            {icon}
          </Link>
        )}
      </motion.span>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, icon: _i, ...rest } = props as ButtonProps;
  return (
    <motion.span className="inline-flex" {...(rest.disabled ? {} : motionProps)}>
      <button type="button" className={classes} {...rest}>
        {children}
        {icon}
      </button>
    </motion.span>
  );
}
