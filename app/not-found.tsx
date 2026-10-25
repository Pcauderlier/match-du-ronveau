import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable",
  description:
    "Cette page n'existe pas. Retrouvez Le Match du Ronvau, le samedi 22 mai 2027 à Chaumont-Gistoux.",
};

export default function NotFound() {
  return (
    <main>
      <section>
        <div className="wrap">
          <p className="kick">404</p>
          <h2>Cette page n&apos;existe pas.</h2>
          <p>Le match, lui, a bien lieu le samedi 22 mai 2027.</p>
          <div className="ctas">
            <Link className="cta" href="/">
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
