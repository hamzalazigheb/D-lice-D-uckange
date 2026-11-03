// SERVER COMPONENT — resolves the image key, passes it to the client child.
import { pickExisting } from "@/lib/images-server";
import { CakeCtaInner } from "./CakeCtaInner";

export function CakeCta() {
  const image = pickExisting("interior", "storefront", "categoryCake");
  return <CakeCtaInner image={image} />;
}
