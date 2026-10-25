// Test de Laurent : vérification du flux branche laurent → pull request (à supprimer).
import type { Metadata } from "next";
import { Anton, Archivo, Bebas_Neue } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const archivo = Archivo({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lematchduronvau.be"),
  title: {
    default: "Le Match du Ronvau",
    template: "%s — Le Match du Ronvau",
  },
  description:
    "Match d'improvisation théâtrale Belgique – France, le samedi 22 mai 2027 à Chaumont-Gistoux. Une soirée du Lions Club au bénéfice des œuvres handicap et enfance.",
  icons: { icon: "/lions.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${anton.variable} ${archivo.variable} ${bebas.variable}`}
    >
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
