"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/spectacle", label: "Le spectacle" },
  { href: "/oeuvres", label: "Nos œuvres" },
  { href: "/billetterie", label: "Billetterie" },
  { href: "/partenaires", label: "Partenaires" },
  { href: "/infos", label: "Infos pratiques" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bar">
      <div className="wrap barin">
        <Link className="brand" href="/">
          <img src="/lions.png" alt="Lions Club de Chaumont-Gistoux" />
          <span>
            <span className="n">
              Le Match <i>du</i> Ronvau
            </span>
            <span className="d">22.05.2027</span>
          </span>
        </Link>
        <nav aria-label="Sections du site">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
