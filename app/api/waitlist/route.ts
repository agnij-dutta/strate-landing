import { NextResponse } from "next/server";

type Body = {
  email?: string;
  stellar_address?: string | null;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const stellar = (body.stellar_address ?? "")?.toString().trim() || null;

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "invalid_email" },
      { status: 400 }
    );
  }
  if (stellar && !/^G[A-Z2-7]{55}$/.test(stellar)) {
    // Stellar public keys: 56 chars, base32, starting with 'G'
    return NextResponse.json(
      { ok: false, error: "invalid_stellar_address" },
      { status: 400 }
    );
  }

  // TODO: wire to KV / Postgres / Resend in production.
  console.log("[waitlist] signup", {
    email,
    stellar,
    ts: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
