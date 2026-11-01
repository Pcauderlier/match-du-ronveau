"use client";

import { useActionState } from "react";
import { loginAdmin } from "@/app/actions/admin";
import { emptyFormState } from "@/lib/forms";

export function AdminLoginForm({ configured }: { configured: boolean }) {
  const [state, action, pending] = useActionState(loginAdmin, emptyFormState);

  return (
    <form action={action} className="form">
      {state.error && configured ? (
        <div className="msg err" role="alert">
          {state.error}
        </div>
      ) : null}
      <div className="field">
        <label htmlFor="admin-password">Mot de passe</label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          maxLength={200}
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
