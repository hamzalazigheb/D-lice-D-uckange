import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const routes = [
  { path: "", priority: 1 },
  { path: "/produits", priority: 0.9 },
  { path: "/commandes-gateaux", priority: 0.9 },
  { path: "/galerie", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority,
  }));
}
