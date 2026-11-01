"use server";

import { and, count, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { withDb } from "@/db/client";
import { invites, sponsors } from "@/db/schema";
import { normalizeCode } from "@/lib/codes";
import { ADMIN_PASSWORD_MISSING, isAdminPasswordConfigured } from "@/lib/env";
import { fail, isGuestName, isUuid, readGuestName, success, type FormState } from "@/lib/forms";
import { GUEST_LIMIT, guestLimitMessage } from "@/lib/labels";
import {
  clearSponsorSession,
  getSponsorSession,
  setSponsorSession,
} from "@/lib/session";

async function requireSponsor(): Promise<{ sponsorId: string } | FormState> {
  if (!isAdminPasswordConfigured()) return fail(ADMIN_PASSWORD_MISSING);
  const session = await getSponsorSession();
  if (!session) return fail("Session expirée. Entrez à nouveau votre code.");
  return { sponsorId: session.sponsorId };
}

function isDenied(value: { sponsorId: string } | FormState): value is FormState {
  return "error" in value;
}

export async function loginSponsor(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!isAdminPasswordConfigured()) {
    return fail(
      "La connexion sponsor est indisponible : ADMIN_PASSWORD est vide. Ce mot de passe signe aussi le cookie de session.",
    );
  }

  const code = normalizeCode(String(formData.get("code") ?? ""));
  if (code.length !== 8) return fail("Indiquez le code qui vous a été remis.");

  const result = await withDb(async (db) => {
    const rows = await db.select({ id: sponsors.id }).from(sponsors).where(eq(sponsors.code, code)).limit(1);
    return rows[0] ?? null;
  });

  if (!result.ok) return fail(result.error);
  if (!result.data) return fail("Code inconnu.");

  const opened = await setSponsorSession(result.data.id);
  if (!opened) return fail(ADMIN_PASSWORD_MISSING);
  redirect("/espace-sponsor");
}

export async function logoutSponsor(): Promise<void> {
  await clearSponsorSession();
  redirect("/espace-sponsor");
}

export async function ajouterInvite(_prev: FormState, formData: FormData): Promise<FormState> {
  const access = await requireSponsor();
  if (isDenied(access)) return access;

  const guest = readGuestName(formData);
  if (!isGuestName(guest)) return guest;

  const result = await withDb(async (db) => {
    const owner = await db
      .select({ id: sponsors.id, role: sponsors.role })
      .from(sponsors)
      .where(eq(sponsors.id, access.sponsorId))
      .limit(1);
    if (owner.length === 0) return { kind: "missing" as const };

    const role = owner[0].role;
    const max = GUEST_LIMIT[role];
    const totals = await db
      .select({ total: count() })
      .from(invites)
      .where(eq(invites.sponsorId, access.sponsorId));
    const total = Number(totals[0]?.total ?? 0);
    if (total >= max) return { kind: "full" as const, role };

    await db.insert(invites).values({ nom: guest.nom, sponsorId: access.sponsorId });
    return { kind: "added" as const };
  });

  if (!result.ok) return fail(result.error);
  if (result.data.kind === "missing") return fail("Ce sponsor n'existe plus.");
  if (result.data.kind === "full") return fail(guestLimitMessage(result.data.role));

  revalidatePath("/espace-sponsor");
  return success("Invité ajouté.");
}

export async function supprimerInvite(_prev: FormState, formData: FormData): Promise<FormState> {
  const access = await requireSponsor();
  if (isDenied(access)) return access;

  const id = String(formData.get("id") ?? "");
  if (!isUuid(id)) return fail("Invité introuvable.");

  const result = await withDb(async (db) => {
    const removed = await db
      .delete(invites)
      .where(and(eq(invites.id, id), eq(invites.sponsorId, access.sponsorId)))
      .returning({ id: invites.id });
    return removed.length;
  });

  if (!result.ok) return fail(result.error);
  if (result.data === 0) return fail("Cet invité n'est pas dans votre liste.");

  revalidatePath("/espace-sponsor");
  return success("Invité retiré.");
}
