import { mailjetSettings } from "@/lib/env";

const SUBJECT = "Préinscription confirmée — Le Match du Ronvau";
const MAILJET_SEND_URL = "https://api.mailjet.com/v3.1/send";
const LOGO_URL = "https://lematchduronvau.be/lions.png";

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

function publicMailError(value: string): string {
  return value.replace(/\b[a-f0-9]{32}\b/gi, "[clef]").slice(0, 500);
}

function textBody(nom: string): string {
  return [
    `Bonjour ${nom},`,
    "",
    "Votre préinscription pour Le Match du Ronvau a bien été prise en compte.",
    "",
    "Vous recevrez un e-mail quand la billetterie ouvrira, en janvier 2027.",
    "",
    "La soirée :",
    "samedi 22 mai 2027",
    "Centre sportif André Docquier",
    "avenue du Ronvau 8, Chaumont-Gistoux",
    "Repas à 18h, coup d'envoi à 20h.",
    "",
    "À bientôt,",
    "Le Match du Ronvau",
    "https://lematchduronvau.be",
  ].join("\n");
}

function htmlBody(nom: string): string {
  const safeNom = escapeHtml(nom);
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>${escapeHtml(SUBJECT)}</title>
</head>
<body style="margin:0;padding:0;background-color:#08090C;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#08090C;">
    Votre préinscription est prise en compte. La billetterie ouvrira en janvier 2027.
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#08090C" style="background-color:#08090C;margin:0;padding:0;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;">
          <tr>
            <td style="padding:0 0 22px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle" style="padding:0 14px 0 0;">
                    <img src="${LOGO_URL}" width="72" height="68" alt="Lions Club de Chaumont-Gistoux" style="display:block;width:72px;height:68px;border:0;outline:none;text-decoration:none;">
                  </td>
                  <td valign="middle">
                    <div style="font-family:Impact,'Arial Narrow',Arial,sans-serif;font-size:22px;line-height:0.95;letter-spacing:0.02em;text-transform:uppercase;color:#F4F1EA;">
                      Le Match <span style="color:#D8202C;">du</span> Ronvau
                    </div>
                    <div style="font-family:'Arial Narrow',Arial,sans-serif;font-size:13px;line-height:1.2;letter-spacing:0.24em;text-transform:uppercase;color:#F2A31B;padding-top:6px;">
                      22.05.2027
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td bgcolor="#F2A31B" height="5" style="height:5px;background-color:#F2A31B;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 0 0;">
              <div style="font-family:'Arial Narrow',Arial,sans-serif;font-size:13px;line-height:1.2;letter-spacing:0.28em;text-transform:uppercase;color:#F2A31B;padding:0 0 12px;">
                Billetterie
              </div>
              <div style="font-family:Impact,'Arial Narrow',Arial,sans-serif;font-size:34px;line-height:0.95;letter-spacing:0.01em;text-transform:uppercase;color:#F4F1EA;">
                Préinscription confirmée
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.65;color:#F4F1EA;">
              Bonjour ${safeNom},
            </td>
          </tr>
          <tr>
            <td style="padding:14px 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.65;color:#F4F1EA;">
              Votre préinscription pour Le Match du Ronvau a bien été prise en compte.
            </td>
          </tr>
          <tr>
            <td style="padding:14px 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.65;color:#F4F1EA;">
              Vous recevrez un e-mail quand la billetterie ouvrira, en janvier 2027.
            </td>
          </tr>
          <tr>
            <td style="padding:28px 0 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#111318" style="background-color:#111318;">
                <tr>
                  <td bgcolor="#F2A31B" height="3" style="height:3px;background-color:#F2A31B;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="padding:20px 22px 8px;font-family:'Arial Narrow',Arial,sans-serif;font-size:13px;line-height:1.2;letter-spacing:0.26em;text-transform:uppercase;color:#F2A31B;">
                    La soirée
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 22px 0;font-family:Impact,'Arial Narrow',Arial,sans-serif;font-size:26px;line-height:1;letter-spacing:0.01em;text-transform:uppercase;color:#F4F1EA;">
                    Samedi 22 mai 2027
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 22px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.5;color:#F4F1EA;">
                    Centre sportif André Docquier<br>
                    avenue du Ronvau 8, Chaumont-Gistoux
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 22px 22px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.5;color:#F4F1EA;">
                    <span style="color:#F2A31B;">18h</span> — Repas
                    &nbsp;&nbsp;
                    <span style="color:#D8202C;">20h</span> — Coup d'envoi
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.65;color:#F4F1EA;">
              À bientôt,<br>
              Le Match du Ronvau
            </td>
          </tr>
          <tr>
            <td style="padding:28px 0 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td height="1" bgcolor="#2A2C31" style="height:1px;background-color:#2A2C31;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.5;color:#A39E94;">
              Lions Club de Chaumont-Gistoux<br>
              <a href="https://lematchduronvau.be" style="color:#F2A31B;text-decoration:none;">lematchduronvau.be</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function logMailFailure(detail: string) {
  console.error(`E-mail de confirmation non envoyé (${publicMailError(detail)}).`);
}

type MailjetError = {
  ErrorCode?: string;
  ErrorMessage?: string;
  StatusCode?: number;
};

type MailjetPayload = {
  StatusCode?: number;
  ErrorMessage?: string;
  ErrorCode?: string;
  Messages?: {
    Status?: string;
    Errors?: MailjetError[];
  }[];
};

function mailjetErrorDetail(payload: MailjetPayload): string {
  const first = payload.Messages?.[0]?.Errors?.[0];
  if (first?.ErrorMessage || first?.ErrorCode) {
    return [first.StatusCode, first.ErrorCode, first.ErrorMessage].filter(Boolean).join(" ");
  }
  if (payload.ErrorMessage || payload.ErrorCode) {
    return [payload.StatusCode, payload.ErrorCode, payload.ErrorMessage].filter(Boolean).join(" ");
  }
  return "";
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
    let errorDetail = "";
    try {
      const payload = (await response.json()) as MailjetPayload;
      mailStatus = payload.Messages?.[0]?.Status ?? "";
      errorDetail = mailjetErrorDetail(payload);
    } catch {
      mailStatus = "";
    }

    if (response.ok && mailStatus === "success") return true;

    const statusLabel = [`HTTP ${response.status}`, mailStatus, errorDetail].filter(Boolean).join(", ");
    logMailFailure(`Mailjet, ${statusLabel}`);
    return false;
  } catch {
    logMailFailure("Mailjet injoignable");
    return false;
  }
}
