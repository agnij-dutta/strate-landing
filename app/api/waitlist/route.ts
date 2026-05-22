import { NextResponse } from "next/server";
import { getWaitlistCount, signupWaitlist } from "@/lib/waitlist";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  email?: string;
  stellar_address?: string | null;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STELLAR_RE = /^G[A-Z2-7]{55}$/;

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
  if (email.length > 254) {
    return NextResponse.json(
      { ok: false, error: "email_too_long" },
      { status: 400 }
    );
  }
  if (stellar && !STELLAR_RE.test(stellar)) {
    return NextResponse.json(
      { ok: false, error: "invalid_stellar_address" },
      { status: 400 }
    );
  }

  try {
    const result = await signupWaitlist(email, stellar);
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: 500 }
      );
    }
    return NextResponse.json({
      ok: true,
      position: result.publicPosition ?? result.position,
      existed: result.existed,
    });
  } catch (err) {
    console.error("[waitlist] signup failed", err);
    return NextResponse.json(
      { ok: false, error: "store_unavailable" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await getWaitlistCount();
    return NextResponse.json({ ok: true, count });
  } catch (err) {
    console.error("[waitlist] count failed", err);
    return NextResponse.json(
      { ok: false, error: "store_unavailable" },
      { status: 500 }
    );
  }
}
