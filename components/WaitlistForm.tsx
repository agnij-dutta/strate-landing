"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";

type State =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "ok"; position: number; existed: boolean }
  | { kind: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STELLAR_RE = /^G[A-Z2-7]{55}$/;

function humanizeError(code: string): string {
  switch (code) {
    case "invalid_email":
      return "That email does not look right. Try again.";
    case "invalid_stellar_address":
      return "Stellar address should be 56 chars starting with G.";
    case "email_too_long":
      return "Email is too long.";
    case "store_unavailable":
      return "Signup is temporarily unavailable. Try again in a moment.";
    case "bad_json":
      return "Could not parse request. Refresh and try again.";
    default:
      return "Something went wrong. Try again.";
  }
}

export default function WaitlistForm() {
  const reduced = useReducedMotion();
  const emailId = useId();
  const stellarId = useId();
  const [email, setEmail] = useState("");
  const [stellar, setStellar] = useState("");
  const [showStellar, setShowStellar] = useState(false);
  const [state, setState] = useState<State>({ kind: "idle" });

  const submitting = state.kind === "submitting";
  const success = state.kind === "ok";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const cleanEmail = email.trim().toLowerCase();
    const cleanStellar = stellar.trim();

    if (!EMAIL_RE.test(cleanEmail)) {
      setState({ kind: "error", message: humanizeError("invalid_email") });
      return;
    }
    if (cleanStellar && !STELLAR_RE.test(cleanStellar)) {
      setState({
        kind: "error",
        message: humanizeError("invalid_stellar_address"),
      });
      return;
    }

    setState({ kind: "submitting" });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          stellar_address: cleanStellar || null,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        position?: number;
        existed?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setState({
          kind: "error",
          message: humanizeError(data.error ?? "unknown"),
        });
        return;
      }
      setState({
        kind: "ok",
        position: typeof data.position === "number" ? data.position : 0,
        existed: !!data.existed,
      });
    } catch {
      setState({
        kind: "error",
        message: humanizeError("store_unavailable"),
      });
    }
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait" initial={false}>
        {success ? (
          <motion.div
            key="success"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="border border-foil/40 bg-foil/[0.06] p-5"
            style={{ borderRadius: 2 }}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-baseline gap-3">
              <span
                aria-hidden="true"
                className="block h-1.5 w-1.5 shrink-0 bg-foil"
              />
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-foil">
                {state.existed ? "Already on file" : "You are in"}
              </p>
            </div>
            <p
              className="mt-3 text-[15px] leading-[1.55] text-parchment/85"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              Position{" "}
              <span className="num font-mono text-parchment">
                #{state.position.toLocaleString("en-US")}
              </span>{" "}
              on the waitlist. We will email you when the testnet opens.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3"
          >
            <label htmlFor={emailId} className="sr-only">
              Email address
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id={emailId}
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder="you@desk.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state.kind === "error") setState({ kind: "idle" });
                }}
                disabled={submitting}
                className="h-12 w-full flex-1 border border-parchment/20 bg-parchment/[0.04] px-4 font-mono text-[13px] text-parchment placeholder-parchment/35 outline-none transition-colors duration-200 focus:border-foil/70 disabled:opacity-50"
                style={{ borderRadius: 2, letterSpacing: "0.01em" }}
              />
              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex h-12 shrink-0 items-center justify-center gap-3 bg-foil px-7 font-mono text-[11px] uppercase tracking-[0.28em] text-ink transition-all duration-300 hover:bg-foil-deep disabled:cursor-not-allowed disabled:opacity-60"
                style={{ borderRadius: 2 }}
              >
                <span>{submitting ? "Joining" : "Join waitlist"}</span>
                {submitting ? (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="animate-spin"
                    aria-hidden="true"
                  >
                    <circle
                      cx="7"
                      cy="7"
                      r="5"
                      stroke="currentColor"
                      strokeOpacity="0.3"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M12 7a5 5 0 0 0-5-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div>
              {!showStellar && (
                <button
                  type="button"
                  onClick={() => setShowStellar(true)}
                  className="font-mono text-[10px] uppercase tracking-[0.32em] text-parchment/45 transition-colors duration-200 hover:text-foil"
                >
                  + Add Stellar address (optional)
                </button>
              )}
              <AnimatePresence initial={false}>
                {showStellar && (
                  <motion.div
                    initial={reduced ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <label htmlFor={stellarId} className="sr-only">
                      Stellar address (optional)
                    </label>
                    <input
                      id={stellarId}
                      type="text"
                      inputMode="text"
                      autoComplete="off"
                      spellCheck={false}
                      placeholder="GA…"
                      value={stellar}
                      onChange={(e) => {
                        setStellar(e.target.value);
                        if (state.kind === "error") setState({ kind: "idle" });
                      }}
                      disabled={submitting}
                      className="h-11 w-full border border-parchment/20 bg-parchment/[0.04] px-4 font-mono text-[12px] text-parchment placeholder-parchment/35 outline-none transition-colors duration-200 focus:border-foil/70 disabled:opacity-50"
                      style={{ borderRadius: 2, letterSpacing: "0.04em" }}
                    />
                    <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.28em] text-parchment/35">
                      For testnet allocation. We never custody.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {state.kind === "error" && (
                <motion.p
                  initial={reduced ? false : { opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-[12px] text-foil/90"
                  style={{ fontFamily: "var(--font-fraunces), serif" }}
                  role="alert"
                  aria-live="assertive"
                >
                  {state.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
