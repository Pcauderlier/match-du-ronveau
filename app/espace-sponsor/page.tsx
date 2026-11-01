import type { Metadata } from "next";
import { asc, eq } from "drizzle-orm";
import { connection } from "next/server";
import { logoutSponsor } from "@/app/actions/sponsor";
import { InviteActions } from "@/components/InviteActions";
import { InviteForm } from "@/components/InviteForm";
import { SponsorLoginForm } from "@/components/SponsorLoginForm";
import { withDb } from "@/db/client";
import { invites, sponsors } from "@/db/schema";
import { formatCode } from "@/lib/codes";
import { DB_MISSING, isAdminPasswordConfigured, isDatabaseConfigured } from "@/lib/env";
import { GUEST_LIMIT, guestLimitMessage, ROLE_LABEL } from "@/lib/labels";
import { getSponsorSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Espace sponsor",
  description: "Liste d'invités du partenaire, accessible avec le code remis par l'organisation.",
  robots: { index: false, follow: false },
};

export default async function EspaceSponsorPage() {
  await connection();
  const session = await getSponsorSession();

  if (!session) {
    return (
      <main>
        <section>
          <div className="wrap">
            <p className="kick">Partenaires</p>
            <h2>Espace sponsor</h2>
            <p>
              Entrez le code remis par l&apos;organisation. Il ouvre uniquement votre liste
              d&apos;invités.
            </p>
            {isAdminPasswordConfigured() ? null : (
              <div className="msg err" role="alert">
                Pour ouvrir une session, renseignez ADMIN_PASSWORD. Ce mot de passe signe le cookie.
              </div>
            )}
            {isDatabaseConfigured() ? null : (
              <div className="msg err" role="alert">
                {DB_MISSING}
              </div>
            )}
            <SponsorLoginForm blocked={!isAdminPasswordConfigured() || !isDatabaseConfigured()} />
          </div>
        </section>
      </main>
    );
  }

  const loaded = await withDb(async (db) => {
    const rows = await db.select().from(sponsors).where(eq(sponsors.id, session.sponsorId)).limit(1);
    const sponsor = rows[0];
    if (!sponsor) return null;
    const guestList = await db
      .select({ id: invites.id, nom: invites.nom })
      .from(invites)
      .where(eq(invites.sponsorId, sponsor.id))
      .orderBy(asc(invites.nom));
    return { sponsor, guestList };
  });

  if (!loaded.ok || !loaded.data) {
    return (
      <main>
        <section>
          <div className="wrap">
            <p className="kick">Partenaires</p>
            <h2>Espace sponsor</h2>
            <div className="msg err" role="alert">
              {loaded.ok
                ? "Ce sponsor n'existe plus. Déconnectez-vous et demandez un nouveau code."
                : loaded.error}
            </div>
            <form action={logoutSponsor}>
              <button className="cta ghost" type="submit">
                Se déconnecter
              </button>
            </form>
          </div>
        </section>
      </main>
    );
  }

  const { sponsor, guestList } = loaded.data;
  const maxInvites = GUEST_LIMIT[sponsor.role];
  const restants = Math.max(0, maxInvites - guestList.length);

  return (
    <main>
      <section>
        <div className="wrap">
          <div className="page-head">
            <div>
              <p className="kick">{ROLE_LABEL[sponsor.role]}</p>
              <h2>{sponsor.nom}</h2>
            </div>
            <form action={logoutSponsor}>
              <button className="cta ghost small" type="submit">
                Se déconnecter
              </button>
            </form>
          </div>
          <p>
            Ajoutez ou retirez vos invités. Cette liste n&apos;est visible que par vous et
            l&apos;organisation.
          </p>
          <p>
            Votre code :{" "}
            <span className="code" translate="no">
              {formatCode(sponsor.code)}
            </span>
          </p>

          <h3>Ajouter un invité</h3>
          <p>
            Invités : <span className="code">{guestList.length} / {maxInvites}</span>
          </p>
          <p className="quiet">
            {restants === 0
              ? guestLimitMessage(sponsor.role)
              : `Vous pouvez encore en ajouter ${restants}.`}
          </p>
          <InviteForm complet={restants === 0} />

          <h3>Invités ({guestList.length} / {maxInvites})</h3>
          {guestList.length === 0 ? (
            <p>Aucun invité pour l&apos;instant.</p>
          ) : (
            <div className="table-wrap">
              <table className="data">
                <caption className="sr">Vos invités</caption>
                <thead>
                  <tr>
                    <th scope="col">Nom et prénom</th>
                    <th scope="col">
                      <span className="sr">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {guestList.map((invite) => (
                    <tr key={invite.id}>
                      <td>{invite.nom}</td>
                      <td>
                        <InviteActions id={invite.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
