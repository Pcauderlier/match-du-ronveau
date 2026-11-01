import { eq } from "drizzle-orm";
import type { Database } from "@/db/client";
import { sponsors } from "@/db/schema";
import { generateCode } from "@/lib/codes";

export async function allocateCode(db: Database): Promise<string | null> {
  for (let attempt = 0; attempt < 6; attempt++) {
    const code = generateCode();
    const found = await db
      .select({ id: sponsors.id })
      .from(sponsors)
      .where(eq(sponsors.code, code))
      .limit(1);
    if (found.length === 0) return code;
  }
  return null;
}
