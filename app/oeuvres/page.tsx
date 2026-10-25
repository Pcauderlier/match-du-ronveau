import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nos œuvres",
  description:
    "Votre billet soutient les causes handicap et enfance du Lions Club de Chaumont-Gistoux. Bénévoles, aucun salaire : le solde de la soirée part aux œuvres.",
};

const AIDER_MAIL =
  "mailto:contact@lematchduronvau.be?subject=Je%20souhaite%20aider%20le%20Lions%20Club%20de%20Chaumont-Gistoux";

export default function OeuvresPage() {
  return (
    <main>
      <section>
        <div className="wrap">
          <p className="kick">Ce que vous soutenez</p>
          <h2>Où va votre billet.</h2>

          <div className="oeuvre">
            <p className="oeuvre-lead">
              <b>Le Lions Club de Chaumont-Gistoux est une association de bénévoles. Personne n&apos;y
              est rémunéré</b> — ni le soir du match, ni le reste de l&apos;année. Une fois les frais
              de la soirée couverts, tout ce qui reste part aux œuvres.
            </p>
          </div>

          <div className="flow">
            <div className="fl2">
              <div className="n">Vous payez</div>
              <b>
                Un billet
                <br />
                ou un forfait
              </b>
              <span>29 € l&apos;entrée, 47 € le repas et le match (40 € jusqu&apos;à 15 ans)</span>
            </div>
            <div className="fl2">
              <div className="n">Nous couvrons</div>
              <b>
                Les frais
                <br />
                de la soirée
              </b>
              <span>La salle, la troupe, le chapiteau, la technique, les denrées</span>
            </div>
            <div className="fl2">
              <div className="n">Le club verse</div>
              <b>
                Le solde
                <br />
                aux œuvres
              </b>
              <span>Décidé en assemblée, suivi par la commission des œuvres</span>
            </div>
          </div>

          <h3>Nos deux causes prioritaires</h3>
          <div className="causes">
            <div className="cause">
              <div className="lab">CAUSE 01</div>
              <h4>Le handicap</h4>
              <p>
                Soutien à des familles et à des institutions de la région : matériel adapté,
                aménagements, aide ponctuelle à des situations qui nous sont signalées près de chez
                nous.
              </p>
            </div>
            <div className="cause">
              <div className="lab">CAUSE 02</div>
              <h4>L&apos;enfance</h4>
              <p>
                Séjours, loisirs et activités pour des enfants qui n&apos;y auraient pas accès, et
                appui aux structures qui les accompagnent au quotidien dans le Brabant wallon.
              </p>
            </div>
          </div>

          <h3>Le mouvement Lions</h3>
          <p>
            Fondé en 1917, le mouvement Lions réunit aujourd&apos;hui plus de 1,4 million de membres
            dans le monde autour d&apos;une seule devise :{" "}
            <b>« Soutenir jusqu&apos;à ce que ce soit soutenu. »</b> Le club de Chaumont-Gistoux
            compte dix-sept membres et se réunit deux fois par mois.
          </p>

          <h3>Aider autrement</h3>
          <p>
            Devenir Ami du Match à partir de 100 €, soutenir une prochaine action, ou simplement nous
            rencontrer — nous cherchons toujours des bras.
          </p>
          <div className="ctas">
            <a className="cta" href={AIDER_MAIL}>
              Nous écrire
            </a>
            <Link className="cta ghost" href="/partenaires">
              Devenir partenaire
            </Link>
          </div>

          <figure>
            <img
              src="/rire.jpg"
              alt="Une comédienne en maillot bleu éclate de rire pendant une improvisation"
            />
            <figcaption>Photo © IMPROVISATION.BE</figcaption>
          </figure>

          <p className="note">
            Emplacement réservé au détail chiffré des œuvres soutenues sur l&apos;exercice en cours —
            à compléter par la commission des œuvres du club avant la mise en ligne.
          </p>
        </div>
      </section>
    </main>
  );
}
