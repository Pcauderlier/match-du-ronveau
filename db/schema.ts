import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const sponsorRoleEnum = pgEnum("sponsor_role", [
  "principal",
  "or",
  "argent",
  "bronze",
]);

export const formuleEnum = pgEnum("billet_formule", ["match", "repas"]);

export const sponsors = pgTable("sponsors", {
  id: uuid("id").primaryKey().defaultRandom(),
  nom: text("nom").notNull(),
  role: sponsorRoleEnum("role").notNull(),
  code: text("code").notNull().unique(),
  email: text("email").notNull(),
  telephone: text("telephone").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const invites = pgTable(
  "invites",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sponsorId: uuid("sponsor_id")
      .notNull()
      .references(() => sponsors.id, { onDelete: "cascade" }),
    nom: text("nom").notNull(),
    email: text("email"),
    telephone: text("telephone"),
  },
  (table) => [index("invites_sponsor_id_idx").on(table.sponsorId)],
);

export const preinscriptions = pgTable("preinscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  nom: text("nom").notNull(),
  email: text("email").notNull(),
  telephone: text("telephone").notNull(),
  nombre: integer("nombre").notNull(),
  formule: formuleEnum("formule").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const inscriptions = pgTable("inscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  nom: text("nom").notNull(),
  email: text("email").notNull(),
  telephone: text("telephone").notNull(),
  nombre: integer("nombre").notNull(),
  formule: formuleEnum("formule").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
