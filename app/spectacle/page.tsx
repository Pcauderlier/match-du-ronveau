import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Le spectacle",
  description:
    "Règles du match d'improvisation, déroulé de la soirée du 22 mai 2027 et présentation d'IMPROVISATION.BE, partenaire artistique du Lions Club de Chaumont-Gistoux.",
};

export default function SpectaclePage() {
  return (
    <main>
      <section>
        <div className="wrap">
          <p className="kick">Le spectacle</p>
          <h2>
            Le hockey a donné
            <br />
            ses règles au théâtre.
          </h2>
          <p>
            Le match d&apos;improvisation naît au Québec dans les années 1970 : deux comédiens ont
            l&apos;idée de ramener au théâtre la patinoire, l&apos;arbitre et les maillots du hockey,
            pour attirer le public du sport. Le principe n&apos;a pas bougé depuis — et il fonctionne
            toujours aussi bien.
          </p>
          <p>
            Deux équipes s&apos;affrontent sur des thèmes tirés au sort, sans texte, sans décor et
            sans répétition. L&apos;arbitre siffle les fautes.{" "}
            <b>Et c&apos;est le public qui vote</b>, carton bleu ou carton rouge à la main, à la fin
            de chaque manche.
          </p>

          <h3>Les six règles à connaître</h3>
          <div className="steps">
            <div className="step">
              <div className="h">01</div>
              <div className="t">
                <b>L&apos;arbitre annonce le thème</b>
                <span>Tiré au sort · catégorie, nombre de joueurs, durée</span>
              </div>
            </div>
            <div className="step">
              <div className="h">02</div>
              <div className="t">
                <b>Vingt secondes de caucus</b>
                <span>C&apos;est tout ce que les équipes ont pour se mettre d&apos;accord</span>
              </div>
            </div>
            <div className="step">
              <div className="h">03</div>
              <div className="t">
                <b>Les équipes jouent</b>
                <span>Mixte : ensemble · Comparée : l&apos;une après l&apos;autre</span>
              </div>
            </div>
            <div className="step">
              <div className="h">04</div>
              <div className="t">
                <b>L&apos;arbitre siffle les fautes</b>
                <span>Cabotinage, rudesse, refus de plate-forme, cliché…</span>
              </div>
            </div>
            <div className="step">
              <div className="h">05</div>
              <div className="t">
                <b>Vous votez</b>
                <span>Levez le carton de l&apos;équipe que vous avez préférée</span>
              </div>
            </div>
            <div className="step">
              <div className="h">06</div>
              <div className="t">
                <b>On recommence</b>
                <span>Deux périodes, avec une pause de 30 minutes au milieu</span>
              </div>
            </div>
          </div>

          <figure>
            <img
              src="/arbitre.jpg"
              alt="L'arbitre brandit le carton annonçant le thème de la manche"
            />
            <figcaption>Photo © IMPROVISATION.BE</figcaption>
          </figure>

          <h3>Le déroulé de la soirée</h3>
          <div className="steps">
            <div className="step">
              <div className="h">18h</div>
              <div className="t">
                <b>Ouverture du chapiteau et repas</b>
                <span>Chili con carne · version végétarienne · bar</span>
              </div>
            </div>
            <div className="step">
              <div className="h">20h</div>
              <div className="t">
                <b>Mots d&apos;accueil et coup d&apos;envoi</b>
                <span>Présidente, bourgmestre, échevin des Sports, RCA · première période</span>
              </div>
            </div>
            <div className="step">
              <div className="h">21h</div>
              <div className="t">
                <b>Pause</b>
                <span>Trente minutes · la cafétéria vous attend</span>
              </div>
            </div>
            <div className="step">
              <div className="h">21h30</div>
              <div className="t">
                <b>Deuxième période</b>
                <span>Jusqu&apos;à la sirène</span>
              </div>
            </div>
            <div className="step">
              <div className="h">22h45</div>
              <div className="t">
                <b>Remise du chèque aux œuvres</b>
                <span>Verre de l&apos;amitié · rencontre avec les comédiens · fin vers 23h</span>
              </div>
            </div>
          </div>

          <h3>Notre partenaire artistique</h3>
          <p>
            <b>IMPROVISATION.BE</b> fait vivre l&apos;improvisation en Brabant wallon et à Bruxelles
            depuis 1999, avec quatre équipes vedettes — les Aigles, les Lions, les Pythons et les
            Requins — et des matchs réguliers à Wavre, Ottignies et Rixensart. Elle fournit les
            comédiens, l&apos;arbitre, le maître de cérémonie, les musiques et les scénarios.
          </p>

          <div className="ctas">
            <Link className="cta" href="/billetterie">
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
