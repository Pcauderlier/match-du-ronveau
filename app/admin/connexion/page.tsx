import type { Metadata } from "next";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { ADMIN_PASSWORD_MISSING, isAdminPasswordConfigured } from "@/lib/env";
import { getAdminSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Accès réservé à l'organisation du Match du Ronvau.",
  robots: { index: false, follow: false },
};

export default async function AdminConnexionPage() {
  await connection();
  if (await getAdminSession()) redirect("/admin");

  const configured = isAdminPasswordConfigured();

  return (
    <main>
      <section>
        <div className="wrap">
          <p className="kick">Organisation</p>
          <h2>Connexion</h2>
          <p>Page réservée à l&apos;équipe du Match du Ronvau.</p>
          {configured ? null : (
            <div className="msg err" role="alert">
              {ADMIN_PASSWORD_MISSING}
            </div>
          )}
          <AdminLoginForm configured={configured} />
        </div>
      </section>
    </main>
  );
}
