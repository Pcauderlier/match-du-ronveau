import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";
import { databaseUrl, DB_MISSING, DB_UNREACHABLE } from "@/lib/env";

export type Database = NeonHttpDatabase<typeof schema>;

export function getDb(): Database | null {
  const url = databaseUrl();
  if (!url) return null;
  return drizzle(neon(url), { schema });
}

export type DbResult<T> = { ok: true; data: T } | { ok: false; error: string };

function logDbError(error: unknown) {
  const raw = error instanceof Error ? error.message : String(error);
  const safe = raw.replace(/postgres(?:ql)?:\/\/\S+/gi, "[url]").slice(0, 400);
  console.error("Erreur base de données:", safe);
}

export async function withDb<T>(fn: (db: Database) => Promise<T>): Promise<DbResult<T>> {
  const db = getDb();
  if (!db) return { ok: false, error: DB_MISSING };
  try {
    return { ok: true, data: await fn(db) };
  } catch (error) {
    logDbError(error);
    return { ok: false, error: DB_UNREACHABLE };
  }
}
