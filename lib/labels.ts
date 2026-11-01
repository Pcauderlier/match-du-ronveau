export const ROLES = ["principal", "or", "argent", "bronze"] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LABEL: Record<Role, string> = {
  principal: "Principal",
  or: "Or",
  argent: "Argent",
  bronze: "Bronze",
};

/** Noms que le sponsor peut encore ajouter : il occupe déjà une place du forfait. */
export const GUEST_LIMIT: Record<Role, number> = {
  principal: 9,
  or: 5,
  argent: 3,
  bronze: 1,
};

export const GUEST_QUOTA_NOTE =
  "Vous êtes déjà inclus dans le forfait : ces places sont pour vos invités.";

export function guestLimitMessage(role: Role): string {
  const max = GUEST_LIMIT[role];
  const places = max > 1 ? `${max} invités` : "1 invité";
  return `Limite atteinte : un sponsor ${ROLE_LABEL[role]} peut ajouter ${places} au maximum.`;
}

export const FORMULES = ["match", "repas"] as const;
export type Formule = (typeof FORMULES)[number];

export const FORMULE_LABEL: Record<Formule, string> = {
  match: "Match seul",
  repas: "Repas + match",
};

export function isRole(value: string): value is Role {
  return (ROLES as readonly string[]).includes(value);
}

export function isFormule(value: string): value is Formule {
  return (FORMULES as readonly string[]).includes(value);
}

const ROLE_RANK: Record<Role, number> = {
  principal: 0,
  or: 1,
  argent: 2,
  bronze: 3,
};

export function compareRoles(a: Role, b: Role): number {
  return ROLE_RANK[a] - ROLE_RANK[b];
}

export function formatDate(value: Date | string): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("fr-BE", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Brussels",
  }).format(date);
}
