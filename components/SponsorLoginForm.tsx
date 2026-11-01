"use client";

import { useActionState } from "react";
import { loginSponsor } from "@/app/actions/sponsor";
import { emptyFormState } from "@/lib/forms";

export function SponsorLoginForm({ blocked }: { blocked: boolean }) {
  const [state, action, pending] = useActionState(loginSponsor, emptyFormState);

  return (
    <form action={action} className="form">
      {state.error && !blocked ? (
        <div className="msg err" role="alert">
          {state.error}
        </div>
      ) : null}
      <div className="field">
        <label htmlFor="sponsor-code">Code</label>
        <input
          id="sponsor-code"
          name="code"
          type="text"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          required
          maxLength={16}
          placeholder="ABCD-EFGH"
        />
      </div>
      <div className="ctas">
        <button className="cta" type="submit" disabled={pending}>
          {pending ? "Vérification…" : "Entrer"}
        </button>
      </div>
    </form>
  );
}
