import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billetterie",
  description:
    "Tarifs du Match du Ronvau : dès 20 €, forfait repas et match à 47 €. 400 places le 22 mai 2027. Prévenez-nous pour l'ouverture de la billetterie.",
};

const PREINSCRIPTION_MAIL =
  "mailto:contact@lematchduronvau.be?subject=Pr%C3%A9-r%C3%A9servation%20-%20Le%20Match%20du%20Ronvau&body=Bonjour%2C%0A%0AJe%20souhaite%20%C3%AAtre%20pr%C3%A9venu%20de%20l%27ouverture%20de%20la%20billetterie.%0A%0ANom%20%3A%0ANombre%20de%20personnes%20%3A%0AFormule%20souhait%C3%A9e%20(match%20seul%20ou%20repas%20%2B%20match)%20%3A%0A%0AMerci%20%21";

export default function BilletteriePage() {
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
          <p>
            La billetterie en ligne ouvre en janvier 2027. D&apos;ici là, vous pouvez déjà nous
            signaler votre intérêt — nous vous préviendrons dès l&apos;ouverture, avant l&apos;annonce
            publique.
          </p>
          <div className="ctas">
            <a className="cta" href={PREINSCRIPTION_MAIL}>
              Être prévenu de l&apos;ouverture
            </a>
          </div>

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
