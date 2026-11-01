"use server";

import { withDb } from "@/db/client";
import { inscriptions, preinscriptions } from "@/db/schema";
import { isBilleterieOuverte } from "@/lib/env";
import { fail, isDemande, readDemande, success, type FormState } from "@/lib/forms";
import { sendPreinscriptionConfirmation } from "@/lib/mail";

const CONFIRMATION_ENVOYEE =
  "C'est noté. Un e-mail de confirmation vous a été envoyé. Nous vous préviendrons dès l'ouverture de la billetterie.";

const CONFIRMATION_NON_ENVOYEE =
  "Votre préinscription est enregistrée, mais l'e-mail de confirmation n'a pas pu partir. Nous vous écrirons quand la billetterie ouvrira.";

export async function envoyerPreinscription(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (isBilleterieOuverte()) {
    return fail("La billetterie est ouverte : utilisez le formulaire d'inscription.");
  }

  const demande = readDemande(formData);
  if (!isDemande(demande)) return demande;

  const result = await withDb(async (db) => {
    const inserted = await db
      .insert(preinscriptions)
      .values(demande)
      .returning({ id: preinscriptions.id });
    return inserted.length > 0;
  });

  if (!result.ok) return fail(result.error);
  if (!result.data) return fail("La préinscription n'a pas été enregistrée. Réessayez.");

  const emailSent = await sendPreinscriptionConfirmation({
    nom: demande.nom,
    email: demande.email,
  });
  return success(emailSent ? CONFIRMATION_ENVOYEE : CONFIRMATION_NON_ENVOYEE);
}

export async function envoyerInscription(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (!isBilleterieOuverte()) {
    return fail("La billetterie n'est pas encore ouverte. Laissez une préinscription.");
  }

  const demande = readDemande(formData);
  if (!isDemande(demande)) return demande;

  const result = await withDb(async (db) => {
    const inserted = await db.insert(inscriptions).values(demande).returning({ id: inscriptions.id });
    return inserted.length > 0;
  });

  if (!result.ok) return fail(result.error);
  if (!result.data) return fail("L'inscription n'a pas été enregistrée. Réessayez.");
  return success("Inscription enregistrée. Nous vous recontactons pour la suite.");
}
