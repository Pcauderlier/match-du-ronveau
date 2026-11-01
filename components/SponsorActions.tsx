"use client";

import { regenererCode, supprimerSponsor } from "@/app/actions/admin";
import { ActionButton } from "@/components/ActionButton";

export function SponsorActions({ id }: { id: string }) {
  return (
    <div className="actions">
      <ActionButton
        action={regenererCode}
        fields={{ id }}
        label="Nouveau code"
        pendingLabel="Code…"
        confirmMessage="Régénérer le code ? L'ancien ne permettra plus de se connecter."
      />
      <ActionButton
        action={supprimerSponsor}
        fields={{ id }}
        label="Supprimer"
        pendingLabel="Suppression…"
        confirmMessage="Supprimer ce sponsor et tous ses invités ?"
        className="cta small danger"
      />
    </div>
  );
}
