"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { creerSponsor } from "@/app/actions/admin";
import { emptyFormState } from "@/lib/forms";
import { ROLE_LABEL, ROLES } from "@/lib/labels";

export function SponsorForm({ hasPrincipal }: { hasPrincipal: boolean }) {
  const [state, action, pending] = useActionState(creerSponsor, emptyFormState);
  const [role, setRole] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state.ok) return;
    formRef.current?.reset();
    setRole("");
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
        <label htmlFor="sponsor-nom">Nom</label>
        <input id="sponsor-nom" name="nom" type="text" required maxLength={120} autoComplete="organization" />
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="sponsor-email">E-mail</label>
          <input id="sponsor-email" name="email" type="email" required maxLength={180} autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="sponsor-telephone">Téléphone</label>
          <input id="sponsor-telephone" name="telephone" type="tel" required maxLength={40} autoComplete="tel" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="sponsor-role">Rôle</label>
        <select
          id="sponsor-role"
          name="role"
          required
          value={role}
          onChange={(event) => setRole(event.target.value)}
        >
          <option value="">Choisir</option>
          {ROLES.map((item) => (
            <option key={item} value={item}>
              {ROLE_LABEL[item]}
            </option>
          ))}
        </select>
        {role === "principal" && hasPrincipal ? (
          <span className="hint">
            Un Principal est déjà en liste. La formule n&apos;en prévoit qu&apos;un. Vous pouvez tout de même
            l&apos;enregistrer.
          </span>
        ) : null}
      </div>
      <div className="ctas">
        <button className="cta" type="submit" disabled={pending}>
          {pending ? "Enregistrement…" : "Créer le sponsor"}
        </button>
      </div>
    </form>
  );
}
