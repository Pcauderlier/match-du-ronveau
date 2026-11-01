import { defineConfig } from "drizzle-kit";

function pick(names: string[]): string {
  for (const name of names) {
    const value = process.env[name]?.trim() ?? "";
    if (!/^postgres(?:ql)?:\/\//i.test(value)) continue;
    return value;
  }
  return "";
}

const url =
  pick(["DB_RONVEAU_POSTGRES_URL_NON_POOLING"]) ||
  pick(["DB_RONVEAU_DATABASE_URL", "DATABASE_URL", "POSTGRES_URL"]);

export default defineConfig({
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url,
  },
});
