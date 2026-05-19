"use client";

const assets = [
  { symbol: "bUSDC", issuer: "Blend",              status: "live" },
  { symbol: "CETES", issuer: "Etherfuse",          status: "q3"   },
  { symbol: "BENJI", issuer: "Franklin Templeton", status: "tbd"  },
  { symbol: "WTSYX", issuer: "WisdomTree",         status: "tbd"  },
  { symbol: "USDY",  issuer: "Ondo",               status: "tbd"  },
  { symbol: "WTGXX", issuer: "WisdomTree",         status: "tbd"  },
  { symbol: "EURC",  issuer: "Circle",             status: "live" },
];

const statusStyle: Record<string, { dot: string; label: string }> = {
  live: { dot: "bg-strate",          label: "live"  },
  q3:   { dot: "bg-foil",            label: "Q3"    },
  tbd:  { dot: "bg-parchment/30",    label: "soon"  },
};

function Row() {
  return (
    <>
      {assets.map((a, i) => {
        const s = statusStyle[a.status];
        return (
          <div
            key={`${a.symbol}-${i}`}
            className="flex shrink-0 items-baseline gap-3 px-8"
          >
            <span
              className="font-display text-[20px] text-parchment/90"
              style={{ letterSpacing: "-0.005em" }}
            >
              {a.symbol}
            </span>
            <span
              className="text-[13px] italic text-parchment/45"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              {a.issuer}
            </span>
            <span className="ml-1 flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.32em] text-parchment/45">
              <span className={`block h-1 w-1 rounded-full ${s.dot}`} aria-hidden="true" />
              {s.label}
            </span>
          </div>
        );
      })}
    </>
  );
}

/**
 * Inline marquee. No borders, no section header, no opaque bg.
 * Reads as a continuation of whatever section sits above it.
 */
export default function SupportedTicker() {
  return (
    <div className="relative overflow-hidden py-8 lg:py-10">
      <div className="relative overflow-hidden">
        {/* Edge fades */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32"
          style={{
            background: "linear-gradient(to right, var(--ink) 0%, rgba(11,37,69,0) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32"
          style={{
            background: "linear-gradient(to left, var(--ink) 0%, rgba(11,37,69,0) 100%)",
          }}
        />

        <div className="marquee-track flex w-max items-center">
          <Row />
          <Row />
        </div>
      </div>
    </div>
  );
}
