import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { isAdminPasswordConfigured, readEnv } from "@/lib/env";

const ADMIN_COOKIE = "mdr_admin";
const SPONSOR_COOKIE = "mdr_sponsor";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

type AdminSession = { role: "admin"; exp: number };
type SponsorSession = { role: "sponsor"; sponsorId: string; exp: number };

const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function signingSecret(): string | null {
  const secret = readEnv("ADMIN_PASSWORD");
  return secret.length > 0 ? secret : null;
}

function cookieOptions(maxAge = MAX_AGE_SECONDS) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string): Uint8Array {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/") + "=".repeat((4 - (value.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function hmac(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return bytesToBase64Url(new Uint8Array(signature));
}

async function seal(data: AdminSession | SponsorSession): Promise<string | null> {
  const secret = signingSecret();
  if (!secret) return null;
  const payload = bytesToBase64Url(new TextEncoder().encode(JSON.stringify(data)));
  const signature = await hmac(payload, secret);
  return `${payload}.${signature}`;
}

async function openToken(token: string | undefined): Promise<unknown> {
  try {
    const secret = signingSecret();
    if (!secret || !token) return null;
    const dot = token.lastIndexOf(".");
    if (dot <= 0) return null;
    const payload = token.slice(0, dot);
    const signature = token.slice(dot + 1);
    const expected = await hmac(payload, secret);
    const left = base64UrlToBytes(signature);
    const right = base64UrlToBytes(expected);
    if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
    const json = new TextDecoder().decode(base64UrlToBytes(payload));
    const data = JSON.parse(json) as { exp?: unknown };
    if (typeof data.exp !== "number" || data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export function passwordMatches(input: string): boolean {
  const expected = readEnv("ADMIN_PASSWORD");
  if (!expected || !isAdminPasswordConfigured()) return false;
  const left = createHash("sha256").update(input).digest();
  const right = createHash("sha256").update(expected).digest();
  return timingSafeEqual(left, right);
}

export async function setAdminSession(): Promise<boolean> {
  const token = await seal({ role: "admin", exp: Date.now() + MAX_AGE_SECONDS * 1000 });
  if (!token) return false;
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, token, cookieOptions());
  return true;
}

export async function clearAdminSession(): Promise<void> {
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, "", { ...cookieOptions(0), expires: new Date(0) });
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const jar = await cookies();
  const data = await openToken(jar.get(ADMIN_COOKIE)?.value);
  if (!data || typeof data !== "object") return null;
  if ((data as AdminSession).role !== "admin") return null;
  return data as AdminSession;
}

export async function setSponsorSession(sponsorId: string): Promise<boolean> {
  if (!UUID.test(sponsorId)) return false;
  const token = await seal({
    role: "sponsor",
    sponsorId,
    exp: Date.now() + MAX_AGE_SECONDS * 1000,
  });
  if (!token) return false;
  const jar = await cookies();
  jar.set(SPONSOR_COOKIE, token, cookieOptions());
  return true;
}

export async function clearSponsorSession(): Promise<void> {
  const jar = await cookies();
  jar.set(SPONSOR_COOKIE, "", { ...cookieOptions(0), expires: new Date(0) });
}

export async function getSponsorSession(): Promise<SponsorSession | null> {
  const jar = await cookies();
  const data = await openToken(jar.get(SPONSOR_COOKIE)?.value);
  if (!data || typeof data !== "object") return null;
  const session = data as SponsorSession;
  if (session.role !== "sponsor" || !UUID.test(session.sponsorId)) return null;
  return session;
}
