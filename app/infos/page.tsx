import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Infos pratiques",
  description:
    "Centre sportif André Docquier, avenue du Ronvau 8 à Chaumont-Gistoux. Parking gratuit, accès PMR, horaires et contacts de la soirée du 22 mai 2027.",
};

export default function InfosPage() {
  return (
    <main>
      <section>
        <div className="wrap">
          <p className="kick">Infos pratiques</p>
          <h2>Venir au Ronvau.</h2>

          <div className="grid2">
            <dl className="info">
              <dt>LE LIEU</dt>
              <dd>
                <b>Centre sportif André Docquier</b>
                <br />
                Avenue du Ronvau 8
                <br />
                1325 Chaumont-Gistoux
              </dd>
              <dt>SE GARER</dt>
              <dd>
                Grand parking gratuit devant le hall, fléché et accueilli par nos hôtesses le soir
                même. Le parking arrière est réservé aux officiels et aux équipes.
              </dd>
              <dt>ACCESSIBILITÉ</dt>
              <dd>
                Hall, chapiteau et sanitaires accessibles aux personnes à mobilité réduite. Le
                cheminement entre le chapiteau et le hall fait une vingtaine de mètres, à couvert.
              </dd>
            </dl>
            <dl className="info">
              <dt>LES HORAIRES</dt>
              <dd>Chapiteau 18h00 – 19h45 · Soirée au hall 20h00 – 23h00 · Cafétéria 18h00 – 00h00</dd>
              <dt>SUR PLACE</dt>
              <dd>
                Le chapiteau ferme à 19h45. À partir de cette heure, la cafétéria du centre sportif,
                exploitée par la Régie communale autonome, devient le point de vente des boissons.
              </dd>
              <dt>POUR QUI ?</dt>
              <dd>
                Tout public. Le spectacle est familial et se suit sans rien connaître à
                l&apos;improvisation — les règles sont expliquées en ouverture.
              </dd>
            </dl>
          </div>

          <h3>Nous écrire</h3>
          <div className="grid2">
            <dl className="info">
              <dt>QUESTIONS ET RÉSERVATIONS</dt>
              <dd>
                <a href="mailto:contact@lematchduronvau.be">contact@lematchduronvau.be</a>
              </dd>
              <dt>PARTENARIATS</dt>
              <dd>
                <a href="mailto:partenaires@lematchduronvau.be">partenaires@lematchduronvau.be</a>
              </dd>
            </dl>
            <dl className="info">
              <dt>PRESSE ET PROTOCOLE</dt>
              <dd>
                <a href="mailto:protocole@lematchduronvau.be">protocole@lematchduronvau.be</a>
              </dd>
              <dt>ORGANISATION</dt>
              <dd>
                Commission Ligue d&apos;Impro
                <br />
                Lions Club de Chaumont-Gistoux
              </dd>
            </dl>
          </div>

          <p className="note">
            Adresses de contact à créer avant la mise en ligne publique. Le numéro de GSM n&apos;est
            volontairement pas publié.
          </p>
        </div>
      </section>
    </main>
  );
}
