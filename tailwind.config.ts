import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: {
          DEFAULT: "#59402E", // Primary brown
          dark: "#44301F",
          soft: "#7A5C45",
        },
        caramel: {
          DEFAULT: "#A87545", // Caramel accent (decor, large text)
          dark: "#8A5C32", // Accessible caramel for small text on cream
        },
        beige: {
          DEFAULT: "#E8D8BE",
          light: "#F1E6D2",
        },
        cream: "#F8F4EC",
        ink: "#34302A",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-lato)", "system-ui", "sans-serif"],
        nav: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgba(89, 64, 46, 0.18)",
        card: "0 14px 40px -16px rgba(89, 64, 46, 0.28)",
        lift: "0 24px 50px -18px rgba(89, 64, 46, 0.38)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
