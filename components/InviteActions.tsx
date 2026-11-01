"use client";

import { supprimerInvite } from "@/app/actions/sponsor";
import { ActionButton } from "@/components/ActionButton";

export function InviteActions({ id }: { id: string }) {
  return (
    <ActionButton
      action={supprimerInvite}
      fields={{ id }}
      label="Retirer"
      pendingLabel="Retrait…"
      confirmMessage="Retirer cet invité de votre liste ?"
      className="cta small danger"
    />
  );
}
