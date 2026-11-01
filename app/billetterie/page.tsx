import type { Metadata } from "next";
import { connection } from "next/server";
import { DemandeForm } from "@/components/DemandeForm";
import { DB_MISSING, isBilleterieOuverte, isDatabaseConfigured } from "@/lib/env";

export const metadata: Metadata = {
  title: "Billetterie",
  description:
    "Tarifs du Match du Ronvau : dès 20 €, forfait repas et match à 47 €. 400 places le 22 mai 2027. Prévenez-nous pour l'ouverture de la billetterie.",
};

export default async function BilletteriePage() {
  await connection();
  const ouverte = isBilleterieOuverte();
  const dbReady = isDatabaseConfigured();
  return (
    <main>
      <section>
        <div className="wrap">
          <p className="kick">Billetterie</p>
          <h2>
            400 places.
            <br />
            Pas une de plus.
          </h2>
          <p>
            Le hall accueille 400 spectateurs et le chapiteau 200 couverts. Les forfaits repas
            partent en premier : c&apos;est la formule qui fait la soirée complète.
          </p>

          <div className="tarifs">
            <div className="tc">
              <b>29 €</b>
              <span>Adulte</span>
            </div>
            <div className="tc">
              <b>26 €</b>
              <span>Étudiant</span>
            </div>
            <div className="tc">
              <b>20 €</b>
              <span>Enfant jusqu&apos;à 15 ans</span>
            </div>
            <div className="tc hero2">
              <b>47 €</b>
              <span>Repas + match</span>
            </div>
            <div className="tc hero2">
              <b>40 €</b>
              <span>Repas + match jusqu&apos;à 15 ans</span>
            </div>
          </div>

          <h3>Ce que comprend le forfait à 47 €</h3>
          <div className="steps">
            <div className="step">
              <div className="h">18h</div>
              <div className="t">
                <b>Votre place à table sous le chapiteau</b>
                <span>Chili con carne · version végétarienne sur demande</span>
              </div>
            </div>
            <div className="step">
              <div className="h">20h</div>
              <div className="t">
                <b>Votre place pour le match</b>
                <span>Placement libre autour de la patinoire</span>
              </div>
            </div>
          </div>

          <h3>Réserver</h3>
          {ouverte ? (
            <p>
              La billetterie est ouverte. Indiquez le nombre de personnes et la formule. Aucun
              paiement n&apos;est demandé ici : nous vous recontactons pour la suite.
            </p>
          ) : (
            <p>
              La billetterie en ligne ouvre en janvier 2027. D&apos;ici là, vous pouvez déjà nous
              signaler votre intérêt — nous vous préviendrons dès l&apos;ouverture, avant l&apos;annonce
              publique.
            </p>
          )}
          {dbReady ? null : (
            <div className="msg err" role="alert">
              {DB_MISSING}
            </div>
          )}
          <DemandeForm mode={ouverte ? "inscription" : "preinscription"} ready={dbReady} />

          <figure>
            <img src="/salle.jpg" alt="Le public debout applaudit à la fin de la rencontre" />
            <figcaption>Photo © IMPROVISATION.BE</figcaption>
          </figure>

          <p className="note">
            Adresse de billetterie et système de réservation en ligne à mettre en place avant janvier
            2027.
          </p>
        </div>
      </section>
    </main>
  );
}
