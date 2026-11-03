import "server-only";
import fs from "node:fs";
import path from "node:path";
import { galleryItems, type GalleryItem } from "./gallery";
import { IMAGES, type ImageKey } from "./images";

/** True if the asset file really exists in /public (server-side check). */
export function assetExists(key: ImageKey): boolean {
  const file = path.join(process.cwd(), "public", IMAGES[key].src);
  return fs.existsSync(file);
}

/** Gallery items whose photo file actually exists (no fake placeholders in the gallery). */
export function getAvailableGallery(): GalleryItem[] {
  return galleryItems.filter((item) => assetExists(item.image));
}

/** Returns the first key whose file exists, or the last one as a final fallback. */
export function pickExisting(...keys: ImageKey[]): ImageKey {
  return keys.find(assetExists) ?? keys[keys.length - 1];
}
