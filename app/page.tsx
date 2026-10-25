import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute: "Le Match du Ronvau — Improvisation Belgique–France, 22 mai 2027",
  },
  description:
    "Match d'improvisation théâtrale Belgique – France le 22 mai 2027 à Chaumont-Gistoux. Repas à 18h, coup d'envoi à 20h. Le bénéfice va aux œuvres du Lions Club.",
};

export default function HomePage() {
  return (
    <main>
      <div className="hero">
        <div className="bg">
          <img
            src="/hero.jpg"
            alt="Un match d'improvisation vu de la passerelle : la patinoire, l'arbitre et les deux équipes"
          />
        </div>
        <div className="wrap in">
          <p className="kick">Match d&apos;improvisation théâtrale · Tout public</p>
          <h1>
            Le match <span className="du">du</span> Ronvau
          </h1>
          <div className="rule" />
          <div className="duel">
            <div className="tm">
              <div className="n">Belgique</div>
              <div className="fl">
                <i style={{ background: "#0B0B0B" }} />
                <i style={{ background: "#F2A31B" }} />
                <i style={{ background: "#D8202C" }} />
              </div>
            </div>
            <div className="xx">✕</div>
            <div className="tm">
              <div className="n">France</div>
              <div className="fl">
                <i style={{ background: "#00338D" }} />
                <i style={{ background: "#F4F1EA" }} />
                <i style={{ background: "#D8202C" }} />
              </div>
            </div>
          </div>
          <p className="lead">
            Deux équipes, une patinoire, un arbitre et ses cartons. Les comédiens montent sur la
            glace sans texte, sans décor et sans filet — et c&apos;est <b>vous</b> qui votez.
          </p>
          <div className="ctas">
            <Link className="cta" href="/billetterie">
              Réserver ma place
            </Link>
            <Link className="cta ghost" href="/oeuvres">
              Ce que soutient votre billet
            </Link>
          </div>
        </div>
      </div>

      <div className="datebar">
        <div className="wrap datein">
          <div>
            <div className="j">Samedi</div>
            <div className="d">22 mai 2027</div>
          </div>
          <div className="r">
            18h00 — Repas sous chapiteau
            <span>20h00 — Coup d&apos;envoi du match</span>
          </div>
          <div className="r">
            Centre sportif André Docquier
            <span>Avenue du Ronvau 8 · Chaumont-Gistoux</span>
          </div>
        </div>
      </div>

      <section>
        <div className="wrap">
          <p className="kick">Une soirée du Lions Club de Chaumont-Gistoux</p>
          <h2>
            Un samedi soir où
            <br />
            personne ne sait
            <br />
            ce qui va se passer.
          </h2>
          <p>
            Le Lions Club de Chaumont-Gistoux reçoit <b>IMPROVISATION.BE</b> pour une rencontre
            internationale Belgique – France, précédée d&apos;un repas sous chapiteau. Un spectacle
            familial, drôle et imprévisible, des grands-parents aux enfants.
          </p>
          <p>
            <b>L&apos;intégralité du bénéfice va aux œuvres du club</b> — causes handicap et enfance.
          </p>

          <div className="kpis">
            <div className="kpi">
              <b>400</b>
              <span>
                Places
                <br />
                disponibles
              </span>
            </div>
            <div className="kpi">
              <b>200</b>
              <span>
                Couverts
                <br />
                au chapiteau
              </span>
            </div>
            <div className="kpi">
              <b>17</b>
              <span>
                Comédiens
                <br />
                et arbitres
              </span>
            </div>
            <div className="kpi">
              <b>100 %</b>
              <span>
                Du bénéfice
                <br />
                aux œuvres
              </span>
            </div>
          </div>

          <figure>
            <img src="/public.jpg" alt="Les équipes saluent une salle comble à la fin du match" />
            <figcaption>Photo © IMPROVISATION.BE</figcaption>
          </figure>
        </div>
      </section>
    </main>
  );
}
