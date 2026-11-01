"use client";

import { useActionState, useEffect, useRef } from "react";
import { envoyerInscription, envoyerPreinscription } from "@/app/actions/billetterie";
import { emptyFormState } from "@/lib/forms";
import { FORMULE_LABEL, FORMULES } from "@/lib/labels";

export function DemandeForm({
  mode,
  ready,
}: {
  mode: "preinscription" | "inscription";
  ready: boolean;
}) {
  const action = mode === "inscription" ? envoyerInscription : envoyerPreinscription;
  const [state, formAction, pending] = useActionState(action, emptyFormState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);

  const submitLabel =
    mode === "inscription" ? "Enregistrer l'inscription" : "Être prévenu de l'ouverture";

  return (
    <form ref={formRef} action={formAction} className="form">
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
        <label htmlFor="demande-nom">Nom</label>
        <input id="demande-nom" name="nom" type="text" required maxLength={120} autoComplete="name" />
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="demande-email">E-mail</label>
          <input id="demande-email" name="email" type="email" required maxLength={180} autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="demande-telephone">Téléphone</label>
          <input
            id="demande-telephone"
            name="telephone"
            type="tel"
            required
            maxLength={40}
            autoComplete="tel"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="demande-nombre">Nombre de personnes</label>
          <input
            id="demande-nombre"
            name="nombre"
            type="number"
            required
            min={1}
            max={50}
            inputMode="numeric"
          />
        </div>
        <div className="field">
          <label htmlFor="demande-formule">Formule</label>
          <select id="demande-formule" name="formule" required defaultValue="">
            <option value="" disabled>
              Choisir
            </option>
            {FORMULES.map((formule) => (
              <option key={formule} value={formule}>
                {FORMULE_LABEL[formule]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="ctas">
        <button className="cta" type="submit" disabled={pending || !ready}>
          {pending ? "Enregistrement…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
