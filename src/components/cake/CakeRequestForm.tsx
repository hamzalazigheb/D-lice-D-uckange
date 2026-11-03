"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Copy, Info, Loader2, Phone, Send, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cakeRequestSchema, eventTypes, type CakeRequestValues } from "@/lib/cake-form";
import { getCallHref, siteConfig } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error" | "unconfigured";

function Field({
  label,
  htmlFor,
  error,
  hint,
  required = true,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block font-nav text-[0.8rem] font-semibold text-brown">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-caramel-dark">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-ink/55"> (facultatif)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${htmlFor}-hint`} className="mt-1.5 text-xs text-ink/60">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 text-sm font-medium text-[#B3402F]">
          {error}
        </p>
      )}
    </div>
  );
}

function buildSummary(v: CakeRequestValues) {
  return [
    "Demande de gâteau personnalisé — Délice D'Uckange",
    `Nom : ${v.fullName}`,
    `Téléphone : ${v.phone}`,
    `E-mail : ${v.email}`,
    `Événement : ${v.eventType}`,
    `Date souhaitée : ${v.date}`,
    `Nombre de personnes : ${v.guests}`,
    `Parfum : ${v.flavor}`,
    `Description : ${v.description}`,
    v.image && v.image.length > 0 ? `Image de référence : ${v.image[0].name} (à joindre séparément)` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function CakeRequestForm() {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const endpoint = siteConfig.cakeFormEndpoint;

  const [status, setStatus] = useState<Status>("idle");
  const [summary, setSummary] = useState("");
  const [copied, setCopied] = useState(false);
  const [minDate, setMinDate] = useState<string>();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CakeRequestValues>({
    resolver: zodResolver(cakeRequestSchema),
    mode: "onTouched",
    defaultValues: { eventType: "" },
  });

  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    setMinDate(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
  }, []);

  const fileList = watch("image");
  const fileName = fileList && fileList.length > 0 ? fileList[0].name : null;
  const descriptionLength = (watch("description") ?? "").length;

  const aria = (name: keyof CakeRequestValues) => ({
    id: id(name),
    "aria-invalid": errors[name] ? (true as const) : undefined,
    "aria-describedby": errors[name] ? `${id(name)}-error` : undefined,
  });

  async function onSubmit(values: CakeRequestValues) {
    setSummary(buildSummary(values));

    // Aucun service d'envoi configuré : on ne prétend PAS avoir envoyé la demande.
    if (!endpoint) {
      setStatus("unconfigured");
      return;
    }

    setStatus("sending");
    try {
      const body = new FormData();
      body.append("Nom et prénom", values.fullName);
      body.append("Téléphone", values.phone);
      body.append("E-mail", values.email);
      body.append("Type d'événement", values.eventType);
      body.append("Date souhaitée", values.date);
      body.append("Nombre de personnes", values.guests);
      body.append("Parfum souhaité", values.flavor);
      body.append("Description du gâteau", values.description);
      if (values.image && values.image.length > 0) body.append("Image de référence", values.image[0]);
      body.append("_gotcha", values.website ?? "");

      const res = await fetch(endpoint, { method: "POST", body, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      reset({ eventType: "" });
    } catch {
      setStatus("error");
    }
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  const showForm = status === "idle" || status === "sending" || status === "error";

  return (
    <div className="rounded-4xl bg-white p-6 shadow-soft sm:p-10">
      {!endpoint && showForm && (
        <div role="note" className="mb-8 flex items-start gap-3 rounded-2xl border border-caramel/40 bg-beige/50 p-4 text-sm text-ink/85">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-caramel-dark" aria-hidden="true" />
          <p>
            <strong className="font-semibold text-brown">Envoi en ligne non activé.</strong> Ce formulaire est prêt, mais
            aucun service d&apos;envoi n&apos;est encore connecté : votre demande ne sera pas transmise à la boulangerie
            par ce biais.{" "}
            {siteConfig.contact.phone ? "Contactez-nous par téléphone pour passer commande." : ""}
          </p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {status === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="py-8 text-center"
          >
            <CheckCircle2 className="mx-auto h-14 w-14 text-[#4F7A3C]" strokeWidth={1.5} aria-hidden="true" />
            <h2 className="mt-4 font-serif text-3xl font-semibold text-brown">Demande envoyée</h2>
            <p className="mx-auto mt-3 max-w-md text-ink/80">
              Merci ! Votre demande a bien été transmise à la boulangerie. Nous reviendrons vers vous pour confirmer
              les détails.
            </p>
            <div className="mt-7 flex justify-center">
              <Button variant="secondary" onClick={() => setStatus("idle")}>
                Faire une autre demande
              </Button>
            </div>
          </motion.div>
        )}

        {status === "unconfigured" && (
          <motion.div
            key="unconfigured"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="py-4"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="mt-1 h-8 w-8 shrink-0 text-caramel-dark" strokeWidth={1.6} aria-hidden="true" />
              <div>
                <h2 className="font-serif text-2xl font-semibold text-brown sm:text-3xl">
                  Votre demande n&apos;a pas été envoyée
                </h2>
                <p className="mt-3 text-ink/85">
                  Vos informations sont valides, mais l&apos;envoi en ligne n&apos;est pas encore activé sur ce site.
                  Pour commander, appelez-nous ou passez en boutique en présentant le récapitulatif ci-dessous.
                </p>
              </div>
            </div>
            <pre className="mt-6 max-h-72 overflow-auto whitespace-pre-wrap rounded-2xl bg-cream p-4 font-sans text-sm leading-relaxed text-ink">
              {summary}
            </pre>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={copySummary}
                icon={copied ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              >
                {copied ? "Récapitulatif copié" : "Copier le récapitulatif"}
              </Button>
              {siteConfig.contact.phone && (
                <Button href={getCallHref()} variant="secondary" icon={<Phone className="h-4 w-4" aria-hidden="true" />}>
                  Appeler la boulangerie
                </Button>
              )}
              <Button variant="ghost" onClick={() => setStatus("idle")}>
                Modifier ma demande
              </Button>
            </div>
          </motion.div>
        )}

        {showForm && (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            aria-label="Demande de gâteau personnalisé"
            className="space-y-6"
          >
            {status === "error" && (
              <div role="alert" className="flex items-start gap-3 rounded-2xl border border-[#B3402F]/40 bg-[#B3402F]/5 p-4 text-sm text-ink">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#B3402F]" aria-hidden="true" />
                <p>
                  <strong className="font-semibold text-[#B3402F]">L&apos;envoi a échoué.</strong> Votre demande n&apos;a
                  pas été transmise. Vérifiez votre connexion et réessayez
                  {siteConfig.contact.phone ? `, ou appelez-nous au ${siteConfig.contact.phone}.` : "."}
                </p>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nom et prénom" htmlFor={id("fullName")} error={errors.fullName?.message}>
                <input type="text" autoComplete="name" className="field" {...aria("fullName")} {...register("fullName")} />
              </Field>
              <Field label="Téléphone" htmlFor={id("phone")} error={errors.phone?.message}>
                <input type="tel" autoComplete="tel" inputMode="tel" placeholder="06 12 34 56 78" className="field" {...aria("phone")} {...register("phone")} />
              </Field>
              <Field label="Email" htmlFor={id("email")} error={errors.email?.message} className="sm:col-span-2">
                <input type="email" autoComplete="email" className="field" {...aria("email")} {...register("email")} />
              </Field>
              <Field label="Type d'événement" htmlFor={id("eventType")} error={errors.eventType?.message}>
                <select className="field" {...aria("eventType")} {...register("eventType")}>
                  <option value="">Sélectionnez…</option>
                  {eventTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Date souhaitée" htmlFor={id("date")} error={errors.date?.message}>
                <input type="date" min={minDate} className="field" {...aria("date")} {...register("date")} />
              </Field>
              <Field label="Nombre de personnes" htmlFor={id("guests")} error={errors.guests?.message}>
                <input type="number" inputMode="numeric" min={1} max={500} placeholder="8" className="field" {...aria("guests")} {...register("guests")} />
              </Field>
              <Field label="Parfum souhaité" htmlFor={id("flavor")} error={errors.flavor?.message}>
                <input type="text" placeholder="Chocolat, fraise, vanille…" className="field" {...aria("flavor")} {...register("flavor")} />
              </Field>
              <Field
                label="Description du gâteau"
                htmlFor={id("description")}
                error={errors.description?.message}
                hint={`${descriptionLength} / 1500 caractères`}
                className="sm:col-span-2"
              >
                <textarea
                  rows={5}
                  placeholder="Forme, décoration, message à inscrire, allergies, thème…"
                  className="field resize-y"
                  {...aria("description")}
                  {...register("description")}
                />
              </Field>

              <Field
                label="Image de référence"
                htmlFor={id("image")}
                required={false}
                error={errors.image?.message as string | undefined}
                hint="JPG, PNG ou WebP — 5 Mo maximum."
                className="sm:col-span-2"
              >
                <label
                  htmlFor={id("image")}
                  className="flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-caramel/60 bg-cream px-4 py-3 text-sm text-ink/80 transition-colors hover:bg-beige/50 focus-within:ring-2 focus-within:ring-caramel/40"
                >
                  <Upload className="h-5 w-5 shrink-0 text-caramel-dark" aria-hidden="true" />
                  <span className="truncate">{fileName ?? "Choisir une image…"}</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="sr-only"
                    {...aria("image")}
                    {...register("image")}
                  />
                </label>
              </Field>
            </div>

            {/* Champ piège anti-spam (invisible) */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Ne pas remplir
                <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
              </label>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-ink/60">Les champs marqués d&apos;un * sont obligatoires.</p>
              <Button
                type="submit"
                disabled={status === "sending"}
                className="w-full sm:w-auto"
                icon={
                  status === "sending" ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Send className="h-4 w-4" aria-hidden="true" />
                  )
                }
              >
                {status === "sending" ? "Envoi en cours…" : endpoint ? "Envoyer ma demande" : "Vérifier ma demande"}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
