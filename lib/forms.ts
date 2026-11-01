import { isFormule, isRole, type Formule, type Role } from "@/lib/labels";

export type FormState = {
  error: string;
  ok: string;
};

export const emptyFormState: FormState = { error: "", ok: "" };

export function fail(error: string): FormState {
  return { error, ok: "" };
}

export function success(ok: string): FormState {
  return { error: "", ok };
}

export type Contact = {
  nom: string;
  email: string;
  telephone: string;
};

export function readContact(formData: FormData): Contact | FormState {
  const nom = String(formData.get("nom") ?? "")
    .replace(/\s+/g, " ")
    .trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const telephone = String(formData.get("telephone") ?? "").trim();

  if (nom.length < 2 || nom.length > 120) {
    return fail("Indiquez un nom (2 à 120 caractères).");
  }
  if (email.length > 180 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return fail("Indiquez un e-mail valide.");
  }
  if (telephone.length < 6 || telephone.length > 40) {
    return fail("Indiquez un numéro de téléphone.");
  }

  return { nom, email, telephone };
}

export function isContact(value: Contact | FormState): value is Contact {
  return !("error" in value);
}

export function readGuestName(formData: FormData): { nom: string } | FormState {
  const nom = String(formData.get("nom") ?? "")
    .replace(/\s+/g, " ")
    .trim();
  if (nom.length < 2 || nom.length > 120) {
    return fail("Indiquez le nom et le prénom (2 à 120 caractères).");
  }
  return { nom };
}

export function isGuestName(value: { nom: string } | FormState): value is { nom: string } {
  return !("error" in value);
}

export function readRole(formData: FormData): Role | FormState {
  const role = String(formData.get("role") ?? "");
  if (!isRole(role)) return fail("Choisissez un rôle : Principal, Or, Argent ou Bronze.");
  return role;
}

export type Demande = Contact & {
  nombre: number;
  formule: Formule;
};

export function readDemande(formData: FormData): Demande | FormState {
  const contact = readContact(formData);
  if (!isContact(contact)) return contact;

  const nombre = Number(String(formData.get("nombre") ?? "").trim());
  if (!Number.isInteger(nombre) || nombre < 1 || nombre > 50) {
    return fail("Indiquez un nombre de personnes entre 1 et 50.");
  }

  const formule = String(formData.get("formule") ?? "");
  if (!isFormule(formule)) return fail("Choisissez une formule.");

  return { ...contact, nombre, formule };
}

export function isDemande(value: Demande | FormState): value is Demande {
  return !("error" in value && "ok" in value);
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUuid(value: string): boolean {
  return UUID_RE.test(value);
}
