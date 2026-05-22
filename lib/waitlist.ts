import "server-only";
import { Redis } from "@upstash/redis";

export type Entry = {
  email: string;
  stellar: string | null;
  position: number;
  ts: string;
};

export type SignupResult =
  | { ok: true; position: number; existed: boolean }
  | { ok: false; error: string };

const KEY_COUNT = "waitlist:count";
const KEY_BY_EMAIL = (email: string) => `waitlist:by_email:${email}`;

// Production: Upstash Redis when env vars are present.
// Dev fallback: in-memory Map, scoped to the running Node process. Resets on
// reload. Logs a warning the first time it is used so accidental prod use is
// loud.
type Store = {
  getEntry: (email: string) => Promise<Entry | null>;
  signup: (email: string, stellar: string | null) => Promise<SignupResult>;
  count: () => Promise<number>;
};

function makeUpstashStore(redis: Redis): Store {
  return {
    async getEntry(email) {
      const raw = await redis.get<Entry>(KEY_BY_EMAIL(email));
      return raw ?? null;
    },
    async signup(email, stellar) {
      const existing = await redis.get<Entry>(KEY_BY_EMAIL(email));
      if (existing) {
        return { ok: true, position: existing.position, existed: true };
      }
      const position = await redis.incr(KEY_COUNT);
      const entry: Entry = {
        email,
        stellar,
        position,
        ts: new Date().toISOString(),
      };
      await redis.set(KEY_BY_EMAIL(email), entry);
      return { ok: true, position, existed: false };
    },
    async count() {
      const n = await redis.get<number>(KEY_COUNT);
      return typeof n === "number" ? n : 0;
    },
  };
}

function makeMemoryStore(): Store {
  const map = new Map<string, Entry>();
  let counter = 0;
  let warned = false;
  const warnOnce = () => {
    if (warned) return;
    warned = true;
    console.warn(
      "[waitlist] Upstash env vars not set; using in-memory store. " +
        "Set KV_REST_API_URL and KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL / " +
        "UPSTASH_REDIS_REST_TOKEN) to persist."
    );
  };
  return {
    async getEntry(email) {
      warnOnce();
      return map.get(email) ?? null;
    },
    async signup(email, stellar) {
      warnOnce();
      const existing = map.get(email);
      if (existing) return { ok: true, position: existing.position, existed: true };
      counter += 1;
      const entry: Entry = {
        email,
        stellar,
        position: counter,
        ts: new Date().toISOString(),
      };
      map.set(email, entry);
      return { ok: true, position: counter, existed: false };
    },
    async count() {
      warnOnce();
      return counter;
    },
  };
}

let cached: Store | null = null;

function getStore(): Store {
  if (cached) return cached;
  const url =
    process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    cached = makeUpstashStore(new Redis({ url, token }));
  } else {
    cached = makeMemoryStore();
  }
  return cached;
}

// Offset added to the public position so pre-launch the number reads as
// momentum rather than "you are user 3." Tunable via env without code changes.
function publicOffset(): number {
  const raw = process.env.WAITLIST_PUBLIC_OFFSET;
  const n = raw ? Number(raw) : 1247;
  return Number.isFinite(n) && n >= 0 ? n : 1247;
}

export async function signupWaitlist(
  email: string,
  stellar: string | null
): Promise<SignupResult & { publicPosition?: number }> {
  const result = await getStore().signup(email, stellar);
  if (!result.ok) return result;
  return { ...result, publicPosition: result.position + publicOffset() };
}

export async function getWaitlistCount(): Promise<number> {
  const raw = await getStore().count();
  return raw + publicOffset();
}
