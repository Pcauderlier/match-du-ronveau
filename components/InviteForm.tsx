"use client";

import { useActionState, useEffect, useRef } from "react";
import { ajouterInvite } from "@/app/actions/sponsor";
import { emptyFormState } from "@/lib/forms";

export function InviteForm({ complet = false }: { complet?: boolean }) {
  const [state, action, pending] = useActionState(ajouterInvite, emptyFormState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={action} className="form">
      {state.error ? (
        <div className="msg err" role="alert">
          {state.error}
        </div>
      ) : null}
      {state.ok ? (
        <div className="msg" role="status">
          {state.ok}
        </div>
      ) : null}
      <div className="field">
        <label htmlFor="invite-nom">Nom et prénom</label>
        <input
          id="invite-nom"
          name="nom"
          type="text"
          required
          maxLength={120}
          autoComplete="name"
          disabled={complet}
        />
      </div>
      <div className="ctas">
        <button className="cta" type="submit" disabled={pending || complet}>
          {pending ? "Ajout…" : "Ajouter l'invité"}
        </button>
      </div>
    </form>
  );
}
