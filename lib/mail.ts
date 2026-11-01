import { mailjetSettings } from "@/lib/env";

const SUBJECT = "Préinscription confirmée — Le Match du Ronvau";
const MAILJET_SEND_URL = "https://api.mailjet.com/v3.1/send";

export type PreinscriptionRecipient = {
  nom: string;
  email: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function textBody(nom: string): string {
  return [
    `Bonjour ${nom},`,
    "",
    "Votre préinscription pour Le Match du Ronvau a bien été prise en compte.",
    "",
    "Vous recevrez un e-mail quand la billetterie ouvrira, en janvier 2027.",
    "",
    "Rappel de la soirée :",
    "samedi 22 mai 2027",
    "Centre sportif André Docquier, Chaumont-Gistoux",
    "Repas à 18h, match à 20h.",
    "",
    "À bientôt,",
    "Le Match du Ronvau",
  ].join("\n");
}

function htmlBody(nom: string): string {
  const safeNom = escapeHtml(nom);
  return [
    `<p>Bonjour ${safeNom},</p>`,
    "<p>Votre préinscription pour Le Match du Ronvau a bien été prise en compte.</p>",
    "<p>Vous recevrez un e-mail quand la billetterie ouvrira, en janvier 2027.</p>",
    "<p>Rappel de la soirée :<br>",
    "samedi 22 mai 2027<br>",
    "Centre sportif André Docquier, Chaumont-Gistoux<br>",
    "Repas à 18h, match à 20h.</p>",
    "<p>À bientôt,<br>Le Match du Ronvau</p>",
  ].join("");
}

function logMailFailure(detail: string) {
  console.error(`E-mail de confirmation non envoyé (${detail}).`);
}

export async function sendPreinscriptionConfirmation(
  recipient: PreinscriptionRecipient,
): Promise<boolean> {
  const settings = mailjetSettings();
  if (!settings) {
    logMailFailure("Mailjet n'est pas configuré");
    return false;
  }

  const nom = recipient.nom.replace(/\s+/g, " ").trim();
  const email = recipient.email.trim();
  const message = {
    From: { Email: settings.fromEmail, Name: settings.fromName },
    To: [{ Email: email, Name: nom }],
    Subject: SUBJECT,
    TextPart: textBody(nom),
    HTMLPart: htmlBody(nom),
  };

  const token = Buffer.from(`${settings.apiKey}:${settings.apiSecret}`, "utf8").toString("base64");

  try {
    const response = await fetch(MAILJET_SEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Messages: [message] }),
      signal: AbortSignal.timeout(12_000),
    });

    let mailStatus = "";
    try {
      const payload = (await response.json()) as { Messages?: { Status?: string }[] };
      mailStatus = payload.Messages?.[0]?.Status ?? "";
    } catch {
      mailStatus = "";
    }

    if (response.ok && mailStatus === "success") return true;

    const statusLabel = mailStatus ? `HTTP ${response.status}, ${mailStatus}` : `HTTP ${response.status}`;
    logMailFailure(`Mailjet, ${statusLabel}`);
    return false;
  } catch {
    logMailFailure("Mailjet injoignable");
    return false;
  }
}
