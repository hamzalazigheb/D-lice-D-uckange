import { z } from "zod";

export const eventTypes = [
  "Anniversaire",
  "Mariage",
  "Baptême",
  "Communion",
  "Naissance",
  "Fête d'entreprise",
  "Autre occasion",
] as const;

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 Mo
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Numéros français : 0X XX XX XX XX ou +33 X XX XX XX XX
const frenchPhone = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

export const cakeRequestSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Indiquez votre nom et prénom.")
    .max(100, "Ce champ est trop long."),
  phone: z.string().trim().regex(frenchPhone, "Saisissez un numéro de téléphone français valide."),
  email: z.string().trim().pipe(z.email("Saisissez une adresse e-mail valide.")),
  eventType: z.string().min(1, "Choisissez un type d'événement."),
  date: z
    .string()
    .min(1, "Indiquez la date souhaitée.")
    .refine((value) => {
      const picked = new Date(`${value}T00:00:00`);
      if (Number.isNaN(picked.getTime())) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return picked.getTime() > today.getTime();
    }, "Choisissez une date à venir."),
  guests: z
    .string()
    .trim()
    .regex(/^\d+$/, "Indiquez un nombre entier.")
    .refine((v) => Number(v) >= 1 && Number(v) <= 500, "Indiquez un nombre entre 1 et 500."),
  flavor: z.string().trim().min(2, "Indiquez le parfum souhaité.").max(120, "Ce champ est trop long."),
  description: z
    .string()
    .trim()
    .min(15, "Décrivez votre gâteau en quelques mots (15 caractères minimum).")
    .max(1500, "La description ne peut pas dépasser 1 500 caractères."),
  image: z
    .custom<FileList | undefined>()
    .refine(
      (files) => !files || files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files[0].type),
      "Format accepté : JPG, PNG ou WebP.",
    )
    .refine(
      (files) => !files || files.length === 0 || files[0].size <= MAX_IMAGE_SIZE,
      "L'image ne doit pas dépasser 5 Mo.",
    ),
  // Champ piège anti-spam : doit rester vide.
  website: z.string().max(0).optional(),
});

export type CakeRequestValues = z.infer<typeof cakeRequestSchema>;
