"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { allocateCode } from "@/db/codes";
import { withDb } from "@/db/client";
import { preinscriptions, sponsors } from "@/db/schema";
import { formatCode } from "@/lib/codes";
import { ADMIN_PASSWORD_MISSING, isAdminPasswordConfigured } from "@/lib/env";
import {
  fail,
  isContact,
  isUuid,
  readContact,
  readRole,
  success,
  type FormState,
} from "@/lib/forms";
import {
  clearAdminSession,
  getAdminSession,
  passwordMatches,
  setAdminSession,
} from "@/lib/session";

async function requireAdmin(): Promise<FormState | null> {
  const session = await getAdminSession();
  if (!session) return fail("Session expirée. Reconnectez-vous.");
  return null;
}

export async function loginAdmin(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!isAdminPasswordConfigured()) return fail(ADMIN_PASSWORD_MISSING);

  const password = String(formData.get("password") ?? "");
  if (!password || password.length > 200 || !passwordMatches(password)) {
    return fail("Mot de passe incorrect.");
  }

  const opened = await setAdminSession();
  if (!opened) return fail(ADMIN_PASSWORD_MISSING);
  redirect("/admin");
}

export async function logoutAdmin(): Promise<void> {
  await clearAdminSession();
  redirect("/admin/connexion");
}

export async function creerSponsor(_prev: FormState, formData: FormData): Promise<FormState> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const contact = readContact(formData);
  if (!isContact(contact)) return contact;
  const role = readRole(formData);
  if (typeof role !== "string") return role;

  const result = await withDb(async (db) => {
    const code = await allocateCode(db);
    if (!code) return { code: null, dejaPrincipal: false };
    const deja = await db
      .select({ id: sponsors.id })
      .from(sponsors)
      .where(eq(sponsors.role, "principal"))
      .limit(1);
    await db.insert(sponsors).values({ ...contact, role, code });
    return { code, dejaPrincipal: role === "principal" && deja.length > 0 };
  });

  if (!result.ok) return fail(result.error);
  if (!result.data.code) return fail("Impossible de générer un code. Réessayez.");

  revalidatePath("/admin");
  const avertissement = result.data.dejaPrincipal
    ? " Un Principal est déjà enregistré : la formule n'en prévoit qu'un. L'enregistrement a tout de même été fait."
    : "";
  return success(`Sponsor créé. Code : ${formatCode(result.data.code)}.${avertissement}`);
}

export async function regenererCode(_prev: FormState, formData: FormData): Promise<FormState> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const id = String(formData.get("id") ?? "");
  if (!isUuid(id)) return fail("Sponsor introuvable.");

  const result = await withDb(async (db) => {
    const code = await allocateCode(db);
    if (!code) return null;
    const updated = await db
      .update(sponsors)
      .set({ code })
      .where(eq(sponsors.id, id))
      .returning({ id: sponsors.id });
    if (updated.length === 0) return null;
    return code;
  });

  if (!result.ok) return fail(result.error);
  if (!result.data) return fail("Sponsor introuvable, ou code impossible à générer.");

  revalidatePath("/admin");
  return success(
    `Nouveau code : ${formatCode(result.data)}. L'ancien code ne permet plus de se connecter.`,
  );
}

export async function supprimerSponsor(_prev: FormState, formData: FormData): Promise<FormState> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const id = String(formData.get("id") ?? "");
  if (!isUuid(id)) return fail("Sponsor introuvable.");

  const result = await withDb(async (db) => {
    const removed = await db
      .delete(sponsors)
      .where(eq(sponsors.id, id))
      .returning({ id: sponsors.id });
    return removed.length;
  });

  if (!result.ok) return fail(result.error);
  if (result.data === 0) return fail("Sponsor introuvable.");

  revalidatePath("/admin");
  revalidatePath("/espace-sponsor");
  return success("Sponsor et ses invités ont été supprimés.");
}

export async function supprimerPreinscription(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const id = String(formData.get("id") ?? "");
  if (!isUuid(id)) return fail("Préinscription introuvable.");

  const result = await withDb(async (db) => {
    const removed = await db
      .delete(preinscriptions)
      .where(eq(preinscriptions.id, id))
      .returning({ id: preinscriptions.id });
    return removed.length;
  });

  if (!result.ok) return fail(result.error);
  if (result.data === 0) return fail("Préinscription introuvable.");

  revalidatePath("/admin");
  return success("Préinscription supprimée.");
}
