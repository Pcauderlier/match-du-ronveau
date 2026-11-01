function readRaw(name: string): string {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

export function readEnv(name: string): string {
  return readRaw(name);
}

const POOLED_DATABASE_KEYS = [
  "DB_RONVEAU_DATABASE_URL",
  "DATABASE_URL",
  "POSTGRES_URL",
] as const;

function usableDatabaseUrl(name: string): string {
  const value = readRaw(name);
  if (!/^postgres(?:ql)?:\/\//i.test(value)) return "";
  return value;
}

export function databaseUrl(): string {
  for (const name of POOLED_DATABASE_KEYS) {
    const value = usableDatabaseUrl(name);
    if (value) return value;
  }
  return "";
}

export function isDatabaseConfigured(): boolean {
  return databaseUrl().length > 0;
}

export function isAdminPasswordConfigured(): boolean {
  return readRaw("ADMIN_PASSWORD").length > 0;
}

export function isBilleterieOuverte(): boolean {
  return readRaw("BILLETTERIE_OUVERTE").toLowerCase() === "true";
}

export type MailjetSettings = {
  apiKey: string;
  apiSecret: string;
  fromEmail: string;
  fromName: string;
};

export function mailjetSettings(): MailjetSettings | null {
  const apiKey = readRaw("MJ_APIKEY_PUBLIC");
  const apiSecret = readRaw("MJ_APIKEY_PRIVATE");
  const fromEmail = readRaw("MAILJET_FROM_EMAIL");
  const fromName = readRaw("MAILJET_FROM_NAME");
  if (!apiKey || !apiSecret || !fromEmail || !fromName) return null;
  return { apiKey, apiSecret, fromEmail, fromName };
}

export const DB_MISSING =
  "La base de données n'est pas configurée. Il faut DB_RONVEAU_DATABASE_URL (ou DATABASE_URL) dans l'environnement.";

export const DB_UNREACHABLE =
  "Impossible de joindre la base. Vérifiez DB_RONVEAU_DATABASE_URL, puis relancez la création des tables.";

export const ADMIN_PASSWORD_MISSING =
  "Le mot de passe administrateur n'est pas configuré. Renseignez ADMIN_PASSWORD dans les variables d'environnement, puis réessayez.";
