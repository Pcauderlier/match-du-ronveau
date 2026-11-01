"use client";

import { useActionState } from "react";
import { emptyFormState, type FormState } from "@/lib/forms";

export function ActionButton({
  action,
  fields,
  label,
  pendingLabel = "…",
  confirmMessage,
  className = "cta small",
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  fields: Record<string, string>;
  label: string;
  pendingLabel?: string;
  confirmMessage?: string;
  className?: string;
}) {
  const [state, formAction, pending] = useActionState(action, emptyFormState);

  return (
    <form
      className="inline-form"
      action={formAction}
      onSubmit={(event) => {
        if (confirmMessage && !window.confirm(confirmMessage)) event.preventDefault();
      }}
    >
      {Object.entries(fields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <button className={className} type="submit" disabled={pending}>
        {pending ? pendingLabel : label}
      </button>
      {state.error ? <p className="feedback err">{state.error}</p> : null}
      {state.ok ? <p className="feedback ok">{state.ok}</p> : null}
    </form>
  );
}
