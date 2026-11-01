import type { Metadata } from "next";
import { desc } from "drizzle-orm";
import { connection } from "next/server";
import { logoutAdmin, supprimerPreinscription } from "@/app/actions/admin";
import { ActionButton } from "@/components/ActionButton";
import { SponsorActions } from "@/components/SponsorActions";
import { SponsorForm } from "@/components/SponsorForm";
import { withDb } from "@/db/client";
import { inscriptions, preinscriptions, sponsors } from "@/db/schema";
import { formatCode } from "@/lib/codes";
import { isBilleterieOuverte } from "@/lib/env";
import { compareRoles, FORMULE_LABEL, formatDate, ROLE_LABEL, type Formule } from "@/lib/labels";

export const metadata: Metadata = {
  title: "Administration",
  description: "Sponsors, préinscriptions et inscriptions du Match du Ronvau.",
  robots: { index: false, follow: false },
};

type Personne = {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  nombre: number;
  formule: Formule;
  createdAt: Date;
};

function PersonneTable({
  caption,
  rows,
  empty,
  removable = false,
}: {
  caption: string;
  rows: Personne[];
  empty: string;
  removable?: boolean;
}) {
  if (rows.length === 0) return <p>{empty}</p>;

  return (
    <div className="table-wrap">
      <table className="data">
        <caption className="sr">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">E-mail</th>
            <th scope="col">Téléphone</th>
            <th scope="col">Nombre</th>
            <th scope="col">Formule</th>
            <th scope="col">Date</th>
            {removable ? <th scope="col">Actions</th> : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.nom}</td>
              <td>{row.email}</td>
              <td>{row.telephone}</td>
              <td>{row.nombre}</td>
              <td>{FORMULE_LABEL[row.formule]}</td>
              <td>{formatDate(row.createdAt)}</td>
              {removable ? (
                <td>
                  <ActionButton
                    action={supprimerPreinscription}
                    fields={{ id: row.id }}
                    label="Supprimer"
                    confirmMessage="Supprimer cette préinscription ?"
                    className="cta small ghost"
                  />
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function AdminPage() {
  await connection();
  const ouverte = isBilleterieOuverte();
  const loaded = await withDb(async (db) => {
    const [sponsorRows, preRows, insRows] = await Promise.all([
      db.select().from(sponsors),
      db.select().from(preinscriptions).orderBy(desc(preinscriptions.createdAt)),
      db.select().from(inscriptions).orderBy(desc(inscriptions.createdAt)),
    ]);
    return { sponsorRows, preRows, insRows };
  });

  const dbError = loaded.ok ? null : loaded.error;
  const sponsorRows = loaded.ok
    ? [...loaded.data.sponsorRows].sort(
        (a, b) => compareRoles(a.role, b.role) || a.nom.localeCompare(b.nom, "fr"),
      )
    : [];
  const preRows = loaded.ok ? loaded.data.preRows : [];
  const insRows = loaded.ok ? loaded.data.insRows : [];
  const principaux = sponsorRows.filter((row) => row.role === "principal").length;

  return (
    <main>
      <section>
        <div className="wrap">
          <div className="page-head">
            <div>
              <p className="kick">Organisation</p>
              <h2>Administration</h2>
            </div>
            <form action={logoutAdmin}>
              <button className="cta ghost small" type="submit">
                Se déconnecter
              </button>
            </form>
          </div>

          {dbError ? (
            <div className="msg err" role="alert">
              {dbError}
            </div>
          ) : null}

          <div className="block">
            <h3>Sponsors</h3>
            <p>Créez un sponsor, notez son code, et transmettez-le lui pour l&apos;espace invités.</p>
            {principaux > 1 ? (
              <div className="msg" role="status">
                Plusieurs partenaires ont le rôle Principal. La formule n&apos;en prévoit qu&apos;un seul.
                Rien n&apos;est bloqué : supprimez le doublon si besoin.
              </div>
            ) : null}
            <SponsorForm hasPrincipal={principaux >= 1} />
            {dbError ? (
              <p>Liste indisponible tant que la base ne répond pas.</p>
            ) : sponsorRows.length === 0 ? (
              <p>Aucun sponsor pour l&apos;instant.</p>
            ) : (
              <div className="table-wrap">
                <table className="data">
                  <caption className="sr">Sponsors</caption>
                  <thead>
                    <tr>
                      <th scope="col">Nom</th>
                      <th scope="col">Rôle</th>
                      <th scope="col">E-mail</th>
                      <th scope="col">Téléphone</th>
                      <th scope="col">Code</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sponsorRows.map((sponsor) => (
                      <tr key={sponsor.id}>
                        <td>{sponsor.nom}</td>
                        <td>{ROLE_LABEL[sponsor.role]}</td>
                        <td>{sponsor.email}</td>
                        <td>{sponsor.telephone}</td>
                        <td>
                          <span className="code" translate="no">
                            {formatCode(sponsor.code)}
                          </span>
                        </td>
                        <td>
                          <SponsorActions id={sponsor.id} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="block">
            <h3>Préinscrits ({preRows.length})</h3>
            <p>Personnes qui veulent être prévenues avant l&apos;ouverture de janvier 2027.</p>
            {dbError ? (
              <p>Liste indisponible tant que la base ne répond pas.</p>
            ) : (
              <PersonneTable
                caption="Préinscrits"
                rows={preRows}
                empty="Aucune préinscription pour l'instant."
                removable
              />
            )}
          </div>

          <div className="block">
            <h3>Inscrits ({insRows.length})</h3>
            <p className="quiet">
              {ouverte
                ? "La billetterie publique est ouverte. Le formulaire d'inscription est sur la page Billetterie. Aucun paiement n'est encaissé ici."
                : "La billetterie publique est fermée. Le formulaire d'inscription reste masqué tant que BILLETTERIE_OUVERTE n'est pas true. Cette liste est vide d'ici là."}
            </p>
            {dbError ? (
              <p>Liste indisponible tant que la base ne répond pas.</p>
            ) : (
              <PersonneTable
                caption="Inscrits"
                rows={insRows}
                empty={
                  ouverte
                    ? "Aucune inscription pour l'instant."
                    : "Aucune inscription. La billetterie n'est pas encore ouverte."
                }
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
