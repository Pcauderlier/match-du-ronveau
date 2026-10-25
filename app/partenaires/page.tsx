import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partenaires",
  description:
    "Devenez partenaire du Match du Ronvau : formules de 100 € à 2 500 €, visibilité dans la commune de Chaumont-Gistoux de janvier à mai 2027.",
};

const PARTENARIAT_MAIL =
  "mailto:partenaires@lematchduronvau.be?subject=Partenariat%20-%20Le%20Match%20du%20Ronvau%2022%20mai%202027&body=Bonjour%2C%0A%0ANotre%20entreprise%20souhaite%20en%20savoir%20plus%20sur%20le%20partenariat.%0A%0AEntreprise%20%3A%0APersonne%20de%20contact%20%3A%0AT%C3%A9l%C3%A9phone%20%3A%0AFormule%20envisag%C3%A9e%20%3A%0A%0AMerci%20de%20me%20recontacter.";

export default function PartenairesPage() {
  return (
    <main>
      <section>
        <div className="wrap">
          <p className="kick">Devenir partenaire</p>
          <h2>
            Votre nom, quatre mois
            <br />
            dans la commune.
          </h2>
          <p>
            La campagne démarre en janvier 2027 et court jusqu&apos;à la soirée : <b>150 affiches</b>{" "}
            dans les commerces et les écoles, <b>5 000 flyers</b> toutes-boîtes, les réseaux sociaux,
            la presse locale — puis une soirée de contact direct avec 400 personnes.
          </p>

          <h3>Les formules</h3>
          <div className="packs">
            <div className="pk top">
              <div className="nm">
                <b>Partenaire principal</b>
                <span>Un seul partenaire</span>
              </div>
              <div className="px">2 500 €</div>
              <div className="ds">
                Votre nom associé à l&apos;événement sur tous les supports · deux panneaux au bord de
                la patinoire · page entière dans le booklet · citation à chaque prise de parole · 10
                forfaits repas + match · 4 invitations au verre officiel.
              </div>
            </div>
            <div className="pk">
              <div className="nm">
                <b>Partenaire Or</b>
                <span>Quatre maximum</span>
              </div>
              <div className="px">1 000 €</div>
              <div className="ds">
                Logo sur l&apos;affiche, le flyer et le booklet · un panneau de patinoire · demi-page
                booklet · citation en ouverture · 6 forfaits repas + match.
              </div>
            </div>
            <div className="pk">
              <div className="nm">
                <b>Partenaire Argent</b>
                <span>Huit maximum</span>
              </div>
              <div className="px">500 €</div>
              <div className="ds">
                Logo sur le flyer, le booklet et le site · panneau partagé au bord de la patinoire ·
                quart de page booklet · 4 places pour le match.
              </div>
            </div>
            <div className="pk">
              <div className="nm">
                <b>Partenaire Bronze</b>
                <span>Sans limite</span>
              </div>
              <div className="px">250 €</div>
              <div className="ds">
                Logo dans le booklet et sur ce site · mention sur les réseaux sociaux · 2 places pour
                le match.
              </div>
            </div>
            <div className="pk">
              <div className="nm">
                <b>Ami du Match</b>
                <span>Particuliers et indépendants</span>
              </div>
              <div className="px">100 €</div>
              <div className="ds">
                Votre nom dans la page « Ils nous ont soutenus » du booklet · 1 place pour le match.
              </div>
            </div>
          </div>

          <h3>Deux autres façons d&apos;aider</h3>
          <p>
            <b>Le partenariat en nature.</b> Boissons, denrées, impression, transport, matériel
            technique, lot pour la tombola : nous valorisons votre apport au prix du marché et vous
            plaçons dans la formule correspondante.
          </p>
          <p>
            <b>Le don simple.</b> Sans contrepartie publicitaire, affecté directement aux œuvres du
            club.
          </p>

          <div className="ctas">
            <a className="cta" href={PARTENARIAT_MAIL}>
              Demander le dossier de partenariat
            </a>
          </div>

          <figure>
            <img src="/plongee.jpg" alt="Vue plongeante sur la patinoire pendant une manche" />
            <figcaption>Photo © IMPROVISATION.BE</figcaption>
          </figure>

          <p className="note">
            Montants et contreparties proposés par la commission Ligue d&apos;Impro, soumis à la
            validation du comité du club. Les partenariats sont enregistrés par ordre de signature,
            dans la limite des places disponibles par formule. Le club n&apos;est pas assujetti à la
            TVA : les montants sont nets et font l&apos;objet d&apos;une note de frais de
            partenariat.
          </p>
        </div>
      </section>
    </main>
  );
}
